// src/pages/MyProjects.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Loading from '../components/Loading';

const MyProjects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/projects/my-projects/');
      setProjects(response.data.projects || []);
      setTasks(response.data.tasks || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      done: 'bg-green-100 text-green-700',
      in_progress: 'bg-blue-100 text-blue-700',
      pending: 'bg-yellow-100 text-yellow-700',
      overdue: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-orange-100 text-orange-700',
      low: 'bg-green-100 text-green-700',
    };
    return colors[priority] || 'bg-slate-100 text-slate-700';
  };

  if (loading) return <Loading />;
  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500">
      {error}
    </div>
  );

  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in_progress').length;
  const overdueTasks = tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'done').length;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Projects</h1>
            <p className="text-slate-500 mt-2">All your project plans and tasks</p>
          </div>
          <Link 
            to="/planner"
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            + New Project
          </Link>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">{projects.length}</p>
              <p className="text-slate-500">Total Projects</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{tasks.length}</p>
              <p className="text-slate-500">Total Tasks</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
              <p className="text-slate-500">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">{overdueTasks}</p>
              <p className="text-slate-500">Overdue</p>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
            <p className="text-slate-500 mb-4">No projects yet</p>
            <Link 
              to="/planner"
              className="text-orange-600 hover:underline"
            >
              Create your first project →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => {
              const projectTasks = tasks.filter(t => t.project_id === project.id);
              const projectCompleted = projectTasks.filter(t => t.status === 'done').length;
              const progress = projectTasks.length > 0 
                ? Math.round((projectCompleted / projectTasks.length) * 100) 
                : 0;

              return (
                <div 
                  key={project.id} 
                  className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{project.title}</h3>
                        <p className="text-sm text-slate-500">
                          Created {new Date(project.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Progress</span>
                      <span className="font-medium text-slate-900">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Task Stats */}
                  <div className="flex gap-4 mb-4 text-sm">
                    <span className="text-slate-600">
                      <span className="font-medium text-slate-900">{projectTasks.length}</span> tasks
                    </span>
                    <span className="text-green-600">
                      <span className="font-medium">{projectCompleted}</span> done
                    </span>
                    <span className="text-blue-600">
                      <span className="font-medium">{projectTasks.filter(t => t.status === 'in_progress').length}</span> in progress
                    </span>
                  </div>

                  {/* Recent Tasks */}
                  {projectTasks.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium text-slate-700">Recent Tasks:</p>
                      {projectTasks.slice(0, 3).map(task => (
                        <div key={task.id} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                          <span className="text-sm text-slate-700 truncate flex-1">{task.title}</span>
                          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link 
                    to={`/planner/project/${project.id}`}
                    className="block w-full text-center py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                  >
                    View Project
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;