import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  //* Get Header
  const authHeader = req.headers.authorization;
  if (authHeader === null || authHeader === undefined) {
    res.status(401).json({ status: 401, message: "UnAuthorized" });
    return;
  }

  //* Extract Token from header
  const token = authHeader.split(" ")[1];

  //* Verify Token
  jwt.verify(token, process.env.SECRET_KEY!, (err, user) => {
    if (err) {
      res.status(401).json({ status: 401, message: "UnAuthorized" });
      return;
    }

    req.user = user as AuthUser;
    next();
  });
};


export default authMiddleware;