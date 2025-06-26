import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel"; // <-- FIX
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
}

export const protect = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        if (!process.env.JWT_SECRET) {
          throw new Error("Server misconfiguration: JWT_SECRET not found");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        req.user = await UserModel.findById(decoded.id).select("-password");
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
