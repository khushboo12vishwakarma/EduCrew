// // import React, { useState, useEffect } from 'react';
// // import { projectPlannerAPI } from '../services/api';
// // import Loading from '../components/Loading';
// // import { Calendar, CheckCircle, Clock, AlertCircle,Sparkles } from 'lucide-react';

// // const ProjectPlanner = () => {
// //   const [view, setView] = useState('create');
// //   const [formData, setFormData] = useState({
// //     project_title: '',
// //     description: '',
// //     due_in_days: 21,
// //     hours_per_day: 3,
// //   });
// //   const [plan, setPlan] = useState(null);
// //   const [todayTasks, setTodayTasks] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     if (view === 'tasks') {
// //       fetchTodayTasks();
// //     }
// //   }, [view]);

// //   const fetchTodayTasks = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await projectPlannerAPI.getTodayTasks();
// //       setTodayTasks(response.data.tasks || []);
// //     } catch (err) {
// //       setError('Failed to fetch tasks');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!formData.project_title.trim() || !formData.description.trim()) {
// //       setError('Please fill all fields');
// //       return;
// //     }

// //     setLoading(true);
// //     setError('');
// //     try {
// //       const response = await projectPlannerAPI.createPlan(formData);
// //       setPlan(response.data);
// //     } catch (err) {
// //       setError(err.response?.data?.error || 'Failed to create plan');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCompleteTask = async (taskId) => {
// //     try {
// //       await projectPlannerAPI.completeTask(taskId);
// //       fetchTodayTasks();
// //     } catch (err) {
// //       setError('Failed to complete task');
// //     }
// //   };

// //   const getPriorityColor = (priority) => {
// //     switch (priority) {
// //       case 'high': return 'border-red-500 bg-red-50';
// //       case 'medium': return 'border-orange-500 bg-orange-50';
// //       case 'low': return 'border-green-500 bg-green-50';
// //       default: return 'border-gray-500 bg-gray-50';
// //     }
// //   };

// //   const getPriorityBadge = (priority) => {
// //     switch (priority) {
// //       case 'high': return 'bg-red-100 text-red-700';
// //       case 'medium': return 'bg-orange-100 text-orange-700';
// //       case 'low': return 'bg-green-100 text-green-700';
// //       default: return 'bg-gray-100 text-gray-700';
// //     }
// //   };

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8">
// //         <div className="text-center max-w-4xl mx-auto px-6">

// //           {/* Badge */}
// //           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue backdrop-blur-sm border border-blue/20 mb-8">
// //             <Sparkles className="w-4 h-4 text-blue-900" />
// //             <span className="text-sm font-medium">
// //               AI-Powered Project Management
// //             </span>
// //           </div>

// //           {/* Main Headline */}
// //           <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
// //             Plan Your Projects{' '}
// //             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-indigo-600">
// //               Smarter
// //             </span>
// //           </h1>

// //           {/* Subheadline */}
// //           <p className="text-xl md:text-1xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
// //             Transform complex projects into actionable weekly plans with AI.
// //             Set deadlines, track progress, and achieve your goals faster.
// //           </p>

// //         </div>


// //       <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[600px]">
// //         <div className="text-center mb-8">
  
// //         </div>


// //        {/* View Selector */}
// // <div className="flex justify-center gap-4 mb-8 border-b-2 border-gray-200">
// //   <button
// //     onClick={() => setView('create')}
// //     className={`flex items-center px-6 py-3 font-semibold transition-all ${
// //       view === 'create'
// //         ? 'text-primary-500 border-b-4 border-primary-500 -mb-0.5'
// //         : 'text-gray-500 hover:text-primary-400'
// //     }`}
// //   >
// //     <Calendar className="mr-2" size={20} />
// //     Create Plan
// //   </button>

// //   <button
// //     onClick={() => setView('tasks')}
// //     className={`flex items-center px-6 py-3 font-semibold transition-all ${
// //       view === 'tasks'
// //         ? 'text-primary-500 border-b-4 border-primary-500 -mb-0.5'
// //         : 'text-gray-500 hover:text-primary-400'
// //     }`}
// //   >
// //     <CheckCircle className="mr-2" size={20} />
// //     Today's Tasks
// //   </button>
// // </div>


// //         {view === 'create' ? (
// //           <>
// //             {/* Create Plan Form */}
// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   Project Title *
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="project_title"
// //                   placeholder="e.g., Build E-commerce Website"
// //                   value={formData.project_title}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   Description *
// //                 </label>
// //                 <textarea
// //                   name="description"
// //                   placeholder="Describe your project in detail..."
// //                   value={formData.description}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 min-h-[120px] transition-colors"
// //                   rows={5}
// //                 />
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-gray-700 font-semibold mb-2">
// //                     Due in (days)
// //                   </label>
// //                   <input
// //                     type="number"
// //                     name="due_in_days"
// //                     min="1"
// //                     max="365"
// //                     value={formData.due_in_days}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-gray-700 font-semibold mb-2">
// //                     Hours per day
// //                   </label>
// //                   <input
// //                     type="number"
// //                     name="hours_per_day"
// //                     min="1"
// //                     max="12"
// //                     value={formData.hours_per_day}
// //                     onChange={handleChange}
// //                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
// //                   />
// //                 </div>
// //               </div>

// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
// //               >
// //                 {loading ? 'Creating Plan...' : 'Generate Project Plan'}
// //               </button>
// //             </form>

// //             {/* Error */}
// //             {error && (
// //               <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
// //                 <p className="text-red-700">{error}</p>
// //               </div>
// //             )}

// //             {/* Loading */}
// //             {loading && (
// //               <div className="mt-8">
// //                 <Loading message="Creating your project plan..." />
// //               </div>
// //             )}

// //             {/* Plan Result */}
// //             {plan && plan.weeks && (
// //               <div className="mt-8 space-y-6 animate-slide-in">
// //                 <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-6">
// //                   <h2 className="text-2xl font-bold text-primary-600 mb-2">
// //                     📋 {plan.project_title}
// //                   </h2>
// //                   <p className="text-gray-600">
// //                     <strong>Duration:</strong> {plan.weeks.length} weeks
// //                   </p>
// //                 </div>
                
// //                 {plan.weeks.map((week, idx) => (
// //                   <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-6">
// //                     <div className="flex items-center justify-between mb-4">
// //                       <h3 className="text-xl font-bold text-primary-600">
// //                         Week {week.week_number}
// //                       </h3>
// //                       <span className="text-sm text-gray-500">
// //                         {week.week_start} - {week.week_end}
// //                       </span>
// //                     </div>
                    
// //                     <div className="space-y-3">
// //                       {week.tasks.map((task, taskIdx) => (
// //                         <div
// //                           key={taskIdx}
// //                           className={`border-l-4 rounded-lg p-4 ${getPriorityColor(task.priority)}`}
// //                         >
// //                           <div className="flex items-start justify-between mb-2">
// //                             <span className="font-mono text-sm font-semibold text-primary-600">
// //                               {task.task_id}
// //                             </span>
// //                             <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getPriorityBadge(task.priority)}`}>
// //                               {task.priority}
// //                             </span>
// //                           </div>
// //                           <p className="text-gray-700 mb-3">{task.description}</p>
// //                           <div className="flex flex-wrap gap-4 text-sm text-gray-600">
// //                             <span className="flex items-center">
// //                               <Clock size={16} className="mr-1" />
// //                               {task.estimate_hours}h
// //                             </span>
// //                             <span className="flex items-center">
// //                               <Calendar size={16} className="mr-1" />
// //                               {task.deadline}
// //                             </span>
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </>
// //         ) : (
// //           // Today's Tasks View
// //           <div>
// //             {loading ? (
// //               <Loading message="Loading tasks..." />
// //             ) : todayTasks.length > 0 ? (
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                 {todayTasks.map((task) => (
// //                   <div
// //                     key={task.id}
// //                     className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border-t-4 border-primary-500"
// //                   >
// //                     <h3 className="text-lg font-bold text-gray-800 mb-2">
// //                       {task.title}
// //                     </h3>
// //                     <p className="text-sm text-gray-600 mb-4">
// //                       <strong>Project:</strong> {task.project_title}
// //                     </p>
// //                     <div className="space-y-2 mb-4">
// //                       <div className="flex items-center justify-between">
// //                         <span className="text-sm text-gray-600">Priority:</span>
// //                         <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(task.priority)}`}>
// //                           {task.priority}
// //                         </span>
// //                       </div>
// //                       <div className="flex items-center justify-between text-sm text-gray-600">
// //                         <span>Hours:</span>
// //                         <span className="font-semibold">{task.estimate_hours}h</span>
// //                       </div>
// //                       <div className="flex items-center justify-between text-sm text-gray-600">
// //                         <span>Deadline:</span>
// //                         <span className="font-semibold">{task.deadline}</span>
// //                       </div>
// //                     </div>
// //                     {task.status !== 'done' && (
// //                       <button
// //                         onClick={() => handleCompleteTask(task.id)}
// //                         className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
// //                       >
// //                         <CheckCircle size={18} className="mr-2" />
// //                         Mark Complete
// //                       </button>
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <div className="text-center py-16">
// //                 <div className="text-6xl mb-4">🎉</div>
// //                 <p className="text-xl text-gray-600">No tasks for today!</p>
// //                 <p className="text-gray-500 mt-2">Great job staying on track!</p>
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProjectPlanner;



// import React, { useState, useEffect } from 'react';
// import { projectPlannerAPI } from '../services/api';
// import Loading from '../components/Loading';
// import { 
//   Calendar, 
//   CheckCircle, 
//   Clock, 
//   AlertCircle, 
//   Sparkles, 
//   ChevronRight,
//   Target,
//   TrendingUp,
//   CheckSquare,
//   X
// } from 'lucide-react';

// const ProjectPlanner = () => {
//   const [view, setView] = useState('create');
//   const [formData, setFormData] = useState({
//     project_title: '',
//     description: '',
//     due_in_days: 21,
//     hours_per_day: 3,
//   });
//   const [plan, setPlan] = useState(null);
//   const [todayTasks, setTodayTasks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     if (view === 'tasks') {
//       fetchTodayTasks();
//     }
//   }, [view]);

//   const fetchTodayTasks = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await projectPlannerAPI.getTodayTasks();
//       if (response.data.success) {
//         setTodayTasks(response.data.tasks || []);
//       } else {
//         setError(response.data.error || 'Failed to fetch tasks');
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to fetch tasks');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.project_title.trim() || !formData.description.trim()) {
//       setError('Please fill all required fields');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setPlan(null);
    
//     try {
//       const response = await projectPlannerAPI.createPlan(formData);
      
//       // Backend returns { success: true, plan: {...} }
//       if (response.data.success && response.data.plan) {
//         setPlan(response.data.plan);
//         setSuccessMessage('Project plan created successfully!');
//         setTimeout(() => setSuccessMessage(''), 3000);
//       } else {
//         setError(response.data.error || 'Failed to create plan');
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to create plan. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCompleteTask = async (taskId) => {
//     try {
//       const response = await projectPlannerAPI.completeTask(taskId);
//       if (response.data.success) {
//         setSuccessMessage('Task completed!');
//         setTimeout(() => setSuccessMessage(''), 2000);
//         fetchTodayTasks(); // Refresh the list
//       } else {
//         setError(response.data.error || 'Failed to complete task');
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to complete task');
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority?.toLowerCase()) {
//       case 'high': return 'border-red-500 bg-red-50';
//       case 'medium': return 'border-orange-500 bg-orange-50';
//       case 'low': return 'border-green-500 bg-green-50';
//       default: return 'border-gray-500 bg-gray-50';
//     }
//   };

//   const getPriorityBadge = (priority) => {
//     switch (priority?.toLowerCase()) {
//       case 'high': return 'bg-red-100 text-red-700 border-red-200';
//       case 'medium': return 'bg-orange-100 text-orange-700 border-orange-200';
//       case 'low': return 'bg-green-100 text-green-700 border-green-200';
//       default: return 'bg-gray-100 text-gray-700 border-gray-200';
//     }
//   };

//   const getStatusBadge = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'done': return 'bg-green-100 text-green-700 border-green-200';
//       case 'in_progress': return 'bg-blue-100 text-blue-700 border-blue-200';
//       case 'pending': return 'bg-gray-100 text-gray-600 border-gray-200';
//       default: return 'bg-gray-100 text-gray-600 border-gray-200';
//     }
//   };

//   // Calculate progress statistics
//   const getProgressStats = () => {
//     if (!plan || !plan.weeks) return { total: 0, completed: 0, progress: 0 };
    
//     let total = 0;
//     let completed = 0;
    
//     plan.weeks.forEach(week => {
//       week.tasks?.forEach(task => {
//         total++;
//         if (task.status === 'done') completed++;
//       });
//     });
    
//     return {
//       total,
//       completed,
//       progress: total > 0 ? Math.round((completed / total) * 100) : 0
//     };
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pb-12">
//       {/* Hero Section */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-12">
//           <div className="text-center max-w-3xl mx-auto">
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 backdrop-blur-sm border border-blue-200 mb-6">
//               <Sparkles className="w-4 h-4 text-blue-600" />
//               <span className="text-sm font-semibold text-blue-900">
//                 AI-Powered Project Management
//               </span>
//             </div>

//             {/* Main Headline */}
//             <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
//               Plan Your Projects{' '}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
//                 Smarter
//               </span>
//             </h1>

//             {/* Subheadline */}
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Transform complex projects into actionable weekly plans with AI.
//               Set deadlines, track progress, and achieve your goals faster.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Success/Error Messages */}
//         {successMessage && (
//           <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between animate-fade-in">
//             <div className="flex items-center gap-3">
//               <CheckCircle className="w-5 h-5 text-green-600" />
//               <span className="text-green-800 font-medium">{successMessage}</span>
//             </div>
//             <button onClick={() => setSuccessMessage('')} className="text-green-600 hover:text-green-800">
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//         )}

//         {error && (
//           <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between animate-fade-in">
//             <div className="flex items-center gap-3">
//               <AlertCircle className="w-5 h-5 text-red-600" />
//               <span className="text-red-800 font-medium">{error}</span>
//             </div>
//             <button onClick={() => setError('')} className="text-red-600 hover:text-red-800">
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//         )}

//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           {/* View Selector Tabs */}
//           <div className="flex border-b border-gray-200 bg-gray-50/50">
//             <button
//               onClick={() => setView('create')}
//               className={`flex-1 flex items-center justify-center px-6 py-4 font-semibold transition-all duration-200 ${
//                 view === 'create'
//                   ? 'text-blue-600 bg-white border-b-2 border-blue-600 shadow-sm'
//                   : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <Calendar className="mr-2 w-5 h-5" />
//               Create Plan
//               {plan && (
//                 <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
//                   Active
//                 </span>
//               )}
//             </button>

//             <button
//               onClick={() => setView('tasks')}
//               className={`flex-1 flex items-center justify-center px-6 py-4 font-semibold transition-all duration-200 ${
//                 view === 'tasks'
//                   ? 'text-blue-600 bg-white border-b-2 border-blue-600 shadow-sm'
//                   : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <CheckSquare className="mr-2 w-5 h-5" />
//               Today's Tasks
//               {todayTasks.length > 0 && (
//                 <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
//                   {todayTasks.length}
//                 </span>
//               )}
//             </button>
//           </div>

//           <div className="p-6 md:p-8">
//             {view === 'create' ? (
//               <div className="max-w-4xl mx-auto">
//                 {!plan ? (
//                   <>
//                     {/* Create Plan Form */}
//                     <div className="mb-8">
//                       <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
//                         <Target className="w-6 h-6 text-blue-600" />
//                         New Project Plan
//                       </h2>
//                       <p className="text-gray-600">
//                         Describe your project and let AI create a structured plan with weekly milestones.
//                       </p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-6">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="md:col-span-2">
//                           <label className="block text-sm font-semibold text-gray-700 mb-2">
//                             Project Title <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="project_title"
//                             placeholder="e.g., Build E-commerce Website"
//                             value={formData.project_title}
//                             onChange={handleChange}
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                             required
//                           />
//                         </div>

//                         <div className="md:col-span-2">
//                           <label className="block text-sm font-semibold text-gray-700 mb-2">
//                             Description <span className="text-red-500">*</span>
//                           </label>
//                           <textarea
//                             name="description"
//                             placeholder="Describe your project in detail. Include key objectives, deliverables, and any specific requirements..."
//                             value={formData.description}
//                             onChange={handleChange}
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] resize-y transition-all"
//                             rows={4}
//                             required
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-semibold text-gray-700 mb-2">
//                             Timeline (days)
//                           </label>
//                           <div className="relative">
//                             <input
//                               type="number"
//                               name="due_in_days"
//                               min="1"
//                               max="365"
//                               value={formData.due_in_days}
//                               onChange={handleChange}
//                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                             />
//                             <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
//                           </div>
//                           <p className="mt-1 text-xs text-gray-500">How many days to complete?</p>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-semibold text-gray-700 mb-2">
//                             Daily Commitment (hours)
//                           </label>
//                           <div className="relative">
//                             <input
//                               type="number"
//                               name="hours_per_day"
//                               min="1"
//                               max="12"
//                               value={formData.hours_per_day}
//                               onChange={handleChange}
//                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                             />
//                             <Clock className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
//                           </div>
//                           <p className="mt-1 text-xs text-gray-500">Hours you can dedicate per day</p>
//                         </div>
//                       </div>

//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
//                       >
//                         {loading ? (
//                           <>
//                             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                             Creating Plan...
//                           </>
//                         ) : (
//                           <>
//                             <Sparkles className="w-5 h-5" />
//                             Generate AI Project Plan
//                           </>
//                         )}
//                       </button>
//                     </form>
//                   </>
//                 ) : (
//                   /* Plan Result Display */
//                   <div className="animate-fade-in">
//                     {/* Plan Header */}
//                     <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white mb-6">
//                       <div className="flex items-start justify-between mb-4">
//                         <div>
//                           <h2 className="text-2xl font-bold mb-1">{plan.project_title}</h2>
//                           <p className="text-blue-100 text-sm">
//                             {plan.start_date} → {plan.end_date} • {plan.total_weeks || plan.weeks?.length} weeks
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => setPlan(null)}
//                           className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
//                         >
//                           Create New Plan
//                         </button>
//                       </div>
                      
//                       {/* Progress Bar */}
//                       <div className="mt-4">
//                         <div className="flex justify-between text-sm mb-2">
//                           <span>Project Progress</span>
//                           <span>{getProgressStats().progress}%</span>
//                         </div>
//                         <div className="w-full bg-white/20 rounded-full h-2">
//                           <div 
//                             className="bg-white rounded-full h-2 transition-all duration-500"
//                             style={{ width: `${getProgressStats().progress}%` }}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Weekly Breakdown */}
//                     <div className="space-y-6">
//                       {plan.weeks?.map((week, idx) => (
//                         <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
//                           {/* Week Header */}
//                           <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
//                             <div className="flex items-center gap-3">
//                               <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
//                                 {week.week_number}
//                               </div>
//                               <h3 className="font-bold text-gray-900">
//                                 Week {week.week_number}
//                               </h3>
//                             </div>
//                             <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
//                               {week.week_start} to {week.week_end}
//                             </span>
//                           </div>

//                           {/* Tasks */}
//                           <div className="divide-y divide-gray-100">
//                             {week.tasks?.map((task, taskIdx) => (
//                               <div
//                                 key={taskIdx}
//                                 className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${getPriorityColor(task.priority)}`}
//                               >
//                                 <div className="flex items-start justify-between mb-2">
//                                   <div className="flex items-center gap-3">
//                                     <span className="font-mono text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
//                                       {task.task_id}
//                                     </span>
//                                     <h4 className="font-semibold text-gray-900">
//                                       {task.description || task.title}
//                                     </h4>
//                                   </div>
//                                   <div className="flex items-center gap-2">
//                                     <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityBadge(task.priority)}`}>
//                                       {task.priority}
//                                     </span>
//                                     <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(task.status)}`}>
//                                       {task.status}
//                                     </span>
//                                   </div>
//                                 </div>
                                
//                                 <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
//                                   <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
//                                     <Clock className="w-4 h-4" />
//                                     {task.estimate_hours}h estimated
//                                   </span>
//                                   <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
//                                     <Calendar className="w-4 h-4" />
//                                     Due {task.deadline}
//                                   </span>
//                                   {task.reminder_dates && task.reminder_dates.length > 0 && (
//                                     <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded border border-yellow-200">
//                                       <AlertCircle className="w-4 h-4" />
//                                       Reminder: {task.reminder_dates[0]}
//                                     </span>
//                                   )}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Loading State */}
//                 {loading && !plan && (
//                   <div className="mt-8 flex flex-col items-center justify-center py-12">
//                     <Loading message="AI is analyzing your project and creating a structured plan..." />
//                     <p className="mt-4 text-sm text-gray-500">This may take a few moments</p>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               /* Today's Tasks View */
//               <div>
//                 <div className="mb-6 flex items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//                       <TrendingUp className="w-6 h-6 text-blue-600" />
//                       Today's Focus
//                     </h2>
//                     <p className="text-gray-600 mt-1">
//                       {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
//                     </p>
//                   </div>
//                   <button
//                     onClick={fetchTodayTasks}
//                     className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
//                   >
//                     Refresh
//                   </button>
//                 </div>

//                 {loading ? (
//                   <div className="flex flex-col items-center justify-center py-16">
//                     <Loading message="Loading your tasks..." />
//                   </div>
//                 ) : todayTasks.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                     {todayTasks.map((task) => (
//                       <div
//                         key={task.id}
//                         className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200"
//                       >
//                         {/* Card Header */}
//                         <div className="flex items-start justify-between mb-4">
//                           <div className="flex-1">
//                             <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
//                               {task.project_title}
//                             </p>
//                             <h3 className="font-bold text-gray-900 leading-tight">
//                               {task.title}
//                             </h3>
//                           </div>
//                           <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getPriorityBadge(task.priority)}`}>
//                             {task.priority}
//                           </span>
//                         </div>

//                         {/* Task Meta */}
//                         <div className="space-y-2 mb-6">
//                           <div className="flex items-center justify-between text-sm">
//                             <span className="text-gray-500 flex items-center gap-1">
//                               <Clock className="w-4 h-4" />
//                               Est. Time
//                             </span>
//                             <span className="font-semibold text-gray-900">{task.estimate_hours}h</span>
//                           </div>
//                           <div className="flex items-center justify-between text-sm">
//                             <span className="text-gray-500 flex items-center gap-1">
//                               <Calendar className="w-4 h-4" />
//                               Deadline
//                             </span>
//                             <span className="font-semibold text-gray-900">{task.deadline}</span>
//                           </div>
//                           {task.reminder_date && (
//                             <div className="flex items-center justify-between text-sm">
//                               <span className="text-yellow-600 flex items-center gap-1">
//                                 <AlertCircle className="w-4 h-4" />
//                                 Reminder
//                               </span>
//                               <span className="font-semibold text-yellow-700">{task.reminder_date}</span>
//                             </div>
//                           )}
//                         </div>

//                         {/* Action Button */}
//                         {task.status !== 'done' ? (
//                           <button
//                             onClick={() => handleCompleteTask(task.id)}
//                             className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transform hover:-translate-y-0.5 transition-all duration-200 group-hover:shadow-md"
//                           >
//                             <CheckCircle className="w-5 h-5" />
//                             Mark Complete
//                           </button>
//                         ) : (
//                           <div className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-100 text-green-700 font-semibold rounded-lg">
//                             <CheckCircle className="w-5 h-5" />
//                             Completed
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
//                     <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <CheckCircle className="w-10 h-10 text-green-600" />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">All Caught Up!</h3>
//                     <p className="text-gray-600 max-w-md mx-auto mb-6">
//                       You have no pending tasks for today. Great job staying on track with your project goals!
//                     </p>
//                     <button
//                       onClick={() => setView('create')}
//                       className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
//                     >
//                       <Sparkles className="w-5 h-5" />
//                       Create New Plan
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectPlanner;



import React, { useState, useEffect } from 'react';
import { projectPlannerAPI } from '../services/api';
import Loading from '../components/Loading';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  ChevronRight,
  Target,
  TrendingUp,
  CheckSquare,
  X,
  Plus,
  Trash2,
  ArrowLeft,
  FolderOpen,
  Mail,
  User
} from 'lucide-react';

const ProjectPlanner = () => {
  // View states: 'list', 'create', 'detail', 'tasks'
  const [view, setView] = useState('list');
  const [selectedProject, setSelectedProject] = useState(null);
  
  // User state
  const [user, setUser] = useState(null);
  
  // Data states
  const [projects, setProjects] = useState([]);
  const [plan, setPlan] = useState(null);
  const [todayTasks, setTodayTasks] = useState([]);
  
  // Form states
  const [formData, setFormData] = useState({
    project_title: '',
    description: '',
    due_in_days: 21,
    hours_per_day: 3,
  });
  
  // Email notification state
  const [notificationEmail, setNotificationEmail] = useState('');
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Load user and projects on mount
  useEffect(() => {
    // Fetch user from storage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    setNotificationEmail(userData.email || '');
    
    fetchProjects();
  }, []);

  // Fetch all projects for current user
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await projectPlannerAPI.getUserProjects();
      if (response.data.success) {
        setProjects(response.data.projects || []);
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch specific project details
  const fetchProjectDetail = async (projectId) => {
    setLoading(true);
    setError('');
    try {
      const response = await projectPlannerAPI.getProjectDetail(projectId);
      if (response.data.success) {
        setPlan(response.data.plan);
        setSelectedProject(response.data.plan);
        setView('detail');
      } else {
        setError(response.data.error || 'Failed to load project');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  // Fetch today's tasks across all projects
  const fetchTodayTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await projectPlannerAPI.getTodayTasks();
      if (response.data.success) {
        setTodayTasks(response.data.tasks || []);
      } else {
        setError(response.data.error || 'Failed to fetch tasks');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.project_title.trim() || !formData.description.trim()) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(true);
    setError('');
    
    // Get email from localStorage as fallback
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    const submitData = {
      ...formData,
      notification_email: notificationEmail || currentUser.email || ''
    };
    
    try {
      const response = await projectPlannerAPI.createPlan(submitData);
      
      if (response.data.success && response.data.plan) {
        setSuccessMessage('Project plan created successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        
        // Reset form
        setFormData({
          project_title: '',
          description: '',
          due_in_days: 21,
          hours_per_day: 3,
        });
        
        // Refresh projects list and show the new project
        await fetchProjects();
        
        // Show the newly created project detail
        if (response.data.plan.id || response.data.plan.project_id) {
          fetchProjectDetail(response.data.plan.id || response.data.plan.project_id);
        }
        
      } else {
        setError(response.data.error || 'Failed to create plan');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTask = async (taskId, fromDetail = false) => {
    try {
      const response = await projectPlannerAPI.completeTask(taskId);
      if (response.data.success) {
        setSuccessMessage('Task completed!');
        setTimeout(() => setSuccessMessage(''), 2000);
        
        // Refresh current view
        if (fromDetail && selectedProject) {
          fetchProjectDetail(selectedProject.id);
        } else {
          fetchTodayTasks();
        }
      } else {
        setError(response.data.error || 'Failed to complete task');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to complete task');
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const response = await projectPlannerAPI.deleteProject(projectId);
      if (response.data.success) {
        setSuccessMessage('Project deleted');
        setTimeout(() => setSuccessMessage(''), 2000);
        fetchProjects();
        if (view === 'detail') setView('list');
      }
    } catch (err) {
      setError('Failed to delete project');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-orange-500 bg-orange-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'done': return 'bg-green-100 text-green-700 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  // Projects List View
  const renderProjectsList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
          <p className="text-gray-600 mt-1">Manage and track all your project plans</p>
        </div>
        <button
          onClick={() => setView('create')}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Projects Yet</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Create your first AI-powered project plan to get started with structured task management.
          </p>
          <button
            onClick={() => setView('create')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            Create First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group"
              onClick={() => fetchProjectDetail(project.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {project.title.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProject(project.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{project.title}</h3>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar className="w-4 h-4" />
                {project.start_date} → {project.end_date}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 rounded-full h-2 transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{project.completed_tasks}/{project.total_tasks} tasks</span>
                  <span>{project.total_weeks} weeks</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
                View Details <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Create Project Form View
  const renderCreateForm = () => (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => setView('list')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Projects
      </button>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-600" />
          New Project Plan
        </h2>
        <p className="text-gray-600">
          Describe your project and let AI create a structured plan with weekly milestones.
        </p>
      </div>

      {/* Email Notification Settings */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-600" />
          Notification Email
        </h3>
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="your@email.com"
              value={notificationEmail}
              onChange={(e) => setNotificationEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Task reminders will be sent to this email address
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="project_title"
              placeholder="e.g., Build E-commerce Website"
              value={formData.project_title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Describe your project in detail..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] resize-y transition-all"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Timeline (days)
            </label>
            <input
              type="number"
              name="due_in_days"
              min="1"
              max="365"
              value={formData.due_in_days}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Daily Commitment (hours)
            </label>
            <input
              type="number"
              name="hours_per_day"
              min="1"
              max="12"
              value={formData.hours_per_day}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating Plan...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate AI Project Plan
            </>
          )}
        </button>
      </form>
    </div>
  );

  // Project Detail View
  const renderProjectDetail = () => {
    if (!plan) return null;
    
    return (
      <div className="space-y-6">
        <button
          onClick={() => setView('list')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Projects
        </button>

        {/* Project Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">{plan.project_title}</h2>
              <p className="text-blue-100 text-sm">
                {plan.start_date} → {plan.end_date} • {plan.total_weeks} weeks
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView('create')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
              >
                New Plan
              </button>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Project Progress</span>
              <span>{plan.progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${plan.progress}%` }}
              />
            </div>
            <p className="text-sm text-blue-100 mt-2">
              {plan.completed_tasks} of {plan.total_tasks} tasks completed
            </p>
          </div>
        </div>

        {/* Weekly Tasks */}
        <div className="space-y-6">
          {plan.weeks?.map((week, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {week.week_number}
                  </div>
                  <h3 className="font-bold text-gray-900">Week {week.week_number}</h3>
                </div>
                <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                  {week.week_start} to {week.week_end}
                </span>
              </div>

              <div className="divide-y divide-gray-100">
                {week.tasks?.map((task, taskIdx) => (
                  <div
                    key={taskIdx}
                    className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${getPriorityColor(task.priority)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="font-mono text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {task.task_id}
                        </span>
                        <h4 className="font-semibold text-gray-900">
                          {task.title || task.description || 'Untitled Task'}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityBadge(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-3">
                      <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                        <Clock className="w-4 h-4" />
                        {task.estimate_hours}h
                      </span>
                      <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                        <Calendar className="w-4 h-4" />
                        Due {task.deadline}
                      </span>
                      {task.reminder_date && (
                        <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded border border-yellow-200">
                          <AlertCircle className="w-4 h-4" />
                          Reminder: {task.reminder_date}
                        </span>
                      )}
                      
                      {task.status !== 'done' && (
                        <button
                          onClick={() => handleCompleteTask(task.id, true)}
                          className="ml-auto flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Today's Tasks View
  const renderTodayTasks = () => {
    // Separate tasks into categories
    const overdueTasks = todayTasks.filter(t => t.is_overdue && !t.is_today);
    const todayTasksList = todayTasks.filter(t => t.is_today);
    const upcomingTasks = todayTasks.filter(t => !t.is_today && !t.is_overdue);

    const TaskCard = ({ task, showOverdue = false }) => (
      <div
        key={task.id}
        className={`bg-white border rounded-xl p-6 hover:shadow-lg transition-all ${
          showOverdue ? 'border-red-300 bg-red-50' : 'border-gray-200'
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p 
              className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1 cursor-pointer hover:underline"
              onClick={() => fetchProjectDetail(task.project_id)}
            >
              {task.project_title}
            </p>
            <h3 className="font-bold text-gray-900 leading-tight">
              {task.title}
            </h3>
            {showOverdue && (
              <span className="inline-flex items-center gap-1 text-red-600 text-sm font-semibold mt-1">
                <AlertCircle className="w-4 h-4" />
                OVERDUE - Due {task.deadline}
              </span>
            )}
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getPriorityBadge(task.priority)}`}>
            {task.priority}
          </span>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Est. Time</span>
            <span className="font-semibold text-gray-900">{task.estimate_hours}h</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Scheduled</span>
            <span className={`font-semibold ${task.is_today ? 'text-blue-600' : 'text-gray-900'}`}>
              {task.is_today ? 'Today' : task.date}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Deadline</span>
            <span className="font-semibold text-gray-900">{task.deadline}</span>
          </div>
        </div>

        {task.status !== 'done' ? (
          <button
            onClick={() => handleCompleteTask(task.id)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            <CheckCircle className="w-5 h-5" />
            Mark Complete
          </button>
        ) : (
          <div className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-100 text-green-700 font-semibold rounded-lg">
            <CheckCircle className="w-5 h-5" />
            Completed
          </div>
        )}
      </div>
    );

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Your Tasks
            </h2>
            <p className="text-gray-600 mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <button
            onClick={fetchTodayTasks}
            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loading message="Loading your tasks..." />
          </div>
        ) : todayTasks.length > 0 ? (
          <div className="space-y-8">
            {/* Overdue Tasks */}
            {overdueTasks.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Overdue ({overdueTasks.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {overdueTasks.map(task => <TaskCard key={task.id} task={task} showOverdue={true} />)}
                </div>
              </div>
            )}

            {/* Today's Tasks */}
            {todayTasksList.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-blue-600 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today ({todayTasksList.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {todayTasksList.map(task => <TaskCard key={task.id} task={task} />)}
                </div>
              </div>
            )}

            {/* Upcoming Tasks */}
            {upcomingTasks.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-600 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Due Soon ({upcomingTasks.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {upcomingTasks.map(task => <TaskCard key={task.id} task={task} />)}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              You have no pending tasks. Check your projects to see upcoming tasks.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <br/>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-4">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-900">
                AI-Powered Project Management
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
              Plan Your Projects{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-900">
                Smarter
              </span>
            </h1>

            <br/>

            {/* Subheadline */}
             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
               Transform complex projects into actionable weekly plans with AI.
               Set deadlines, track progress, and achieve your goals faster.
             </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Messages */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage('')} className="text-green-600 hover:text-green-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800 font-medium">{error}</span>
            </div>
            <button onClick={() => setError('')} className="text-red-600 hover:text-red-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50/50">
            <button
              onClick={() => { setView('list'); fetchProjects(); }}
              className={`flex-1 flex items-center justify-center px-6 py-4 font-semibold transition-all duration-200 ${
                view === 'list' || view === 'detail'
                  ? 'text-blue-600 bg-white border-b-2 border-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FolderOpen className="mr-2 w-5 h-5" />
              My Projects
            </button>

            <button
              onClick={() => { setView('tasks'); fetchTodayTasks(); }}
              className={`flex-1 flex items-center justify-center px-6 py-4 font-semibold transition-all duration-200 ${
                view === 'tasks'
                  ? 'text-blue-600 bg-white border-b-2 border-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <CheckSquare className="mr-2 w-5 h-5" />
              Today's Tasks
              {todayTasks.length > 0 && view !== 'tasks' && (
                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                  {todayTasks.length}
                </span>
              )}
            </button>
          </div>

          <div className="p-6 md:p-8">
            {view === 'list' && renderProjectsList()}
            {view === 'create' && renderCreateForm()}
            {view === 'detail' && renderProjectDetail()}
            {view === 'tasks' && renderTodayTasks()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPlanner;