import express from "express";
import projectRoutes from "./src/modules/project/project.routes.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";
import taskRoutes from "./src/modules/task/task.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(errorMiddleware);
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/projects", projectRoutes);

app.use("/", taskRoutes);

export default app;
