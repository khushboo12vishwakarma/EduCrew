
// // import React, { useState, useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { Menu, X, LogOut, User, ChevronDown } from 'lucide-react';
// // import { authAPI } from '../services/api';
// // import logo from './logo.jpeg';

// // const Navbar = () => {
// //   const navigate = useNavigate();
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [username, setUsername] = useState('');

// //   useEffect(() => {
// //     const token = localStorage.getItem('authToken');
// //     const user = localStorage.getItem('user');
// //     setIsLoggedIn(!!token);
// //     if (user) {
// //       setUsername(JSON.parse(user)?.username || JSON.parse(user));
// //     }
// //   }, []);

// //   const handleLogout = () => {
// //     authAPI.logout();
// //     localStorage.removeItem('authToken');
// //     localStorage.removeItem('user');
// //     setIsLoggedIn(false);
// //     setUsername('');
// //     navigate('/login');
// //   };

// //   const navLinks = [
// //     { to: '/', label: 'Home' },
// //     { to: '/research', label: 'Research' },
// //     { to: '/study', label: 'Study Coach' },
// //     { to: '/presentation', label: 'Presentations' },
// //     { to: '/code', label: 'Code Mentor' },
// //     { to: '/planner', label: 'Planner' },
// //     { to: '/quality', label: 'Quality Check' },
// //   ];

// //   return (
// //     <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b border-slate-800 shadow-xl">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex h-16 items-center justify-between">
          
// //           {/* Logo - Perfect Circle Format */}
// //           <Link to="/" className="flex items-center gap-3 group">
// //             <div className="relative">
// //               <img
// //                 src={logo}
// //                 alt="EduCrew Logo"
// //                 className="h-12 w-12 object-cover rounded-full bg-white/20 backdrop-blur-sm shadow-2xl group-hover:shadow-3xl group-hover:ring-2 group-hover:ring-blue-400/30 transition-all duration-300 border-4 border-white/20 hover:border-white/40"
// //                 loading="lazy"
// //               />
// //               <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10 animate-pulse" />
// //             </div>
// //             <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-white to-blue-300 bg-clip-text text-transparent tracking-tight">
// //               EduCrew
// //             </span>
// //           </Link>

// //           {/* Desktop Navigation */}
// //           <div className="hidden md:flex items-center space-x-1">
// //             <div className="flex items-center space-x-8">
// //               {navLinks.map((link) => (
// //                 <Link
// //                   key={link.to}
// //                   to={link.to}
// //                   className="group relative text-sm font-medium text-slate-300 hover:text-white px-1 py-2 transition-all duration-200 ease-out hover:scale-[1.05]"
// //                   aria-label={`Navigate to ${link.label}`}
// //                 >
// //                   {link.label}
// //                   <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transform -translate-x-1/2 group-hover:w-full transition-all duration-300 rounded-full" />
// //                 </Link>
// //               ))}
// //             </div>

// //             {/* Auth Section */}
// //             <div className="flex items-center ml-8 space-x-4 border-l border-slate-700 pl-8 h-16">
// //               {isLoggedIn ? (
// //                 <>
// //                   <div className="flex items-center space-x-3 px-3 py-2 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
// //                     <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
// //                       <User size={16} className="text-white" />
// //                     </div>
// //                     <span className="text-sm font-semibold text-slate-200 max-w-32 truncate">
// //                       {username}
// //                     </span>
// //                   </div>
// //                   <button
// //                     onClick={handleLogout}
// //                     className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-xl border border-slate-700 hover:border-red-500/50 transition-all duration-200 backdrop-blur-sm shadow-md hover:shadow-lg"
// //                     aria-label="Logout"
// //                   >
// //                     <LogOut size={18} />
// //                     <span>Logout</span>
// //                   </button>
// //                 </>
// //               ) : (
// //                 <>
// //                   <Link
// //                     to="/login"
// //                     className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 transition-all duration-200 hover:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-slate-700 hover:border-blue-500/50"
// //                   >
// //                     Login
// //                   </Link>
// //                   <Link
// //                     to="/signup"
// //                     className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 transition-all duration-200 border border-transparent hover:border-blue-500/50 backdrop-blur-sm"
// //                   >
// //                     Sign Up
// //                   </Link>
// //                 </>
// //               )}
// //             </div>
// //           </div>

// //           {/* Mobile menu button */}
// //           <button
// //             onClick={() => setIsOpen(!isOpen)}
// //             className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-200 backdrop-blur-sm border border-slate-700 shadow-md hover:shadow-lg"
// //             aria-label="Toggle mobile menu"
// //             aria-expanded={isOpen}
// //           >
// //             {isOpen ? <X size={22} /> : <Menu size={22} />}
// //           </button>
// //         </div>
// //       </div>

// //       {/* Mobile Navigation */}
// //       {isOpen && (
// //         <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl">
// //           <div className="px-4 pt-4 pb-6 space-y-2">
// //             {isLoggedIn ? (
// //               <>
// //                 <div className="space-y-2 mb-4">
// //                   {navLinks.map((link) => (
// //                     <Link
// //                       key={link.to}
// //                       to={link.to}
// //                       onClick={() => setIsOpen(false)}
// //                       className="flex items-center space-x-3 px-4 py-3 text-base font-semibold text-slate-200 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-xl hover:translate-x-1"
// //                       aria-label={`Navigate to ${link.label}`}
// //                     >
// //                       <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
// //                       <span>{link.label}</span>
// //                     </Link>
// //                   ))}
// //                 </div>
// //                 <div className="pt-4 border-t border-slate-700 space-y-3">
// //                   <div className="px-4 py-3 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-lg">
// //                     <div className="flex items-center space-x-3">
// //                       <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
// //                         <User size={18} className="text-white" />
// //                       </div>
// //                       <div>
// //                         <p className="font-semibold text-slate-200 text-sm">{username}</p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <button
// //                     onClick={() => {
// //                       handleLogout();
// //                       setIsOpen(false);
// //                     }}
// //                     className="w-full flex items-center justify-center space-x-2 px-6 py-3 text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-[1.02]"
// //                   >
// //                     <LogOut size={18} />
// //                     <span>Logout</span>
// //                   </button>
// //                 </div>
// //               </>
// //             ) : (
// //               <div className="space-y-3">
// //                 <Link
// //                   to="/login"
// //                   onClick={() => setIsOpen(false)}
// //                   className="w-full block px-6 py-4 text-lg font-semibold text-slate-200 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
// //                 >
// //                   Login
// //                 </Link>
// //                 <Link
// //                   to="/signup"
// //                   onClick={() => setIsOpen(false)}
// //                   className="w-full block px-6 py-4 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 transition-all duration-200 border border-transparent hover:border-blue-500/50 backdrop-blur-sm text-center"
// //                 >
// //                   Sign Up
// //                 </Link>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </nav>
// //   );
// // };

// // export default Navbar;



// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   Menu,
//   X,
//   LogOut,
//   User,
//   ChevronDown,
//   Settings,
//   CreditCard,
// } from 'lucide-react';
// import { authAPI } from '../services/api';
// import logo from './logo.jpeg';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     const user = localStorage.getItem('user');
//     setIsLoggedIn(!!token);
//     if (user) {
//       setUsername(JSON.parse(user)?.username || JSON.parse(user));
//     }
//   }, []);

//   const handleLogout = () => {
//     authAPI.logout();
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('user');
//     setIsLoggedIn(false);
//     setUsername('');
//     navigate('/login');
//   };

//   const navLinks = [
//     { to: '/', label: 'Home' },
//     { to: '/research', label: 'Research' },
//     { to: '/study', label: 'Study Coach' },
//     { to: '/presentation', label: 'Presentations' },
//     { to: '/code', label: 'Code Mentor' },
//     { to: '/planner', label: 'Planner' },
//     { to: '/quality', label: 'Plagiarism Check' },
//   ];

//   return (
//     <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b border-slate-800 shadow-xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">

//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-3 group">
//             <img
//               src={logo}
//               alt="EduCrew Logo"
//               className="h-12 w-12 rounded-full border-4 border-white/20 shadow-xl"
//             />
//             <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-white to-blue-300 bg-clip-text text-transparent">
//               EduCrew
//             </span>
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.to}
//                 to={link.to}
//                 className="relative text-sm font-medium text-slate-300 hover:text-white transition"
//               >
//                 {link.label}
//               </Link>
//             ))}

//             <AuthSection
//               isLoggedIn={isLoggedIn}
//               username={username}
//               handleLogout={handleLogout}
//             />
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800"
//           >
//             {isOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-6 space-y-4">
//           {navLinks.map((link) => (
//             <Link
//               key={link.to}
//               to={link.to}
//               onClick={() => setIsOpen(false)}
//               className="block text-slate-300 font-semibold hover:text-white"
//             >
//               {link.label}
//             </Link>
//           ))}

//           <div className="pt-4 border-t border-slate-800">
//             <AuthSection
//               isLoggedIn={isLoggedIn}
//               username={username}
//               handleLogout={handleLogout}
//             />
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// /* ================= AUTH SECTION ================= */

// const AuthSection = ({ isLoggedIn, username, handleLogout }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const closeOnOutsideClick = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setIsMenuOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', closeOnOutsideClick);
//     return () => document.removeEventListener('mousedown', closeOnOutsideClick);
//   }, []);

//   return (
//     <div className="relative" ref={menuRef}>
//       {isLoggedIn ? (
//         <>
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition"
//           >
//             <User size={18} className="text-indigo-400" />
//             <span className="text-sm font-semibold text-white hidden lg:block">
//               {username}
//             </span>
//             <ChevronDown
//               size={14}
//               className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
//             />
//           </button>

//           {isMenuOpen && (
//             <div className="absolute right-0 mt-3 w-40 bg-[#FBFBFB] border border-white/10 rounded-2xl shadow-1xl py-2 z-50">
//               <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-900 hover:bg-white/5">
//                 <Settings size={16} /> Settings
//               </button>
              
//               <button
//                 onClick={handleLogout}
//                 className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
//               >
//                 <LogOut size={16} /> Sign Out
//               </button>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="flex items-center gap-4">
//           <Link to="/login" className="text-sm text-slate-400 hover:text-white">
//             Login
//           </Link>
//           <Link
//             to="/signup"
//             className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl"
//           >
//             Sign Up
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;




import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LogOut,
  User,
  ChevronDown,
  Settings,
} from 'lucide-react';
import { authAPI } from '../services/api';
import logo from './logo.jpeg';
import SettingsModal from './SettingsModal'; // Adjust path as needed

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Check if current page is login or signup
  // const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

const isAuthPage = [
  '/login', 
  '/signup', 
  '/FAQ', 
  '/terms', 
  '/privacy', 
  '/accessibility'
].includes(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!token);
    if (user) {
      setUsername(JSON.parse(user)?.username || JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/Dashboard', label: 'Dashboard' },
    { to: '/research', label: 'Research' },
    { to: '/study', label: 'Study Coach' },
    { to: '/presentation', label: 'Presentations' },
    { to: '/code', label: 'Code Mentor' },
    { to: '/planner', label: 'Planner' },
    { to: '/quality', label: 'Plagiarism Check' },
    
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="EduCrew Logo"
              className="h-12 w-12 rounded-full border-4 border-white/20 shadow-xl"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-white to-blue-300 bg-clip-text text-transparent">
              EduCrew
            </span>
          </Link>

          {/* Desktop Nav - Hide nav links on auth pages, show auth buttons */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Show nav links only if NOT on auth pages */}
            {!isAuthPage && navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-sm font-medium text-slate-300 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}

            {/* Show Login/Signup on auth pages, or AuthSection when logged in */}
            {isAuthPage && !isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm text-slate-400 hover:text-white">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl"
                >
                  Sign Up
                </Link>
              </div>

              
            ) : (
              <AuthSection
                isLoggedIn={isLoggedIn}
                username={username}
                handleLogout={handleLogout}
              />
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-6 space-y-4">
          {/* Show nav links only if NOT on auth pages */}
          {!isAuthPage && navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="block text-slate-300 font-semibold hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <div className={`${!isAuthPage ? 'pt-4 border-t border-slate-800' : ''}`}>
            {isAuthPage && !isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="text-center text-slate-300 font-semibold hover:text-white py-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="text-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-xl"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <AuthSection
                isLoggedIn={isLoggedIn}
                username={username}
                handleLogout={handleLogout}
                isMobile={true}
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

/* ================= AUTH SECTION ================= */

// const AuthSection = ({ isLoggedIn, username, handleLogout, isMobile = false }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const closeOnOutsideClick = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setIsMenuOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', closeOnOutsideClick);
//     return () => document.removeEventListener('mousedown', closeOnOutsideClick);
//   }, []);

//   if (isLoggedIn) {
//     return (
//       <div className={`relative ${isMobile ? 'w-full' : ''}`} ref={menuRef}>
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition ${isMobile ? 'w-full justify-between' : ''}`}
//         >
//           <div className="flex items-center gap-3">
//             <User size={18} className="text-indigo-400" />
//             <span className="text-sm font-semibold text-white">
//               {username}
//             </span>
//           </div>
//           <ChevronDown
//             size={14}
//             className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
//           />
//         </button>

//         {isMenuOpen && (
//           <div className={`${isMobile ? 'relative mt-2 w-full' : 'absolute right-0 mt-3 w-40'} bg-[#FBFBFB] border border-white/10 rounded-2xl shadow-xl py-2 z-50`}>
//             <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-900 hover:bg-slate-100 rounded-lg mx-2 w-[calc(100%-16px)]">
//               <Settings size={16} /> Settings
//             </button>
            
//             <button
//               onClick={handleLogout}
//               className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-50 rounded-lg mx-2 w-[calc(100%-16px)] mt-1"
//             >
//               <LogOut size={16} /> Sign Out
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Not logged in - show Login and Sign Up only (for non-auth pages)
//   return (
//     <div className={`flex items-center gap-4 ${isMobile ? 'flex-col w-full gap-3' : ''}`}>
//       <Link 
//         to="/login" 
//         className={`text-sm font-medium text-slate-300 hover:text-white transition ${isMobile ? 'w-full text-center py-3 bg-slate-800 rounded-xl' : ''}`}
//       >
//         Login
//       </Link>
//       <Link
//         to="/signup"
//         className={`bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition ${isMobile ? 'w-full text-center py-3' : 'px-5 py-2'}`}
//       >
//         Sign Up
//       </Link>
//     </div>
//   );
// };

/* ================= AUTH SECTION ================= */

/* ================= AUTH SECTION ================= */

const AuthSection = ({ isLoggedIn, username, handleLogout, isMobile = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  if (isLoggedIn) {
    return (
      <>
        <div className={`relative ${isMobile ? 'w-full' : ''}`} ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition ${isMobile ? 'w-full justify-between' : ''}`}
          >
            <div className="flex items-center gap-3">
              <User size={18} className="text-indigo-400" />
              <span className="text-sm font-semibold text-white">
                {username}
              </span>
            </div>
            <ChevronDown
              size={14}
              className={`text-white transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isMenuOpen && (
            <div className={`${isMobile ? 'relative mt-2 w-full' : 'absolute right-0 mt-3 w-48'} bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 overflow-hidden`}>
              <button 
                type="button"
                onClick={() => {
                  setIsSettingsOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Settings size={16} className="text-slate-500" /> 
                <span>Settings</span>
              </button>
              
              <div className="mx-3 my-1 h-px bg-slate-200" />
              
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} /> 
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

        {/* Settings Modal */}
        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
          username={username}
        />
      </>
    );
  }

  // Not logged in - show Login and Sign Up only (for non-auth pages)
  return (
    <div className={`flex items-center gap-4 ${isMobile ? 'flex-col w-full gap-3' : ''}`}>
      <Link 
        to="/login" 
        className={`text-sm font-medium text-slate-300 hover:text-white transition ${isMobile ? 'w-full text-center py-3 bg-slate-800 rounded-xl' : ''}`}
      >
        Login
      </Link>
      <Link
        to="/signup"
        className={`bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition ${isMobile ? 'w-full text-center py-3' : 'px-5 py-2'}`}
      >
        Sign Up
      </Link>
    </div>
  );
};
export default Navbar;