
import React from "react";
import { useEffect, useState, useRef } from "react";
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import {
  BookOpen,
  GraduationCap,
  Presentation,
  Code2,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import hero from "../components/hero.jpg";
import logo from "../components/logo.jpeg";
import { useTheme } from '../context/ThemeContext';
import  Footer from "../components/Footer.jsx";


const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
const userMenuRef = useRef(null);

useEffect(() => {
  const token = localStorage.getItem('authToken');
  setIsLoggedIn(!!token);
}, []);

  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const agents = [
  {
    title: "Research Librarian",
    description: "Discovers academic sources, creates comprehensive summaries, and delivers properly formatted citations.",
    Icon: BookOpen,
    link: "/research",
  },
  {
    title: "Study Coach",
    description: "Transforms lecture notes into structured explanations, flashcards, and targeted revision resources.",
    Icon: GraduationCap,
    link: "/study",
  },
  {
    title: "Presentation Generator",
    description: "Designs professional slide decks optimized for academic presentations and seminars.",
    Icon: Presentation,
    link: "/presentation",
  },
  {
    title: "Code Mentor",
    description: "Analyzes code logic, identifies bugs, and provides actionable improvements for better quality.",
    Icon: Code2,
    link: "/code",
  },
  {
    title: "Project Planner",
    description: "Creates detailed project timelines, task breakdowns, and milestone tracking systems.",
    Icon: CalendarCheck,
    link: "/planner",
  },
  {
    title: "Quality Reviewer",
    description: "Evaluates documents for clarity, academic structure, grammar precision, and originality assurance.",
    Icon: ShieldCheck,
    link: "/quality",
  },
];


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setIsUserMenuOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

const username = localStorage.getItem('user') 
  ? JSON.parse(localStorage.getItem('user'))?.username || JSON.parse(localStorage.getItem('user')) 
  : 'User';

  return (
    <div className="w-full min-h-screen bg-[#fcfdfe] text-slate-900 overflow-hidden font-sans">
      

 {/* ================= NAVBAR ================= */}
<nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b border-slate-800 shadow-xl">
  <div className="max-w-7xl mx-auto px-10 flex h-16 items-center justify-between">
    
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative">
        <img
          src={logo}
          alt="EduCrew Logo"
          className="h-12 w-12 object-cover rounded-full bg-white/20 backdrop-blur-sm shadow-2xl group-hover:shadow-3xl group-hover:ring-2 group-hover:ring-blue-400/30 transition-all duration-300 border-4 border-white/20 hover:border-white/40"
          loading="lazy"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10 animate-pulse" />
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-white to-blue-300 bg-clip-text text-transparent tracking-tight">
        EduCrew
      </span>
    </Link>

    <div className="flex items-center gap-6">
      {isLoggedIn ? (
  // Show all navigation links + user profile dropdown when logged in
  <>

    <Link to="/" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Home</Link>
    <Link to= '/Dashboard'className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Dashboard</Link>
    <Link to="/research" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Research</Link>
    <Link to="/study" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Study Coach</Link>
    <Link to="/presentation" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Presentations</Link>
    <Link to="/code" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Code Mentor</Link>
    <Link to="/planner" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Planner</Link>
    <Link to="/quality" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Plagiarism Check</Link>
    
    {/* User Profile Dropdown */}
    <div className="relative" ref={userMenuRef}>
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
      >
        <User className="w-5 h-5 text-slate-300" />
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isUserMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-slate-100">
            <p className="text-sm font-medium text-slate-900">{username}</p>
          </div>
          
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            onClick={() => setIsUserMenuOpen(false)}
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          
          <button
            onClick={() => {
              localStorage.removeItem('authToken');
              localStorage.removeItem('user');
              setIsLoggedIn(false);
              setIsUserMenuOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  </>
) : (
  // Show only login/signup when not logged in
  <>
    <Link
      to="/login"
      className="hidden sm:block text-[13px] font-bold text-slate-300 hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
    >
      Login
    </Link>

    <Link
      to="/signup"
      className="px-5 py-2.5 md:px-7 md:py-3 rounded-full
        bg-gradient-to-r from-[#3c6fa4] to-[#2f5e8e]
        text-white text-[13px] font-bold shadow-lg shadow-blue-500/20
        hover:from-[#2f5e8e] hover:to-[#244c75]
        hover:shadow-xl hover:shadow-blue-500/30
        active:scale-95 active:shadow-md
        transition-all duration-200 ease-out
        border border-blue-300/50 hover:border-blue-400/70"
    >
      Sign up
    </Link>
  </>
)}
    </div>
  </div>
</nav>



      {/* ================= HERO SECTION ================= */}
      {/* pt-24 ensures the content starts closer to the navbar (which is h-20) */}
     <section className="relative py-20 md:py-50 bg-gradient-to-b from-slate-100 via-blue-60/80 to-slate-60/50 overflow-hidden">

        
        {/* BACKGROUND AMBIENCE */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,#eef6fa_0%,transparent_50%)]" />
          <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-blue-50/40 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT CONTENT */}
            <div className="lg:col-span-7 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white shadow-sm border border-slate-100 mb-6">
                <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span className="text-[10px] md:text-[11px] font-bold text-[#3c6fa4] uppercase tracking-[0.2em]">
                  AI for Modern Education
                </span>
              </div>

             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-snug mb-6">

                <span className="block sm:inline whitespace-nowrap">Welcome to Smarter Learning,</span><br/>
                <span className="text-[#3c6fa4]"> Built for Students</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-slate-500 leading-relaxed max-w-lg font-medium">
                EduCrew helps students learn faster with intelligent AI tools
               designed for research, study assistance, and personalized guidance.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/signup" 
                  className="px-9 py-4 rounded-2xl bg-[#3c6fa4] text-white font-extrabold text-center hover:bg-[#2f5e8e] transition-all shadow-xl shadow-[#3c6fa4]/25 active:scale-95"
                >
                  Start Learning
                </Link>
                {/* <Link 
                  to="/demo" 
                  className="px-9 py-4 rounded-2xl bg-white text-slate-800 font-extrabold text-center border border-slate-200 hover:bg-slate-50 transition-all active:scale-95"
                >
                  View Demo
                </Link> */}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              <div className="relative z-10 flex justify-center lg:justify-end items-center">
                <img 
                  src={hero} 
                  alt="EduCrew Interface" 
                  className="w-full max-w-[480px] lg:max-w-none h-auto object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 88%)',
                    maskImage: 'radial-gradient(circle at center, black 60%, transparent 88%)',
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= TRUST / IMPACT SECTION ================= */}
<section className="py-10 sm:py-10 md:py-10 lg:py-10 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-3xl lg:text-3xl font-bold tracking-tight text-slate-900 leading-snug mb-6">

        Trusted by learners and educators worldwide
      </h2>
      <p className="mt-4 text-lg text-slate-500">
        EduCrew is transforming education with AI-driven learning experiences
        designed for real academic impact.
      </p>
    </div>

    {/* Cards */}
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* Card 1 */}
      <div className="text-center px-6">
        <div className="mx-auto mb-6 h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center shadow-sm">
          <svg className="h-7 w-7 text-[#3c6fa4]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 6v6l4 2" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </div>
        <p className="text-slate-700 font-medium leading-relaxed">
          Shifted traditional study methods to <span className="font-bold text-slate-900">AI-assisted learning</span>,
          helping students learn faster and smarter.
        </p>
      </div>

      {/* Card 2 */}
      <div className="text-center px-6">
        <div className="mx-auto mb-6 h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center shadow-sm">
          <svg className="h-7 w-7 text-[#3c6fa4]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M20 8v6" />
            <path d="M23 11h-6" />
          </svg>
        </div>
        <p className="text-slate-700 font-medium leading-relaxed">
          Scaled personalized learning support for <span className="font-bold text-slate-900">thousands of students </span>
          using intelligent AI guidance.
        </p>
      </div>

      {/* Card 3 */}
      <div className="text-center px-6">
        <div className="mx-auto mb-6 h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center shadow-sm">
          <svg className="h-7 w-7 text-[#3c6fa4]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 3v18h18" />
            <path d="M7 14l4-4 4 2 5-6" />
          </svg>
        </div>
        <p className="text-slate-700 font-medium leading-relaxed">
          Improved academic outcomes by delivering <span className="font-bold text-slate-900">clear insights, summaries</span>,
          and research assistance.
        </p>
      </div>

    </div>
  </div>
</section>






{/* ================= AI AGENTS (GRID LAYOUT) ================= */}
<section className="relative py-16 md:py-20 bg-gradient-to-b from-slate-50 via-blue-50/80 to-slate-50/60 overflow-hidden">
  
  {/* Professional Background */}
  <div className="pointer-events-none absolute inset-0 -z-20">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/80 to-slate-50/60" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(60,111,164,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(60,111,164,0.06)_0%,transparent_50%)]" />
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(60,111,164,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(60,111,164,0.03)_1px,transparent_1px)] [background-size:80px_80px]" />
    </div>
    <div className="absolute top-10 left-10 w-32 h-32 border-2 border-[#3c6fa4]/20 rounded-2xl bg-[#3c6fa4]/5 animate-pulse" />
    <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-[#3c6fa4]/15 rounded-xl bg-[#3c6fa4]/3 animate-pulse" style={{animationDelay: '1s'}} />
  </div>

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">

      <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-snug mb-6">

         Meet your AI-powered <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3c6fa4] via-[#4b82ba] to-[#6fa2d0]">
          super-team
        </span>
      </h2>
      <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed font-medium">
        Six coordinated AI agents with unique visual identities, designed around the EduCrew blue palette.
      </p>
    </div>

    {/* Agent Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
      {agents.map((agent, index) => (
        <Link
          key={agent.title}
          to="/signup"
          className="group relative overflow-hidden rounded-2xl h-72 md:h-64 bg-white/95 border border-slate-200/80 backdrop-blur-sm
                     shadow-sm hover:shadow-xl hover:shadow-[#3c6fa4]/15
                     transition-transform duration-300 hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3c6fa4]"
        >
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#3c6fa4]/7 via-transparent to-[#6fa2d0]/10" />

          <div className="relative z-10 h-full p-5 md:p-6 flex flex-col items-center text-center gap-3">
            {/* UNIQUE ICON CONTAINERS BY AGENT */}
            <div>
              <div
                className={`relative inline-flex items-center justify-center rounded-xl w-12 h-12 md:w-14 md:h-14 shadow-sm transition-transform duration-300 group-hover:scale-110 ${
                  // Research Librarian - Deep Blue
                  index === 0 ? 'bg-gradient-to-br from-[#1e3a8a] via-[#3c6fa4] to-[#2563eb] border-[#1e40af]' :
                  // Study Coach - Teal/Emerald
                  index === 1 ? 'bg-gradient-to-br from-[#0f766e] via-[#059669] to-[#10b981] border-[#047857]' :
                  // Presentation - Purple/Violet
                  index === 2 ? 'bg-gradient-to-br from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa] border-[#6d28d9]' :
                  // Code Mentor - Orange/Amber
                  index === 3 ? 'bg-gradient-to-br from-[#c2410c] via-[#ea580c] to-[#f97316] border-[#b45309]' :
                  // Project Planner - Green/Lime
                  index === 4 ? 'bg-gradient-to-br from-[#15803d] via-[#22c55e] to-[#4ade80] border-[#166534]' :
                  // Quality Reviewer - Rose/Pink
                  index === 5 ? 'bg-gradient-to-br from-[#be123c] via-[#ec4899] to-[#f472b6] border-[#9d174d]' : 
                  'bg-gradient-to-br from-[#e4edf7] via-white to-[#d7e8ff] border-[#c5d5eb]'
                }`}
              >
                <agent.Icon
                  className={`w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 group-hover:rotate-6 group-hover:-translate-y-[1px] ${
                    // White icons for dark backgrounds
                    index === 0 || index === 1 || index === 2 || index === 3 || index === 4 || index === 5 ? 'text-white' : 'text-[#3c6fa4]'
                  }`}
                />
                <span
                  className="pointer-events-none absolute -inset-2 md:-inset-3 rounded-2xl bg-[#3c6fa4]/0 blur-xl group-hover:bg-white/20 transition-colors duration-500"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center text-center gap-1 px-2">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 leading-tight tracking-tight group-hover:text-[#3c6fa4] transition-colors duration-200">
                {agent.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-[200px]">
                {agent.description}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#3c6fa4]">
              <span>Explore</span>
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>


<div className="mt-10 text-center py-10 px-5">
  <div className="max-w-md mx-auto">
    {/* Animated Icon */}
    <div className="w-16 h-16 mx-auto mb-6 group">
      <div className="w-16 h-16 bg-[#3c6fa4] rounded-2xl flex items-center justify-center shadow-lg 
                      group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-2xl 
                      transition-all duration-500 ease-out hover:-translate-y-2">
        <svg className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" 
             fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      </div>
    </div>

    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:scale-105 transition-transform duration-300">
      Your AI Academic Team Awaits
    </h3>
    
    <p className="text-lg text-slate-600 mb-8 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
      Get <span className="text-[#3c6fa4] font-bold animate-pulse">instant free access</span> to all 6 specialized AI agents. 
      No credit card required.
    </p>
    
    <Link 
      to="/signup"
      className="group relative block w-full max-w-xs mx-auto px-8 py-4 bg-[#3c6fa4] text-white font-semibold text-lg rounded-xl 
                 shadow-lg overflow-hidden transition-all duration-500 ease-out
                 hover:shadow-2xl hover:bg-[#2e5b8a] hover:-translate-y-2 hover:scale-[1.02]
                 active:scale-95 active:shadow-lg"
    >
      <span className="relative z-10 flex items-center justify-center">
        Start Free Now
        <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-all duration-300" 
             fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </span>
      
      {/* Animated shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                      -skew-x-12 transform -translate-x-full group-hover:translate-x-full 
                      transition-transform duration-700 ease-out pointer-events-none" />
      
      {/* Pulsing ring */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#3c6fa4]/20 to-transparent rounded-3xl 
                      opacity-0 group-hover:opacity-100 animate-ping pointer-events-none" />
    </Link>
    
    <p className="mt-6 text-sm text-slate-900 animate-pulse">
      ✅ Completely free • No signup limits • Unlimited use
    </p>
  </div>
  </div>

 </div>

 

 </section>
 <Footer />
    </div>
  );
};

export default Home;





