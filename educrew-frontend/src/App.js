// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import ResearchLibrarian from './pages/ResearchLibrarian';
// import StudyCoach from './pages/StudyCoach';
// import PresentationGenerator from './pages/PresentationGenerator';
// import CodeMentor from './pages/CodeMentor';
// import ProjectPlanner from './pages/ProjectPlanner';
// import QualityReviewer from './pages/QualityReviewer';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-gradient-to-br from-primary-500 via-purple-500 to-secondary-500">
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/research" element={<ResearchLibrarian />} />
//             <Route path="/study" element={<StudyCoach />} />
//             <Route path="/presentation" element={<PresentationGenerator />} />
//             <Route path="/code" element={<CodeMentor />} />
//             <Route path="/planner" element={<ProjectPlanner />} />
//             <Route path="/quality" element={<QualityReviewer />} />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;




import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation, Navigate 
} from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResearchLibrarian from './pages/ResearchLibrarian';
import StudyCoach from './pages/StudyCoach';
import PresentationGenerator from './pages/PresentationGenerator';
import CodeMentor from './pages/CodeMentor';
import ProjectPlanner from './pages/ProjectPlanner';
import QualityReviewer from './pages/QualityReviewer';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import FAQ from './pages/FAQ';
import Accessibility from './pages/Accessibility';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';
// ✅ NEW: Dynamic List Pages
import MyStudyMaterials from './pages/MyStudyMaterials';
import MyPresentations from './pages/MyPresentations';
import MyCodeSessions from './pages/MyCodeSessions';
import MyProjects from './pages/MyProjects';

import ProjectDetail from './pages/ProjectDetail';
import CodeSessionDetail from './pages/CodeSessionDetail';
import PresentationDetail from './pages/PresentationDetail';
import StudyMaterialDetail from './pages/StudyMaterialDetail';

// In your Routes:



// AppLayout with DARK MODE SUPPORT
const AppLayout = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-slate-50 
                     dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 
                     text-slate-900 dark:text-slate-100">
      {!hideNavbar && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/research" element={<ResearchLibrarian />} />
        <Route path="/study" element={<StudyCoach />} />
        <Route path="/presentation" element={<PresentationGenerator />} />
        <Route path="/code" element={<CodeMentor />} />
        <Route path="/planner" element={<ProjectPlanner />} />
        <Route path="/quality" element={<QualityReviewer />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
       {/* ✅ NEW: Dynamic List Routes */}
              <Route path="/my-study-materials" element={<MyStudyMaterials />} />
             <Route path="/my-presentations" element={<MyPresentations />} />
              <Route path="/my-code-sessions" element={<MyCodeSessions />} />
              <Route path="/my-projects" element={<MyProjects />} />
                <Route path="/planner/project/:id" element={<ProjectDetail />} />
                <Route path="/code-session/:id" element={<CodeSessionDetail />} />
                    <Route path="/presentation/:id" element={<PresentationDetail />} />
                     <Route path="/study-material/:id" element={<StudyMaterialDetail />} />

              {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppLayout />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
