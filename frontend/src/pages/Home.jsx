import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  getTasks,
  createTask,
  deleteProject,
  updateTask,
  deleteTask,
} from "../services/api";

import CreateProject from "../components/CreateProject";
import ProjectList from "../components/ProjectList";
import CreateTask from "../components/CreateTask";
import TaskList from "../components/TaskList";
import Modal from "../components/Modal";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Pagination state
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 0,
  });

  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("due_date_asc");

  // Modal visibility state
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Load projects
  const loadProjects = async () => {
    const res = await getProjects();
    setProjects(res.data || []);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Load tasks
  const loadTasks = async (projectId, pageNum = 1) => {
    const query = `?status=${statusFilter}&sortBy=${sortBy}&page=${pageNum}&limit=${pagination.limit}`;
    const res = await getTasks(projectId, query);
    setTasks(res.data || []);
    if (res.pagination) {
      setPagination(res.pagination);
    }
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    loadTasks(project._id, 1);
  };

  const handleCreateProject = async (projectData) => {
    await createProject(projectData);
    setShowProjectModal(false);
    loadProjects();
  };

  const handleCreateTask = async (taskData) => {
    if (!selectedProject) return;

    await createTask(selectedProject._id, taskData);
    setShowTaskModal(false);
    loadTasks(selectedProject._id, 1);
  };

  // delete project
  const handleDeleteProject = async (id) => {
    await deleteProject(id);
    setSelectedProject(null);
    loadProjects();
  };

  // delete task
  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    loadTasks(selectedProject._id, pagination.page);
  };

  // update task 
  const handleUpdateTask = async (id, updates) => {
    await updateTask(id, updates);
    loadTasks(selectedProject._id, pagination.page);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      loadTasks(selectedProject._id, newPage);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Project Manager</h1>
          <button
            onClick={() => setShowProjectModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg shadow-blue-200"
          >
            + New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 space-y-6">
            <ProjectList
              projects={projects}
              selectedProject={selectedProject}
              onSelect={handleSelectProject}
              onDelete={handleDeleteProject}
            />
          </div>
          <div className="col-span-1 md:col-span-2 space-y-6">
            {selectedProject ? (
              <>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowTaskModal(true)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg shadow-emerald-200"
                  >
                    + Add Task
                  </button>
                </div>

                <TaskList
                  tasks={tasks}
                  project={selectedProject}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  onApply={() => loadTasks(selectedProject._id, 1)}
                  onDeleteTask={handleDeleteTask}
                  onUpdateTask={handleUpdateTask}
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center text-slate-500 flex items-center justify-center h-full min-h-[400px]">
                Select a project from the list to view or manage its tasks.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* modals */}
      <Modal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        title="Create New Project"
      >
        <CreateProject
          onCreate={handleCreateProject}
          onCancel={() => setShowProjectModal(false)}
        />
      </Modal>

      <Modal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        title={`Add Task to ${selectedProject?.name}`}
      >
        <CreateTask
          onCreate={handleCreateTask}
          onCancel={() => setShowTaskModal(false)}
        />
      </Modal>
    </div>
  );
}

