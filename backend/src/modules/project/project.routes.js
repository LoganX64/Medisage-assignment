import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  deleteProject,
} from "./project.controller.js";

const router = express.Router();

// POST /projects
router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.delete("/:id", deleteProject);

export default router;
