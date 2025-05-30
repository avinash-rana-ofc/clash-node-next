import { Router, Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/authValidations.js";
import { ZodError } from "zod";
import { formatError, renderEmailEjs } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router: Router = Router();

// * Login route
router.post("/login", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = loginSchema.parse(body);
    //console.log("payload", payload);
    //* Check email
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user || user === null) {
      res.status(422).json({
        errors: {
          email: "No user found with this email",
        },
      });
      return;
    }

    //* Check Password
    const compare = await bcrypt.compare(payload.password, user?.password!);
    console.log("compare", compare);
    if (!compare) {
      res.status(422).json({
        errors: {
          password: "Invalid Password!",
        },
      });
      return;
    }

    //* JWT Payload
    const JWTPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(JWTPayload, process.env.SECRET_KEY!, {
      expiresIn: "365d",
    });

    res.json({
      message: "Logged in Successfully!!",
      data: {
        ...JWTPayload,
        token: `Bearer ${token}`,
      },
    });
    return;
  } catch (error) {
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

// * Login Check route
router.post("/check/credentials", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log("incheck credential")
    const payload = loginSchema.parse(body);
    //console.log("payload", payload);
    //* Check email
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user || user === null) {
      res.status(422).json({
        errors: {
          email: "No user found with this email",
        },
      });
      return;
    }

    //* Check Password
    const compare = await bcrypt.compare(payload.password, user?.password!);
    console.log("compare", compare);
    if (!compare) {
      res.status(422).json({
        errors: {
          password: "Invalid Password!",
        },
      });
      return;
    }

    res.json({
      message: "Logged in Successfully!!",
      data: {},
    });
    return;
  } catch (error) {
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

// * Register route
router.post("/register", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = registerSchema.parse(body);
    //console.log("payload", payload);

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
        email_verify_token: token,
      },
    });
    res.json({
      message:
        "Please check your email. We have sent you a verification email!",
    });
    return;
  } catch (error) {
    //console.log(error);

    if (error instanceof ZodError) {
      const errors = formatError(error);
      console.log("printing errors", errors);
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

//*Get User
router.get("/user", authMiddleware, (req: Request, res: Response) => {
  const user = req.user;
  res.json({ data: user });
  return;
});

export default router;
