import express from "express";
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
} from "./task.controller.js";

const router = express.Router();

// POST /projects/:project_id/tasks
router.post("/projects/:project_id/tasks", createTask);

// GET /projects/:project_id/tasks
router.get("/projects/:project_id/tasks", getTasksByProject);

// PUT /tasks/:id
router.put("/tasks/:id", updateTask);

// DELETE /tasks/:id
router.delete("/tasks/:id", deleteTask);

export default router;
