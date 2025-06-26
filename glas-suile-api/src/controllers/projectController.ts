import { Response, Request } from "express";
import asyncHandler from "express-async-handler";
import ProjectModel from "../models/projectModel";

export const createProject = asyncHandler(async (req: any, res: Response) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error("Please provide a title and description");
  }

  const project = await ProjectModel.create({
    title,
    description,
    user: req.user.id, // req.user is attached by our protect middleware
  });

  res.status(201).json(project);
});
