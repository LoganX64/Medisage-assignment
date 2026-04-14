import asyncHandler from "../../utils/asyncHandler.js";
import {
  createTaskService,
  getTasksService,
  updateTaskService,
  deleteTaskService,
} from "./task.service.js";
import Project from "../project/project.model.js";

//  POST /projects/:project_id/tasks
export const createTask = asyncHandler(async (req, res) => {
  const { project_id } = req.params;
  const { title, description, status, priority, due_date } = req.body;

  // Project ID required
  if (!project_id) {
    return res.status(400).json({
      success: false,
      message: "project_id is required",
    });
  }

  const projectExists = await Project.findById(project_id);
  if (!projectExists) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  // Title required
  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  // Status required 
  if (!status || status.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Status is required",
    });
  }

  // Priority required 
  if (!priority || priority.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Priority is required",
    });
  }

  //  date required 
  if (!due_date || due_date === "") {
    return res.status(400).json({
      success: false,
      message: "Due date is required",
    });
  }

  const validStatus = ["todo", "in-progress", "done"];
  const validPriority = ["low", "medium", "high"];

  if (!validStatus.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status",
    });
  }

  if (!validPriority.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: "Invalid priority",
    });
  }

  const task = await createTaskService({
    project_id,
    title: title.trim(),
    description: description?.trim(),
    status,
    priority,
    due_date,
  });

  return res.status(201).json({
    success: true,
    data: task,
  });
});

//  GET /projects/:project_id/tasks
export const getTasksByProject = asyncHandler(async (req, res) => {
  const { project_id } = req.params;
  let { status, sortBy = "due_date_asc", page = 1, limit = 10 } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1 || limit > 100) limit = 10;

  const { tasks, total } = await getTasksService({
    project_id,
    status,
    sortBy,
    page,
    limit,
  });

  return res.status(200).json({
    success: true,
    data: tasks,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});

//  PUT /tasks/:id
export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedTask = await updateTaskService(id, updates);

  if (!updatedTask) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: updatedTask,
  });
});

//  DELETE /tasks/:id
export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await deleteTaskService(id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});
