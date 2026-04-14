import Project from "./project.model.js";
import Task from "../task/task.model.js";

export const createProjectService = async (data) => {
  const project = await Project.create(data);
  return project;
};

export const getProjectsService = async ({ page, limit }) => {
  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    Project.find().sort({ createdAt: -1 }).skip(skip).limit(limit),

    Project.countDocuments(),
  ]);

  return {
    projects,
    total,
  };
};

// get by id
export const getProjectByIdService = async (id) => {
  return await Project.findById(id);
};

// delete
export const deleteProjectService = async (id) => {
  const project = await Project.findByIdAndDelete(id);

  if (!project) return null;

  await Task.deleteMany({ project_id: id });

  return project;
};
