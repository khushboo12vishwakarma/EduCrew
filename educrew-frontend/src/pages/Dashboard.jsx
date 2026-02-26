// // src/pages/Dashboard.jsx - LIGHT MODE ONLY VERSION
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Loading from '../components/Loading';
// import api from '../services/api'; 


// // Icons (using inline SVG for consistency)
// const Icons = {
//   study: (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//     </svg>
//   ),
//   presentation: (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//     </svg>
//   ),
//   code: (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//     </svg>
//   ),
//   project: (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//     </svg>
//   ),
//   quality: (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//     </svg>
//   ),
//   trendUp: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//     </svg>
//   ),
//   trendDown: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
//     </svg>
//   ),
//   fire: (
//     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//       <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
//     </svg>
//   ),
//   trophy: (
//     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//     </svg>
//   ),
//   clock: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//     </svg>
//   ),
//   alert: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//     </svg>
//   ),
// };

// // Simple Bar Chart Component
// const SimpleBarChart = ({ data }) => {
//   const maxValue = Math.max(...data.map(d => d.total), 1);
  
//   return (
//     <div className="flex items-end justify-between h-32 gap-2">
//       {data.map((day, idx) => (
//         <div key={idx} className="flex flex-col items-center flex-1">
//           <div className="w-full flex flex-col gap-1">
//             <div 
//               className="w-full bg-blue-500 rounded-t transition-all duration-500 hover:bg-blue-600"
//               style={{ height: `${(day.study / maxValue) * 100}px` }}
//               title={`Study: ${day.study}`}
//             />
//             <div 
//               className="w-full bg-purple-500 rounded-t transition-all duration-500 hover:bg-purple-600"
//               style={{ height: `${(day.code / maxValue) * 100}px` }}
//               title={`Code: ${day.code}`}
//             />
//             <div 
//               className="w-full bg-green-500 rounded-t transition-all duration-500 hover:bg-green-600"
//               style={{ height: `${(day.presentations / maxValue) * 100}px` }}
//               title={`Presentations: ${day.presentations}`}
//             />
//           </div>
//           <span className="text-xs text-slate-500 mt-1">{day.day}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// // Progress Ring Component
// const ProgressRing = ({ progress, size = 60, strokeWidth = 6, color = "blue" }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = radius * 2 * Math.PI;
//   const offset = circumference - (progress / 100) * circumference;
  
//   const colorClasses = {
//     blue: "stroke-blue-500",
//     green: "stroke-green-500",
//     purple: "stroke-purple-500",
//     orange: "stroke-orange-500",
//   };

//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       <svg className="transform -rotate-90 w-full h-full">
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           stroke="currentColor"
//           strokeWidth={strokeWidth}
//           fill="transparent"
//           className="text-slate-200"
//         />
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           stroke="currentColor"
//           strokeWidth={strokeWidth}
//           fill="transparent"
//           strokeDasharray={circumference}
//           strokeDashoffset={offset}
//           strokeLinecap="round"
//           className={`${colorClasses[color]} transition-all duration-1000 ease-out`}
//         />
//       </svg>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <span className="text-sm font-bold text-slate-700">
//           {Math.round(progress)}%
//         </span>
//       </div>
//     </div>
//   );
// };

// // ✅ DYNAMIC: Clickable Stat Card Component
// const StatCard = ({ title, value, icon, trend, trendValue, color = "blue", onClick, linkTo }) => {
//   const colorClasses = {
//     blue: "from-blue-500 to-blue-600",
//     purple: "from-purple-500 to-purple-600",
//     green: "from-green-500 to-green-600",
//     orange: "from-orange-500 to-orange-600",
//     pink: "from-pink-500 to-pink-600",
//   };

//   const content = (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95">
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-sm font-medium text-slate-500">{title}</p>
//           <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
//           {trend && (
//             <div className={`flex items-center gap-1 mt-2 text-sm ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-slate-500'}`}>
//               {trend === 'up' ? Icons.trendUp : trend === 'down' ? Icons.trendDown : null}
//               <span>{trendValue}</span>
//             </div>
//           )}
//         </div>
//         <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} text-white`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );

//   if (linkTo) {
//     return (
//       <Link to={linkTo} className="block">
//         {content}
//       </Link>
//     );
//   }
  
//   if (onClick) {
//     return (
//       <div onClick={onClick} className="block">
//         {content}
//       </div>
//     );
//   }
  
//   return content;
// };

// // Activity Item Component
// const ActivityItem = ({ activity }) => {
//   const typeIcons = {
//     study_material: { icon: Icons.study, color: "text-blue-500", bg: "bg-blue-100" },
//     presentation: { icon: Icons.presentation, color: "text-green-500", bg: "bg-green-100" },
//     code_practice: { icon: Icons.code, color: "text-purple-500", bg: "bg-purple-100" },
//     code_interview: { icon: Icons.code, color: "text-orange-500", bg: "bg-orange-100" },
//     task_completed: { icon: Icons.project, color: "text-pink-500", bg: "bg-pink-100" },
//     quality_review: { icon: Icons.quality, color: "text-teal-500", bg: "bg-teal-100" },
//   };

//   const style = typeIcons[activity.type] || typeIcons.study_material;

//   return (
//     <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors">
//       <div className={`p-2 rounded-lg ${style.bg} ${style.color}`}>
//         {style.icon}
//       </div>
//       <div className="flex-1 min-w-0">
//         <p className="font-medium text-slate-900 truncate">{activity.title}</p>
//         <p className="text-sm text-slate-500">{activity.detail}</p>
//         <p className="text-xs text-slate-400 mt-1">
//           {new Date(activity.timestamp).toLocaleString()}
//         </p>
//       </div>
//     </div>
//   );
// };

// // Achievement Badge Component
// const AchievementBadge = ({ achievement, unlocked }) => (
//   <div className={`p-4 rounded-xl border-2 transition-all ${unlocked ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-400' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
//     <div className="text-3xl mb-2">{achievement.icon}</div>
//     <h4 className={`font-bold text-sm ${unlocked ? 'text-slate-900' : 'text-slate-500'}`}>
//       {achievement.title}
//     </h4>
//     <p className="text-xs text-slate-500 mt-1">{achievement.description}</p>
//     {unlocked && achievement.unlocked_at && (
//       <p className="text-xs text-green-600 mt-2 font-medium">
//         Unlocked {new Date(achievement.unlocked_at).toLocaleDateString()}
//       </p>
//     )}
//   </div>
// );

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [dashboardData, setDashboardData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/dashboard/overview/');
//       setDashboardData(response.data);
//     } catch (err) {
//       console.error('Dashboard fetch error:', err);
//       setError('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ DYNAMIC: Navigation handlers for cards
//   const handleStudyMaterialsClick = () => {
//     navigate('/my-study-materials');
//   };

//   const handlePresentationsClick = () => {
//   navigate('/my-presentations');
// };

//   const handleCodeSessionsClick = () => {
//     navigate('/my-code-sessions');
//   };

//   const handleProjectsClick = () => {
//     navigate('/my-projects');
//   };

//   if (loading) return <Loading />;
//   if (error) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <p className="text-red-500 mb-4">{error}</p>
//         <button 
//           onClick={fetchDashboardData}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           Retry
//         </button>
//       </div>
//     </div>
//   );

//   if (!dashboardData?.success) return (
//     <div className="min-h-screen flex items-center justify-center text-slate-500">
//       No dashboard data available
//     </div>
//   );

//   const { summary, this_week, projects, recent_activity, weekly_progress_chart, skill_distribution } = dashboardData;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white pb-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-900">
//             Welcome back, {user?.username || 'Student'}! 👋
//           </h1>
//           <p className="text-slate-500 mt-2">
//             Here's your learning progress and upcoming tasks
//           </p>
//         </div>

//         {/* Level Progress Bar */}
//         {dashboardData.level && (
//           <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-slate-200">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg text-white">
//                   {Icons.trophy}
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-slate-900">Level {dashboardData.level.level}</h3>
//                   <p className="text-sm text-slate-500">Keep learning to level up!</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm font-medium text-slate-900">
//                   {dashboardData.level.current_xp} / {dashboardData.level.xp_to_next} XP
//                 </p>
//                 <p className="text-xs text-slate-500">
//                   {dashboardData.level.progress_percent}% to next level
//                 </p>
//               </div>
//             </div>
//             <div className="w-full bg-slate-200 rounded-full h-3">
//               <div 
//                 className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-1000"
//                 style={{ width: `${dashboardData.level.progress_percent}%` }}
//               />
//             </div>
//           </div>
//         )}

//         {/* ✅ DYNAMIC: Clickable Quick Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard 
//             title="Study Materials"
//             value={summary.total_study_materials}
//             icon={Icons.study}
//             color="blue"
//             onClick={handleStudyMaterialsClick}
//           />
//           <StatCard 
//             title="Presentations"
//             value={summary.total_presentations}
//             icon={Icons.presentation}
//             color="green"
//             onClick={handlePresentationsClick}
//           />
//           <StatCard 
//             title="Code Sessions"
//             value={summary.total_code_sessions}
//             icon={Icons.code}
//             color="purple"
//             onClick={handleCodeSessionsClick}
//           />
//           <StatCard 
//             title="Active Projects"
//             value={projects.total_tasks - projects.completed_tasks}
//             icon={Icons.project}
//             color="orange"
//             onClick={handleProjectsClick}
//           />
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
//           {/* Left Column - Activity & Chart */}
//           <div className="lg:col-span-2 space-y-8">
            
//             {/* Weekly Activity Chart */}
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
//               <h3 className="text-lg font-bold text-slate-900 mb-6">Weekly Activity</h3>
//               <SimpleBarChart data={weekly_progress_chart} />
//               <div className="flex items-center justify-center gap-6 mt-4 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-blue-500 rounded" />
//                   <span className="text-slate-600">Study</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-purple-500 rounded" />
//                   <span className="text-slate-600">Code</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-green-500 rounded" />
//                   <span className="text-slate-600">Presentations</span>
//                 </div>
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
//                 <button 
//                   onClick={() => fetchDashboardData()}
//                   className="text-sm text-blue-600 hover:underline"
//                 >
//                   Refresh
//                 </button>
//               </div>
//               <div className="space-y-2">
//                 {recent_activity.length > 0 ? (
//                   recent_activity.map((activity, idx) => (
//                     <ActivityItem key={idx} activity={activity} />
//                   ))
//                 ) : (
//                   <p className="text-center text-slate-500 py-8">
//                     No recent activity. Start learning!
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Coding Skills */}
//             {skill_distribution?.languages?.length > 0 && (
//               <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
//                 <h3 className="text-lg font-bold text-slate-900 mb-6">Coding Skills</h3>
//                 <div className="space-y-4">
//                   {skill_distribution.languages.map((lang) => (
//                     <div key={lang.language} className="flex items-center gap-4">
//                       <span className="w-20 text-sm font-medium text-slate-700 capitalize">
//                         {lang.language}
//                       </span>
//                       <div className="flex-1 bg-slate-200 rounded-full h-2">
//                         <div 
//                           className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
//                           style={{ width: `${Math.min((lang.count / 20) * 100, 100)}%` }}
//                         />
//                       </div>
//                       <span className="text-sm text-slate-500 w-12 text-right">
//                         {lang.count}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Tasks & Progress */}
//           <div className="space-y-8">
            
//             {/* Overall Completion */}
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
//               <h3 className="text-lg font-bold text-slate-900 mb-4">Overall Progress</h3>
//               <div className="flex items-center justify-center">
//                 <ProgressRing progress={summary.overall_completion_rate} size={120} strokeWidth={10} color="blue" />
//               </div>
//               <p className="text-center text-sm text-slate-500 mt-4">
//                 Based on your project completion and code success rate
//               </p>
//             </div>

//             {/* Upcoming Deadlines */}
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-bold text-slate-900">Upcoming Deadlines</h3>
//                 {projects.tasks_due_today > 0 && (
//                   <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
//                     {projects.tasks_due_today} due today
//                   </span>
//                 )}
//               </div>
//               <div className="space-y-3">
//                 {projects.overdue_tasks > 0 && (
//                   <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg text-red-700 text-sm">
//                     {Icons.alert}
//                     <span>{projects.overdue_tasks} overdue tasks</span>
//                   </div>
//                 )}
//                 <Link 
//                   to="/planner"
//                   className="block text-center py-2 text-sm text-blue-600 hover:underline"
//                 >
//                   View all tasks →
//                 </Link>
//               </div>
//             </div>

//             {/* This Week's Stats */}
//             <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
//               <h3 className="text-lg font-bold text-slate-900 mb-4">This Week</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-slate-600">Study Materials</span>
//                   <span className="font-bold text-slate-900">{this_week.study_materials_created}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-slate-600">Code Sessions</span>
//                   <span className="font-bold text-slate-900">{this_week.code_sessions}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-slate-600">Presentations</span>
//                   <span className="font-bold text-slate-900">{this_week.presentations_created}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-slate-600">Tasks Completed</span>
//                   <span className="font-bold text-green-600">{this_week.tasks_done}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Quick Actions */}
//             <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
//               <h3 className="text-lg font-bold mb-4">Quick Start</h3>
//               <div className="space-y-3">
//                 <Link 
//                   to="/study"
//                   className="block w-full text-center py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
//                 >
//                   📚 Create Study Notes
//                 </Link>
//                 <Link 
//                   to="/code"
//                   className="block w-full text-center py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
//                 >
//                   💻 Practice Coding
//                 </Link>
//                 <Link 
//                   to="/planner"
//                   className="block w-full text-center py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
//                 >
//                   📋 Plan a Project
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Achievements Section */}
//         {dashboardData.achievements && (
//           <div className="mt-12">
//             <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
//               {Icons.trophy}
//               Achievements
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//               {dashboardData.achievements.map((achievement, idx) => (
//                 <AchievementBadge 
//                   key={idx}
//                   achievement={achievement}
//                   unlocked={!!achievement.unlocked_at}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// src/pages/Dashboard.jsx - ENHANCED UI/UX VERSION
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import api from '../services/api';
import ActivityChart from '../components/ActivityChart';

// --- Icons (Enhanced with consistent sizing) ---
const Icons = {
  study: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  presentation: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  code: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  project: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  quality: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  trendUp: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  trendDown: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
    </svg>
  ),
  fire: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
    </svg>
  ),
  trophy: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  clock: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  alert: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  arrowRight: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
};

// --- NEW: Animated Weekly Activity (Orb System) ---
const AnimatedWeeklyChart = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.total), 1);

  return (
    <div className="flex items-end justify-between h-48 px-2 pb-2 relative">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="border-t border-slate-400 w-full h-0" />
        ))}
      </div>

      {data.map((day, idx) => {
        const totalHeight = (day.total / maxValue) * 100;
        // Ensure minimum visibility for small values
        const displayHeight = Math.max(totalHeight, 5); 
        
        return (
          <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group relative">
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10 pointer-events-none shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <div className="font-bold mb-1 border-b border-slate-600 pb-1">{day.day}</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Study: {day.study}</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Code: {day.code}</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Pres: {day.presentations}</div>
            </div>

            {/* The Animated Bar Container */}
            <div 
              className="w-full max-w-[40px] relative flex flex-col justify-end rounded-t-2xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:brightness-110"
              style={{ height: `${displayHeight}%` }}
            >
              {/* Stacked Segments with Animation */}
              {/* Presentations (Bottom) */}
              <div 
                className="w-full bg-emerald-400 transition-all duration-1000 ease-out"
                style={{ 
                  height: `${(day.presentations / day.total) * 100}%`,
                  animation: `growUp 0.8s ease-out ${idx * 0.1}s backwards`
                }}
              />
              {/* Code (Middle) */}
              <div 
                className="w-full bg-purple-500 transition-all duration-1000 ease-out"
                style={{ 
                  height: `${(day.code / day.total) * 100}%`,
                  animation: `growUp 0.8s ease-out ${idx * 0.1 + 0.1}s backwards`
                }}
              />
              {/* Study (Top) */}
              <div 
                className="w-full bg-blue-500 transition-all duration-1000 ease-out"
                style={{ 
                  height: `${(day.study / day.total) * 100}%`,
                  animation: `growUp 0.8s ease-out ${idx * 0.1 + 0.2}s backwards`
                }}
              />
              
              {/* Shine Effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            </div>

            {/* Day Label */}
            <span className="text-xs font-medium text-slate-400 mt-3 group-hover:text-blue-600 transition-colors">
              {day.day.substring(0, 3)}
            </span>
          </div>
        );
      })}
      
      {/* Inject Keyframes for Animation */}
      <style>{`
        @keyframes growUp {
          from { height: 0; opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// --- Progress Ring (Enhanced with Glow) ---
const ProgressRing = ({ progress, size = 100, strokeWidth = 8, color = "blue" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  const colorClasses = {
    blue: "stroke-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]",
    green: "stroke-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    purple: "stroke-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]",
    orange: "stroke-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]",
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-100"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${colorClasses[color]} transition-all duration-1000 ease-out`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-800">
          {Math.round(progress)}%
        </span>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Done</span>
      </div>
    </div>
  );
};

// --- Stat Card (Glassmorphism & Hover Effects) ---
const StatCard = ({ title, value, icon, trend, trendValue, color = "blue", onClick, linkTo }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-500 group-hover:text-white",
    purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-500 group-hover:text-white",
    green: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white",
    orange: "bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white",
    pink: "bg-pink-50 text-pink-600 group-hover:bg-pink-500 group-hover:text-white",
  };

  const content = (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden h-full">
      {/* Background decoration */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${colorClasses[color].split(' ')[0]}`}></div>
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">{value}</h3>
          {trend && (
            <div className={`flex items-center gap-1 mt-3 text-xs font-bold px-2 py-1 rounded-full w-fit ${trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {trend === 'up' ? Icons.trendUp : Icons.trendDown}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl transition-all duration-300 ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  if (linkTo) return <Link to={linkTo} className="block h-full">{content}</Link>;
  if (onClick) return <div onClick={onClick} className="block h-full">{content}</div>;
  return content;
};

// --- Activity Item (Timeline Style) ---
const ActivityItem = ({ activity }) => {
  const typeIcons = {
    study_material: { icon: Icons.study, color: "text-blue-500", bg: "bg-blue-100", border: "border-blue-200" },
    presentation: { icon: Icons.presentation, color: "text-emerald-500", bg: "bg-emerald-100", border: "border-emerald-200" },
    code_practice: { icon: Icons.code, color: "text-purple-500", bg: "bg-purple-100", border: "border-purple-200" },
    code_interview: { icon: Icons.code, color: "text-orange-500", bg: "bg-orange-100", border: "border-orange-200" },
    task_completed: { icon: Icons.project, color: "text-pink-500", bg: "bg-pink-100", border: "border-pink-200" },
    quality_review: { icon: Icons.quality, color: "text-teal-500", bg: "bg-teal-100", border: "border-teal-200" },
  };

  const style = typeIcons[activity.type] || typeIcons.study_material;

  return (
    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group border border-transparent hover:border-slate-100">
      <div className={`p-2.5 rounded-lg ${style.bg} ${style.color} shadow-sm ring-1 ${style.border} transition-transform group-hover:scale-110`}>
        {style.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-800 text-sm truncate group-hover:text-blue-600 transition-colors">{activity.title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{activity.detail}</p>
        <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-400 font-medium">
          {Icons.clock}
          {new Date(activity.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </div>
    </div>
  );
};

// --- Achievement Badge (3D Tilt Effect) ---
 const AchievementBadge = ({ achievement, unlocked }) => (
  <div className={`p-4 rounded-xl border-2 transition-all ${unlocked ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-400' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
    <div className="text-3xl mb-2">{achievement.icon}</div>
    <h4 className={`font-bold text-sm ${unlocked ? 'text-slate-900' : 'text-slate-500'}`}>
      {achievement.title}
    </h4>
    <p className="text-xs text-slate-500 mt-1">{achievement.description}</p>
    {unlocked && achievement.unlocked_at && (
      <p className="text-xs text-green-600 mt-2 font-medium">
        Unlocked {new Date(achievement.unlocked_at).toLocaleDateString()}
      </p>
    )}
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/dashboard/overview/');
      setDashboardData(response.data);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleStudyMaterialsClick = () => navigate('/my-study-materials');
  const handlePresentationsClick = () => navigate('/my-presentations');
  const handleCodeSessionsClick = () => navigate('/my-code-sessions');
  const handleProjectsClick = () => navigate('/my-projects');

  if (loading) return <Loading />;
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-red-100">
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <p className="text-red-500 font-medium mb-4">{error}</p>
        <button 
          onClick={fetchDashboardData}
          className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  if (!dashboardData?.success) return (
    <div className="min-h-screen flex items-center justify-center text-slate-500 bg-slate-50">
      No dashboard data available
    </div>
  );

  const { summary, this_week, projects, recent_activity, weekly_progress_chart, skill_distribution } = dashboardData;

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">Overview</h2>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{user?.username || 'Student'}</span> 👋
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              Here's what's happening with your learning journey today.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm text-slate-400">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        {/* EduCrew Level Progress - Journey Card */}
{dashboardData.level && (
  <div className="relative overflow-hidden rounded-2xl mb-8 bg-slate-900 shadow-2xl shadow-indigo-500/20">
    {/* Animated Background Elements */}
    <div className="absolute inset-0">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute inset-0 bg-[url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;)] opacity-20" />
    </div>

    <div className="relative p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        

        {/* Progress Info */}
        <div className="flex-1 w-full text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {dashboardData.level.level < 5 ? 'Knowledge Seeker' : 
                 dashboardData.level.level < 10 ? 'Active Learner' : 
                 dashboardData.level.level < 20 ? 'Study Champion' : 'EduCrew Legend'}
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                {dashboardData.level.progress_percent > 80 ? 'Almost there! Next milestone awaits' :
                 dashboardData.level.progress_percent > 50 ? 'Great progress! Keep the streak alive' :
                 'Every lesson counts. Build your momentum!'}
              </p>
            </div>
            
            {/* XP Display */}
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur rounded-xl px-4 py-2 border border-white/10">
              <div className="text-right">
                <div className="flex items-baseline gap-1 justify-end">
                  <span className="text-2xl font-bold text-white font-mono">{dashboardData.level.current_xp}</span>
                  <span className="text-slate-500 text-sm">/</span>
                  <span className="text-slate-400 text-sm font-mono">{dashboardData.level.xp_to_next}</span>
                </div>
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">XP Points</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="flex justify-between text-xs mb-3">
              <span className="text-slate-300 font-medium">Current Progress</span>
              <span className="text-white font-bold">{dashboardData.level.progress_percent}%</span>
            </div>
            <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-white/5 shadow-inner">
              <div 
                className="h-full rounded-full relative transition-all duration-1000 ease-out"
                style={{ width: `${dashboardData.level.progress_percent}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
                <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white/40 to-transparent animate-shimmer" />
              </div>
            </div>
            
            {/* Milestone Markers */}
            <div className="flex justify-between mt-2 px-1">
              {[0, 25, 50, 75, 100].map((mark) => (
                <div key={mark} className="flex flex-col items-center">
                  <div className={`w-1.5 h-1.5 rounded-full mb-1 ${dashboardData.level.progress_percent >= mark ? 'bg-indigo-400' : 'bg-slate-300'}`} />
                  <span className="text-[9px] text-slate-200 font-mono">{mark}%</span>
                </div>
              ))}
            </div>
          </div>

          
          
        </div>
      </div>
    </div>

    {/* Shimmer Animation Style */}
    <style>{`
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(200%); }
      }
      .animate-shimmer {
        animation: shimmer 2s infinite;
      }
    `}</style>
  </div>
)}

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Study Materials"
            value={summary.total_study_materials}
            icon={Icons.study}
            color="blue"
            onClick={handleStudyMaterialsClick}
          />
          <StatCard 
            title="Presentations"
            value={summary.total_presentations}
            icon={Icons.presentation}
            color="green"
            onClick={handlePresentationsClick}
          />
          <StatCard 
            title="Code Sessions"
            value={summary.total_code_sessions}
            icon={Icons.code}
            color="purple"
            onClick={handleCodeSessionsClick}
          />
          <StatCard 
            title="Active Projects"
            value={projects.total_tasks - projects.completed_tasks}
            icon={Icons.project}
            color="orange"
            onClick={handleProjectsClick}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Weekly Activity Chart (Animated) */}
            <ActivityChart 
  weeklyData={weekly_progress_chart} 
  monthlyData={dashboardData.monthly_progress_chart} // Add this to API
  allTimeData={dashboardData.all_time_progress_chart} // Add this to API
/>

            {/* Recent Activity (Clean List) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                <button 
                  onClick={() => fetchDashboardData()}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                  title="Refresh"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </button>
              </div>
              <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {recent_activity.length > 0 ? (
                  recent_activity.map((activity, idx) => (
                    <ActivityItem key={idx} activity={activity} />
                  ))
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium">No recent activity found.</p>
                    <p className="text-slate-300 text-sm">Start learning to see your progress!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Coding Skills (Progress Bars) */}
            {skill_distribution?.languages?.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Coding Proficiency</h3>
                <div className="space-y-5">
                  {skill_distribution.languages.map((lang) => (
                    <div key={lang.language}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-bold text-slate-700 capitalize">{lang.language}</span>
                        <span className="text-xs font-mono text-slate-400">{lang.count} sessions</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min((lang.count / 20) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            
            {/* Overall Completion (Big Ring) */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Overall Progress</h3>
              <p className="text-xs text-slate-400 mb-6">Project & Code completion rate</p>
              
              <div className="relative">
                <ProgressRing progress={summary.overall_completion_rate} size={140} strokeWidth={12} color="blue" />
                {/* Decorative background blob */}
                <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-10 rounded-full -z-10"></div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                 <div className="p-3 bg-slate-50 rounded-xl">
                    <div className="text-xl font-bold text-slate-800">{projects.completed_tasks}</div>
                    <div className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">Done</div>
                 </div>
                 <div className="p-3 bg-slate-50 rounded-xl">
                    <div className="text-xl font-bold text-slate-800">{projects.total_tasks}</div>
                    <div className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">Total</div>
                 </div>
              </div>
            </div>

            {/* Upcoming Deadlines (Alert Card) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Deadlines</h3>
                {projects.tasks_due_today > 0 && (
                  <span className="animate-pulse flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                )}
              </div>
              
              <div className="space-y-3">
                {projects.overdue_tasks > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100 text-red-700 text-sm">
                    <div className="p-1.5 bg-red-100 rounded-lg">{Icons.alert}</div>
                    <span className="font-medium">{projects.overdue_tasks} Overdue tasks</span>
                  </div>
                )}
                
                {projects.tasks_due_today > 0 ? (
                   <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100 text-orange-700 text-sm">
                    <div className="p-1.5 bg-orange-100 rounded-lg">{Icons.clock}</div>
                    <span className="font-medium">{projects.tasks_due_today} Due today</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-700 text-sm">
                    <div className="p-1.5 bg-emerald-100 rounded-lg">{Icons.quality}</div>
                    <span className="font-medium">All caught up!</span>
                  </div>
                )}

                <Link 
                  to="/planner"
                  className="flex items-center justify-center gap-2 w-full py-2.5 mt-2 text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  View Planner {Icons.arrowRight}
                </Link>
              </div>
            </div>

            {/* This Week's Stats (Mini List) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Weekly Summary</h3>
              <div className="space-y-4">
                {[
                  { label: 'Study Materials', val: this_week.study_materials_created, color: 'text-blue-600' },
                  { label: 'Code Sessions', val: this_week.code_sessions, color: 'text-purple-600' },
                  { label: 'Presentations', val: this_week.presentations_created, color: 'text-emerald-600' },
                  { label: 'Tasks Done', val: this_week.tasks_done, color: 'text-orange-600' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
                    <span className="text-sm text-slate-500 font-medium">{item.label}</span>
                    <span className={`font-bold ${item.color}`}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions (Gradient) */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20 -ml-10 -mb-10"></div>
              
              <h3 className="text-lg font-bold mb-4 relative z-10">Quick Start</h3>
              <div className="space-y-3 relative z-10">
                <Link to="/study" className="flex items-center justify-between w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-sm font-medium backdrop-blur-sm border border-white/5">
                  <span>📚 Study Notes</span>
                  {Icons.arrowRight}
                </Link>
                <Link to="/code" className="flex items-center justify-between w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-sm font-medium backdrop-blur-sm border border-white/5">
                  <span>💻 Practice Code</span>
                  {Icons.arrowRight}
                </Link>
                <Link to="/planner" className="flex items-center justify-between w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-sm font-medium backdrop-blur-sm border border-white/5">
                  <span>📋 New Project</span>
                  {Icons.arrowRight}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        {dashboardData.achievements && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-yellow-500">{Icons.trophy}</span>
              Achievements
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {dashboardData.achievements.map((achievement, idx) => (
                <AchievementBadge 
                  key={idx}
                  achievement={achievement}
                  unlocked={!!achievement.unlocked_at}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;