// src/pages/ProjectDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium', deadline: '' });

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/projects/${id}/`);
      setProject(response.data);
      setTasks(response.data.tasks || []);
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await api.patch(`/project-tasks/${taskId}/`, { status: newStatus });
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/project-tasks/', {
        ...newTask,
        project: id
      });
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', priority: 'medium', deadline: '' });
    } catch (err) {
      alert('Failed to add task');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      done: 'bg-green-100 text-green-700 border-green-300',
      in_progress: 'bg-blue-100 text-blue-700 border-blue-300',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-600 bg-red-50',
      medium: 'text-orange-600 bg-orange-50',
      low: 'text-green-600 bg-green-50',
    };
    return colors[priority] || 'text-slate-600 bg-slate-50';
  };

  const progress = tasks.length > 0 
    ? Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100) 
    : 0;

  if (loading) return <Loading />;
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/my-projects')}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg"
        >
          Back to Projects
        </button>
      </div>
    </div>
  );
  if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/my-projects')}
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{project.title}</h1>
              <p className="text-sm text-slate-500">
                Created on {new Date(project.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/planner')}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Edit in Planner
          </button>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">Project Progress</h3>
            <span className="text-2xl font-bold text-orange-600">{progress}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
            <div 
              className="bg-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex gap-6 text-sm">
            <span className="text-slate-600">
              <span className="font-medium text-slate-900">{tasks.length}</span> Total Tasks
            </span>
            <span className="text-green-600">
              <span className="font-medium">{tasks.filter(t => t.status === 'done').length}</span> Completed
            </span>
            <span className="text-blue-600">
              <span className="font-medium">{tasks.filter(t => t.status === 'in_progress').length}</span> In Progress
            </span>
            <span className="text-yellow-600">
              <span className="font-medium">{tasks.filter(t => t.status === 'pending').length}</span> Pending
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          {/* Tasks List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Tasks</h3>
            
            {tasks.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
                <p className="text-slate-500">No tasks yet. Add your first task below!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.sort((a, b) => {
                  const statusOrder = { pending: 0, in_progress: 1, done: 2 };
                  return statusOrder[a.status] - statusOrder[b.status];
                }).map((task) => (
                  <div 
                    key={task.id} 
                    className={`bg-white rounded-xl p-4 border-2 transition-all ${
                      task.status === 'done' ? 'opacity-60' : ''
                    } ${getStatusColor(task.status)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={task.status === 'done'}
                          onChange={(e) => updateTaskStatus(task.id, e.target.checked ? 'done' : 'pending')}
                          className="w-5 h-5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                        />
                        <div>
                          <h4 className={`font-medium ${task.status === 'done' ? 'line-through' : ''}`}>
                            {task.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            {task.deadline && (
                              <span className="text-xs text-slate-500">
                                Due: {new Date(task.deadline).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {task.status !== 'done' && (
                        <button
                          onClick={() => updateTaskStatus(task.id, task.status === 'pending' ? 'in_progress' : 'pending')}
                          className="text-sm px-3 py-1 rounded-lg bg-white/50 hover:bg-white transition-colors"
                        >
                          {task.status === 'pending' ? 'Start' : 'Pause'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;