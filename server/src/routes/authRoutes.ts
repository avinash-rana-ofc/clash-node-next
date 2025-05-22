import { Router, Request, Response } from "express";
import { registerSchema } from "../validation/authValidations.js";
import { ZodError } from "zod";
import { formatError } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";

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


    //* Create Account for user or register user
    await prisma.user.create({ data: {
      name : payload.name,
      email : payload.email,
      password : payload.password
    } });
    res.json({ message: "Account created!" });
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

export default router;
