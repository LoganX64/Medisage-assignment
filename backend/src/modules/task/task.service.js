import Task from "./task.model.js";

export const createTaskService = async (data) => {
  return await Task.create(data);
};

export const getTasksService = async ({
  project_id,
  status,
  sortBy,
  page,
  limit,
}) => {
  const query = { project_id };

  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const sortOptions = {
    due_date_asc: { due_date: 1 },
    due_date_desc: { due_date: -1 },
  };

  const sort = sortOptions[sortBy] || { createdAt: -1 };

  const [tasks, total] = await Promise.all([
    Task.find(query).sort(sort).skip(skip).limit(limit),
    Task.countDocuments(query),
  ]);

  return { tasks, total };
};

export const updateTaskService = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
};

export const deleteTaskService = async (id) => {
  return await Task.findByIdAndDelete(id);
};
