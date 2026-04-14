import {
  createProjectService,
  getProjectsService,
  getProjectByIdService,
  deleteProjectService,
} from "./project.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Project name is required",
    });
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim().length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Project description is required",
    });
  }

  if (name.length > 100) {
    return res.status(400).json({
      success: false,
      message: "Name cannot exceed 100 characters",
    });
  }

  if (description && description.length > 500) {
    return res.status(400).json({
      success: false,
      message: "Description too long",
    });
  }

  const projectData = {
    name: name.trim(),
    description: description?.trim(),
  };

  const project = await createProjectService(projectData);

  return res.status(201).json({
    success: true,
    data: project,
  });
});

export const getProjects = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10 } = req.query;

  // validation + normalization
  page = parseInt(page);
  limit = parseInt(limit);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1 || limit > 100) limit = 10;

  const { projects, total } = await getProjectsService({ page, limit });

  return res.status(200).json({
    success: true,
    data: projects,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// GET /projects/:id
export const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await getProjectByIdService(id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: project,
  });
});

// DELETE /projects/:id
export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await deleteProjectService(id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Project and related tasks deleted successfully",
  });
});
