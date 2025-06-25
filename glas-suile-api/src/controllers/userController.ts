import { Request, Response } from "express";
import UserModel from "../models/userModel";
import bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";

export async function registerUser(req: Request, res: Response) {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill out all fields" });
      return;
    }
    let dupeEmail = await UserModel.findOne({ email });
    if (dupeEmail) {
      res
        .status(400)
        .json({ message: "An account with this email is already registered" });
      return;
    }
    const gSalt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, gSalt);
    let newUser = await UserModel.create({
      name,
      email,
      password: hashPass,
    });
    if (!process.env.JWT_SECRET) {
      throw new Error("FATAL ERROR: JWT_SECRET is not defined in .env file");
    }
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong on our end." });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Please provide an email and password" });
      return;
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email and/or password" });
      return;
    }
    const isWait = await bcrypt.compare(password, user.password);
    if (!isWait) {
      res.status(400).json({ message: "Invalid email and/or password" });
      return;
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("FATAL ERROR: JWT_SECRET is not defined in .env file");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong on our end" });
  }
}
