import { Response, Request } from "express";
import asyncHandler from "express-async-handler";
import ProjectModel from "../models/projectModel";
import projectModel from "../models/projectModel";

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
export const getProject = asyncHandler(async (req: any, res: Response) => {
  const projects = await ProjectModel.find({ user: req.user.id });
  res.status(200).json(projects);
});

export const updateProject = asyncHandler(async (req: any, res: Response) => {
  const project = await ProjectModel.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found.");
  }
  if (project.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }
  const updatedProject = await projectModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedProject);
});

export const deleteProject = asyncHandler(async (req: any, res: Response) => {
  const project = await ProjectModel.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found.");
  }
  if (project.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }
  await project.deleteOne();
  res.status(200).json({ id: req.params.id });
});
