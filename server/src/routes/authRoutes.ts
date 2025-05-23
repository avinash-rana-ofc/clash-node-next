import { Router, Request, Response } from "express";
import { registerSchema } from "../validation/authValidations.js";
import { ZodError } from "zod";
import { formatError, renderEmailEjs } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";

const router: Router = Router();

// * Register route

router.post("/register", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = registerSchema.parse(body);

    //* Check User Exist with email or not
    let user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    //* if user exist with same email restrict
    if (user) {
      res.status(422).json({
        errors: {
          email: "Email already taken. Please use another one",
        },
      });
      return;
    }

    //* Encrypt the password
    const salt = await bcrypt.genSalt(10);
    payload.password = await bcrypt.hash(payload.password, salt);

    //* Token generation
    const token = await bcrypt.hash(uuid4(), salt);
    const url = `${process.env.APP_URl}/verify-email?email=${payload.email}&token=${token}`;
    const emailBody = await renderEmailEjs("email-verify", {
      name: payload.name,
      url: url,
    });

    //* Send Email
    await emailQueue.add(emailQueueName, {
      to: payload.email,
      subject: "CLash Email Verification",
      body: emailBody,
    });

    //* Create Account for user or register user
    await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        email_verify_token : token
      },
    });
    res.json({
      message:
        "Please check your email. We have sent you a verification email!",
    });
    return;

  } catch (error) {
    console.log(error);
    
    if (error instanceof ZodError) {
      const errors = formatError(error);
      res.status(422).json({ message: "Invalid data", errors });
      return;
    }

    res.status(500).json({
      message: "Something went wrong. Please try again later!",
      error,
    });
    return;
  }
});

export default router;
