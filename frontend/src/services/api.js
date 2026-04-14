const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

if (!BASE_URL) {
  throw new Error("Missing VITE_BACKEND_BASE_URL in .env");
}

console.log("BASE_URL:", BASE_URL);

// project
export const getProjects = async () => {
  const res = await fetch(`${BASE_URL}/projects`);
  return res.json();
};

// create project
export const createProject = async (data) => {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// delete project
export const deleteProject = async (id) => {
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    method: "DELETE",
  });
  return res.json();
};


// tasks
export const getTasks = async (projectId, query = "") => {
  const res = await fetch(`${BASE_URL}/projects/${projectId}/tasks${query}`);
  return res.json();
};

// create task
export const createTask = async (projectId, data) => {
  const res = await fetch(`${BASE_URL}/projects/${projectId}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();

  if (!res.ok) {
    console.log("Backend error:", result);
    throw new Error(result.message || "Failed to create task");
  }

  return result;
};

// update task
export const updateTask = async (id, data) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// delete task
export const deleteTask = async (id) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
