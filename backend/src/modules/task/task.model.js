import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
      index: true,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
      index: true,
    },

    due_date: {
      type: Date,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.index({ project_id: 1, status: 1 });
taskSchema.index({ project_id: 1, due_date: 1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;
