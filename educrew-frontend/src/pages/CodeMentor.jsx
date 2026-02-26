// import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { codeMentorAPI } from '../services/api';
// import { 
//   Play, Search, BookOpen, Wand2, Film, Briefcase, Code, 
//   Copy, Terminal, ChevronRight, Loader2, AlertCircle, 
//   CheckCircle2, XCircle, Clock, Zap, Trophy, RotateCcw,
//   Settings, Download, Sparkles, Lightbulb, BarChart3, 
//   FileCode2, History, Keyboard, ChevronLeft, Type, 
//   Sun, Moon, X
// } from 'lucide-react';
// import Editor from '@monaco-editor/react';
// import AnimationPlayer from "../components/AnimationPlayer";

// // ==========================================
// // CONFIGURATION & CONSTANTS
// // ==========================================

// const LANGUAGES = [
//   { id: 'python', label: 'Python', icon: '🐍', extension: 'py', monacoLang: 'python' },
//   { id: 'javascript', label: 'JavaScript', icon: '⚡', extension: 'js', monacoLang: 'javascript' },
//   { id: 'typescript', label: 'TypeScript', icon: '🔷', extension: 'ts', monacoLang: 'typescript' },
//   { id: 'java', label: 'Java', icon: '☕', extension: 'java', monacoLang: 'java' },
//   { id: 'cpp', label: 'C++', icon: '⚙️', extension: 'cpp', monacoLang: 'cpp' },
//   { id: 'c', label: 'C', icon: '🔧', extension: 'c', monacoLang: 'c' },
//   { id: 'go', label: 'Go', icon: '🐹', extension: 'go', monacoLang: 'go' },
//   { id: 'rust', label: 'Rust', icon: '🦀', extension: 'rs', monacoLang: 'rust' },
//   { id: 'php', label: 'PHP', icon: '🐘', extension: 'php', monacoLang: 'php' },
//   { id: 'csharp', label: 'C#', icon: '🔷', extension: 'cs', monacoLang: 'csharp' },
//   { id: 'kotlin', label: 'Kotlin', icon: '🎯', extension: 'kt', monacoLang: 'kotlin' },
//   { id: 'sql', label: 'SQL', icon: '🗄️', extension: 'sql', monacoLang: 'sql' },
//   { id: 'ruby', label: 'Ruby', icon: '💎', extension: 'rb', monacoLang: 'ruby' },
//   { id: 'swift', label: 'Swift', icon: '🦉', extension: 'swift', monacoLang: 'swift' },
//   { id: 'r', label: 'R', icon: '📊', extension: 'r', monacoLang: 'r' },
// ];

// const TABS = [
//   { id: 'run', label: 'Run', icon: Play, accent: '#10b981', description: 'Execute code in secure sandbox' },
//   { id: 'review', label: 'Review', icon: Search, accent: '#3b82f6', description: 'AI-powered code analysis' },
//   { id: 'explain', label: 'Explain', icon: BookOpen, accent: '#8b5cf6', description: 'Understand how code works' },
//   { id: 'generate', label: 'Generate', icon: Wand2, accent: '#6366f1', description: 'AI code generation' },
//   { id: 'animate', label: 'Visualize', icon: Film, accent: '#f59e0b', description: 'Step-through execution' },
//   { id: 'interview', label: 'Interview', icon: Briefcase, accent: '#ef4444', description: 'Mock coding interview' },
// ];

// const DEFAULT_TEMPLATES = {
//   python: `# Write your Python code here
// print("Hello, World!")`,
//   javascript: `// Write your JavaScript code here
// console.log("Hello, World!");`,
//   typescript: `// Write your TypeScript code here
// console.log("Hello, World!");`,
//   java: `public class Main {
//     public static void main(String[] args) {
//         System.out.println("Hello, World!");
//     }
// }`,
//   cpp: `#include <iostream>
// using namespace std;

// int main() {
//     cout << "Hello, World!" << endl;
//     return 0;
// }`,
//   c: `#include <stdio.h>

// int main() {
//     printf("Hello, World!\\n");
//     return 0;
// }`,
//   go: `package main

// import "fmt"

// func main() {
//     fmt.Println("Hello, World!")
// }`,
//   rust: `fn main() {
//     println!("Hello, World!");
// }`,
//   php: `<?php
// echo "Hello, World!";
// ?>`,
//   csharp: `using System;

// class Program {
//     static void Main() {
//         Console.WriteLine("Hello, World!");
//     }
// }`,
//   kotlin: `fun main() {
//     println("Hello, World!")
// }`,
//   sql: `SELECT 'Hello, World!' AS message;`,
//   ruby: `puts "Hello, World!"`,
//   swift: `print("Hello, World!")`,
//   r: `print("Hello, World!")`,
// };

// // ==========================================
// // REUSABLE UI COMPONENTS
// // ==========================================

// const stripMarkdownCodeBlocks = (code) => {
//   if (!code) return '';
//   // Remove ```language and ``` markers
//   return code
//     .replace(/```[\w]*\n/g, '')  // Remove opening ```python, ```javascript, etc.
//     .replace(/```\n?/g, '')      // Remove closing ```
//     .trim();
// };

// const Button = memo(({ 
//   children, 
//   onClick, 
//   variant = 'primary', 
//   size = 'md', 
//   icon: Icon, 
//   loading = false,
//   disabled = false,
//   className = '',
//   style = {}
// }) => {
//   const baseStyles = {
//     primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md',
//     secondary: 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm',
//     ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 border-transparent',
//     danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
//     success: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm',
//     accent: 'text-white shadow-sm hover:shadow-md',
//   };

//   const sizeStyles = {
//     sm: 'px-3 py-1.5 text-xs',
//     md: 'px-4 py-2 text-sm',
//     lg: 'px-6 py-3 text-base',
//     icon: 'p-2',
//   };

//   return (
//     <motion.button
//       whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
//       whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
//       onClick={onClick}
//       disabled={disabled || loading}
//       className={`
//         inline-flex items-center justify-center gap-2 rounded-lg font-medium
//         transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
//         disabled:opacity-50 disabled:cursor-not-allowed
//         ${baseStyles[variant]}
//         ${sizeStyles[size]}
//         ${className}
//       `}
//       style={style}
//     >
//       {loading ? (
//         <Loader2 className="w-4 h-4 animate-spin" />
//       ) : Icon ? (
//         <Icon className="w-4 h-4" />
//       ) : null}
//       {children}
//     </motion.button>
//   );
// });

// const Card = memo(({ 
//   children, 
//   title, 
//   icon: Icon, 
//   className = '',
//   headerAction,
//   accent,
//   collapsible = false,
//   defaultCollapsed = false
// }) => {
//   const [collapsed, setCollapsed] = useState(defaultCollapsed);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 8 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${className}`}
//     >
//       {(title || Icon) && (
//         <div 
//           className={`px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between ${collapsible ? 'cursor-pointer select-none' : ''}`}
//           onClick={collapsible ? () => setCollapsed(!collapsed) : undefined}
//         >
//           <div className="flex items-center gap-2.5">
//             {Icon && <Icon className="w-4 h-4" style={{ color: accent || '#6b7280' }} />}
//             {title && <h3 className="text-sm font-semibold text-gray-900">{title}</h3>}
//           </div>
//           <div className="flex items-center gap-2">
//             {headerAction}
//             {collapsible && (
//               <ChevronRight 
//                 className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${collapsed ? '' : 'rotate-90'}`} 
//               />
//             )}
//           </div>
//         </div>
//       )}
//       <AnimatePresence>
//         {!collapsed && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             <div className="p-5">{children}</div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// });

// const CodeOutput = memo(({ output, error, executionTime }) => (
//   <div className={`rounded-xl overflow-hidden border ${error ? 'border-red-200' : 'border-emerald-200'}`}>
//     <div className={`px-4 py-2.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider border-b ${error ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
//       <div className="flex items-center gap-2">
//         {error ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
//         {error ? 'Execution Error' : 'Standard Output'}
//       </div>
//       {executionTime && (
//         <span className="text-xs font-mono opacity-75">{executionTime}s</span>
//       )}
//     </div>
//     <pre className={`p-4 font-mono text-sm whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto ${error ? 'bg-red-50 text-red-900' : 'bg-emerald-50/30 text-emerald-900'}`}>
//       {error || output || 'No output generated'}
//     </pre>
//   </div>
// ));

// const DifficultyBadge = memo(({ level }) => {
//   const colors = {
//     beginner: 'bg-emerald-100 text-emerald-800 border-emerald-200',
//     medium: 'bg-amber-100 text-amber-800 border-amber-200',
//     advanced: 'bg-red-100 text-red-800 border-red-200',
//   };
//   return (
//     <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${colors[level] || colors.medium}`}>
//       {level.charAt(0).toUpperCase() + level.slice(1)}
//     </span>
//   );
// });

// const Tooltip = memo(({ children, text }) => {
//   const [show, setShow] = useState(false);
//   return (
//     <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
//       {children}
//       <AnimatePresence>
//         {show && (
//           <motion.div
//             initial={{ opacity: 0, y: 4 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 4 }}
//             className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-50"
//           >
//             {text}
//             <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// });

// // ==========================================
// // MAIN COMPONENT
// // ==========================================

// const CodeMentor = () => {
//   // Core State
//   const [activeTab, setActiveTab] = useState('run');
//   const [language, setLanguage] = useState('python');
//   const [code, setCode] = useState(DEFAULT_TEMPLATES.python);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [instruction, setInstruction] = useState('');
//   const [executionTime, setExecutionTime] = useState(null);
  
//   // Interview State
//   const [interviewData, setInterviewData] = useState({
//     difficulty: 'medium',
//     duration: 45,
//   });
//   const [interviewSession, setInterviewSession] = useState(null);
//   const [timeRemaining, setTimeRemaining] = useState(null);
  
//   // UI State
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [editorTheme, setEditorTheme] = useState('vs-dark');
//   const [showSettings, setShowSettings] = useState(false);
//   const [fontSize, setFontSize] = useState(14);
//   const [showShortcuts, setShowShortcuts] = useState(false);
  
//   // CRITICAL FIX: Use a key to force editor remount
//   const [editorKey, setEditorKey] = useState(0);
  
//   const editorRef = useRef(null);
//   const timerRef = useRef(null);

//   // Update code when language changes (only if using template)
//   useEffect(() => {
//     const template = DEFAULT_TEMPLATES[language];
//     const isCurrentCodeTemplate = Object.values(DEFAULT_TEMPLATES).some(
//       t => t.trim() === code.trim()
//     );
    
//     if (isCurrentCodeTemplate || !code.trim()) {
//       setCode(template);
//       // Force editor remount
//       setEditorKey(prev => prev + 1);
//     }
//   }, [language]);

//   // Interview Timer
//   useEffect(() => {
//     if (interviewSession && timeRemaining > 0) {
//       timerRef.current = setInterval(() => {
//         setTimeRemaining(prev => {
//           if (prev <= 1) {
//             clearInterval(timerRef.current);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(timerRef.current);
//   }, [interviewSession, timeRemaining]);

//   // Keyboard Shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
//         e.preventDefault();
//         handlePrimaryAction();
//       }
//       if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
//         e.preventDefault();
//         setSidebarCollapsed(prev => !prev);
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [activeTab, code, instruction, interviewSession]);

//   const handlePrimaryAction = () => {
//     switch (activeTab) {
//       case 'run': handleRunCode(); break;
//       case 'review': handleReviewCode(); break;
//       case 'explain': handleExplainCode(); break;
//       case 'animate': handleAnimateCode(); break;
//       case 'generate': handleGenerateCode(); break;
//       case 'interview': 
//         if (interviewSession) submitInterview();
//         else startInterview();
//         break;
//     }
//   };

//   // API Handlers
//   const handleApiCall = async (apiFn, errorPrefix) => {
//     const startTime = Date.now();
//     setLoading(true);
//     setError('');
//     setResult(null);
    
//     try {
//       const response = await apiFn();
//       const duration = ((Date.now() - startTime) / 1000).toFixed(2);
//       setExecutionTime(duration);
//       setResult(response.data || response);
//       return response;
//     } catch (err) {
//       console.error(`${errorPrefix}:`, err);
//       setError(`${errorPrefix}: ${err.response?.data?.error || err.message || 'Unknown error'}`);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRunCode = () => {
//   // Strip markdown before sending to backend
//   const cleanCode = stripMarkdownCodeBlocks(code);
//   handleApiCall(
//     () => codeMentorAPI.runCode({ code: cleanCode, language }),
//     'Execution failed'
//   );
// };

//   const handleReviewCode = () => {
//   const cleanCode = stripMarkdownCodeBlocks(code);
//   handleApiCall(
//     () => codeMentorAPI.reviewCode({ code: cleanCode, language, difficulty: 'medium' }),
//     'Review failed'
//   );
// };

//   const handleExplainCode = () => {
//   const cleanCode = stripMarkdownCodeBlocks(code);
//   handleApiCall(
//     () => codeMentorAPI.explainCode({ code: cleanCode, language, level: 'beginner' }),
//     'Explanation failed'
//   );
// };

//  const handleAnimateCode = () => {
//   const cleanCode = stripMarkdownCodeBlocks(code);
//   handleApiCall(
//     () => codeMentorAPI.animateCode({ code: cleanCode, language }),
//     'Animation failed'
//   );
// };

//   const handleGenerateCode = () => handleApiCall(
//     () => codeMentorAPI.generateCode({ instruction, language }),
//     'Generation failed'
//   );

//   const startInterview = async () => {
//     const response = await handleApiCall(
//       () => codeMentorAPI.startInterview({
//         language,
//         difficulty: interviewData.difficulty,
//         duration_minutes: interviewData.duration,
//       }),
//       'Failed to start interview'
//     );
//     if (response?.data) {
//       setInterviewSession(response.data);
//       setTimeRemaining(interviewData.duration * 60);
//     }
//   };

//  const submitInterview = async () => {
//   if (!interviewSession?.id) return;
//   const cleanCode = stripMarkdownCodeBlocks(code);
//   const response = await handleApiCall(
//     () => codeMentorAPI.submitInterview(interviewSession.id, { code: cleanCode }),
//     'Submission failed'
//   );
//   if (response?.data) {
//     setInterviewSession(null);
//     setTimeRemaining(null);
//   }
// };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   // CRITICAL FIX: Load generated code into editor
//   const handleLoadInEditor = (generatedCode) => {
//     // Set the code state
//     setCode(generatedCode);
//     // Switch to run tab
//     setActiveTab('run');
//     // Clear result
//     setResult(null);
//     // Force editor remount with new key
//     setEditorKey(prev => prev + 1);
//   };

//   const activeTabData = TABS.find(t => t.id === activeTab);
//   const currentLang = LANGUAGES.find(l => l.id === language);

//   // ==========================================
//   // RENDER SECTIONS
//   // ==========================================

// const renderEditor = () => (
//   <motion.div
//     key="editor-container"
//     initial={{ opacity: 0, y: 8 }}
//     animate={{ opacity: 1, y: 0 }}
//     exit={{ opacity: 0, y: -8 }}
//     className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm flex flex-col"
//   >
//     {/* Editor Header */}
//     <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-md border border-gray-200 shadow-sm">
//           <FileCode2 className="w-4 h-4 text-blue-500" />
//           <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
//             main.{currentLang?.extension || 'txt'}
//           </span>
//         </div>
//         <span className="text-xs text-gray-400">|</span>
//         <span className="text-xs text-gray-500">{currentLang?.label}</span>
//       </div>
//       <div className="flex items-center gap-1">
//         <Tooltip text="Reset Code">
//           <button 
//             onClick={() => {
//               const template = DEFAULT_TEMPLATES[language] || '';
//               setCode(template);
//               setEditorKey(prev => prev + 1);
//             }}
//             className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
//           >
//             <RotateCcw className="w-4 h-4" />
//           </button>
//         </Tooltip>
//         <Tooltip text="Copy Code">
//           <button 
//             onClick={() => navigator.clipboard.writeText(code)}
//             className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
//           >
//             <Copy className="w-4 h-4" />
//           </button>
//         </Tooltip>
//         <Tooltip text="Download">
//           <button 
//             onClick={() => {
//               const blob = new Blob([code], { type: 'text/plain' });
//               const url = URL.createObjectURL(blob);
//               const a = document.createElement('a');
//               a.href = url;
//               a.download = `main.${currentLang?.extension || 'txt'}`;
//               a.click();
//             }}
//             className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
//           >
//             <Download className="w-4 h-4" />
//           </button>
//         </Tooltip>
//         <Tooltip text="Settings">
//           <button 
//             onClick={() => setShowSettings(!showSettings)}
//             className={`p-2 rounded-lg transition-all ${showSettings ? 'bg-gray-200 text-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
//           >
//             <Settings className="w-4 h-4" />
//           </button>
//         </Tooltip>
//       </div>
//     </div>

//     {/* Settings Panel */}
//     <AnimatePresence>
//       {showSettings && (
//         <motion.div
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: 'auto', opacity: 1 }}
//           exit={{ height: 0, opacity: 0 }}
//           className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-6 overflow-hidden"
//         >
//           <div className="flex items-center gap-2">
//             <Type className="w-4 h-4 text-gray-500" />
//             <span className="text-xs font-medium text-gray-600">Font Size</span>
//             <input
//               type="range"
//               min="12"
//               max="20"
//               value={fontSize}
//               onChange={(e) => setFontSize(parseInt(e.target.value))}
//               className="w-24 accent-blue-600"
//             />
//             <span className="text-xs text-gray-500 w-4">{fontSize}</span>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>

//     {/* Monaco Editor - FIXED: Proper height and visibility */}
//     <div className="bg-[#1e1e1e]" style={{ height: '450px' }}>
//       <Editor
//         key={editorKey}
//         height="100%"
//         language={currentLang?.monacoLang || 'plaintext'}
//         value={code}
//         onChange={(value) => setCode(value || '')}
//         onMount={(editor, monaco) => { 
//           editorRef.current = editor;
//           // Force layout update
//           editor.layout();
//           editor.focus();
//         }}
//         theme="vs-dark"
//         options={{
//           minimap: { enabled: true, scale: 1 },
//           fontSize: fontSize,
//           wordWrap: 'on',
//           scrollBeyondLastLine: false,
//           padding: { top: 16, bottom: 16 },
//           lineNumbers: 'on',
//           renderLineHighlight: 'all',
//           automaticLayout: true,
//           folding: true,
//           bracketPairColorization: { enabled: true },
//           formatOnPaste: true,
//           suggest: {
//             showKeywords: true,
//             showSnippets: true,
//           },
//         }}
//       />
//     </div>

//     {/* Action Bar */}
//     <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
//       <Button
//         onClick={handlePrimaryAction}
//         loading={loading}
//         icon={activeTabData?.icon}
//         variant="accent"
//         style={{ backgroundColor: activeTabData?.accent }}
//       >
//         {loading ? 'Processing...' : activeTabData?.label}
//       </Button>
//       <div className="flex items-center gap-3 text-xs text-gray-400">
//         <button 
//           onClick={() => setShowShortcuts(true)}
//           className="hidden sm:flex items-center gap-1.5 hover:text-gray-600 transition-colors"
//         >
//           <Keyboard className="w-3.5 h-3.5" />
//           Shortcuts
//         </button>
//         <span className="w-px h-3 bg-gray-300 hidden sm:block" />
//         <span>{code.split('\n').length} lines</span>
//         <span className="w-px h-3 bg-gray-300" />
//         <span>{code.length.toLocaleString()} chars</span>
//       </div>
//     </div>
//   </motion.div>
// );

//   const renderGenerateTab = () => (
//     <motion.div
//       key="generate"
//       initial={{ opacity: 0, y: 8 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -8 }}
//     >
//       <Card title="AI Code Generation" icon={Sparkles} accent="#6366f1">
//         <div className="space-y-4">
//           <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg p-4 flex items-start gap-3">
//             <Zap className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
//             <div>
//               <h4 className="text-sm font-semibold text-indigo-900">Describe your requirements</h4>
//               <p className="text-sm text-indigo-700 mt-1">
//                 Be specific about functionality, inputs/outputs, and constraints.
//               </p>
//             </div>
//           </div>
          
//           <div className="space-y-2">
//             <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Prompt</label>
//             <textarea
//               value={instruction}
//               onChange={(e) => setInstruction(e.target.value)}
//               placeholder='E.g., "Create a function that finds the longest palindromic substring..."'
//               className="w-full px-4 py-3 rounded-lg text-sm bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-y min-h-[160px]"
//             />
//           </div>

//           <Button 
//             onClick={handleGenerateCode} 
//             loading={loading} 
//             variant="accent" 
//             size="lg" 
//             icon={Wand2}
//             className="w-full"
//             style={{ backgroundColor: '#6366f1' }}
//             disabled={!instruction.trim()}
//           >
//             {loading ? 'Generating with AI...' : 'Generate Code'}
//           </Button>
//         </div>
//       </Card>
//     </motion.div>
//   );

//   const renderInterviewSetup = () => (
//     <motion.div
//       key="interview-setup"
//       initial={{ opacity: 0, scale: 0.98 }}
//       animate={{ opacity: 1, scale: 1 }}
//     >
//       <Card title="Mock Interview Setup" icon={Trophy} accent="#ef4444">
//         <div className="space-y-6">
//           <p className="text-sm text-gray-600 leading-relaxed">
//             Practice coding interviews with AI-generated problems.
//           </p>
          
//           <div className="grid sm:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Difficulty</label>
//               <div className="grid grid-cols-3 gap-2">
//                 {['beginner', 'medium', 'advanced'].map((diff) => (
//                   <button
//                     key={diff}
//                     onClick={() => setInterviewData({ ...interviewData, difficulty: diff })}
//                     className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
//                       interviewData.difficulty === diff
//                         ? 'bg-red-50 border-red-200 text-red-700 shadow-sm'
//                         : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
//                     }`}
//                   >
//                     {diff.charAt(0).toUpperCase() + diff.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>
            
//             <div className="space-y-2">
//               <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</label>
//               <div className="flex items-center gap-3">
//                 <Clock className="w-4 h-4 text-gray-400" />
//                 <input
//                   type="range"
//                   min="15"
//                   max="90"
//                   step="15"
//                   value={interviewData.duration}
//                   onChange={(e) => setInterviewData({ ...interviewData, duration: parseInt(e.target.value) })}
//                   className="flex-1 accent-red-600"
//                 />
//                 <span className="text-sm font-medium text-gray-700 w-12">{interviewData.duration}m</span>
//               </div>
//             </div>
//           </div>

//           <Button 
//             onClick={startInterview} 
//             loading={loading} 
//             variant="danger" 
//             size="lg" 
//             icon={Play}
//             className="w-full"
//           >
//             Start Interview Session
//           </Button>
//         </div>
//       </Card>
//     </motion.div>
//   );

//   const renderInterviewActive = () => {
//     if (!interviewSession) return null;
    
//     let problem;
//     try {
//       problem = typeof interviewSession.interview_problem === 'string' 
//         ? JSON.parse(interviewSession.interview_problem) 
//         : interviewSession.interview_problem;
//     } catch {
//       problem = { description: interviewSession.interview_problem };
//     }

//     const isTimeLow = timeRemaining < 300;

//     return (
//       <div className="space-y-4">
//         {/* Timer Bar */}
//         <motion.div 
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className={`rounded-xl p-4 flex items-center justify-between border ${
//             isTimeLow ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200 shadow-sm'
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <div className={`p-2 rounded-lg ${isTimeLow ? 'bg-red-100' : 'bg-gray-100'}`}>
//               <Clock className={`w-5 h-5 ${isTimeLow ? 'text-red-600 animate-pulse' : 'text-gray-600'}`} />
//             </div>
//             <div>
//               <span className={`font-mono text-2xl font-bold ${isTimeLow ? 'text-red-600' : 'text-gray-900'}`}>
//                 {formatTime(timeRemaining)}
//               </span>
//               <p className="text-xs text-gray-500">remaining</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <DifficultyBadge level={interviewSession.interview_difficulty} />
//             <button 
//               onClick={() => setInterviewSession(null)} 
//               className="text-xs text-red-600 hover:text-red-700 font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors"
//             >
//               End Session
//             </button>
//           </div>
//         </motion.div>

//         {/* Problem Card */}
//         <Card title={problem.title || 'Coding Challenge'} icon={Code} accent="#ef4444" collapsible>
//           <div className="space-y-4">
//             <div className="prose prose-sm max-w-none">
//               <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{problem.description}</p>
//             </div>
            
//             {problem.examples && (
//               <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
//                 <h4 className="text-xs font-semibold text-gray-500 uppercase">Example</h4>
//                 {problem.examples.map((ex, idx) => (
//                   <div key={idx} className="space-y-2">
//                     <div className="text-xs text-gray-500 font-medium">Input:</div>
//                     <code className="text-xs bg-white px-3 py-2 rounded border block font-mono text-gray-700">{ex.input}</code>
//                     <div className="text-xs text-gray-500 font-medium mt-2">Output:</div>
//                     <code className="text-xs bg-white px-3 py-2 rounded border block font-mono text-emerald-600">{ex.output}</code>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>

//         {/* Solution Editor */}
//         <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#1e1e1e] shadow-lg">
//           <div className="px-4 py-3 bg-[#252526] border-b border-gray-700 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Code className="w-4 h-4 text-green-400" />
//               <span className="text-xs font-medium text-gray-300">Your Solution</span>
//             </div>
//             <span className="text-xs text-gray-500 font-mono">{currentLang?.extension}</span>
//           </div>
//           <Editor
//             height="380px"
//             language={currentLang?.monacoLang || 'plaintext'}
//             value={code}
//             onChange={(value) => setCode(value || '')}
//             theme="vs-dark"
//             options={{ 
//               minimap: { enabled: false }, 
//               fontSize: 14, 
//               padding: { top: 16 },
//               scrollBeyondLastLine: false,
//               automaticLayout: true,
//             }}
//           />
//         </div>

//         <div className="flex gap-3">
//           <Button onClick={submitInterview} loading={loading} variant="success" size="lg" icon={CheckCircle2} className="flex-1">
//             Submit Solution
//           </Button>
//           <Button onClick={() => { setInterviewSession(null); setTimeRemaining(null); }} variant="secondary" icon={XCircle}>
//             Quit
//           </Button>
//         </div>
//       </div>
//     );
//   };

//   const renderContentArea = () => {
//     switch (activeTab) {
//       case 'generate':
//         return renderGenerateTab();
//       case 'interview':
//         return interviewSession ? renderInterviewActive() : renderInterviewSetup();
//       default:
//         return renderEditor();
//     }
//   };

//   const renderResults = () => {
//     if (!result || loading) return null;

//     const copyToClipboard = (text) => navigator.clipboard.writeText(text);

//     switch (activeTab) {
//       case 'run':
//         return <CodeOutput output={result.sandbox_output} error={result.sandbox_error} executionTime={executionTime} />;

//       case 'review':
//   return (
//     <div className="space-y-4">
//       <Card title="Code Review Analysis" icon={Search} accent="#3b82f6" collapsible>
//         <div className="space-y-6">
//           {(result.review || '').split('\n').map((line, idx) => {
//             // Main heading
//             if (line.startsWith('# ')) {
//               return (
//                 <h1 key={idx} className="text-2xl font-bold text-gray-900 mt-4 mb-4 pb-3 border-b-2 border-blue-100">
//                   {line.replace('# ', '')}
//                 </h1>
//               );
//             }
//             // Section heading
//             if (line.startsWith('## ')) {
//               return (
//                 <h2 key={idx} className="text-lg font-bold text-gray-800 mt-5 mb-3 flex items-center gap-2">
//                   <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
//                   {line.replace('## ', '')}
//                 </h2>
//               );
//             }
//             // Sub heading
//             if (line.startsWith('### ')) {
//               return (
//                 <h3 key={idx} className="text-base font-semibold text-gray-700 mt-4 mb-2 flex items-center gap-2">
//                   <div className="w-1 h-4 bg-blue-400 rounded-full" />
//                   {line.replace('### ', '')}
//                 </h3>
//               );
//             }
//             // Empty line
//             if (line.trim() === '') {
//               return <div key={idx} className="h-2" />;
//             }
//             // Bullet points with icons
//             if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
//               const content = line.replace(/^[\s]*[-•]\s*/, '');
//               const icon = content.toLowerCase().includes('error') || content.toLowerCase().includes('bug') ? <XCircle className="w-4 h-4 text-red-500" />
//                 : content.toLowerCase().includes('warning') || content.toLowerCase().includes('caution') ? <AlertCircle className="w-4 h-4 text-amber-500" />
//                 : content.toLowerCase().includes('good') || content.toLowerCase().includes('excellent') || content.toLowerCase().includes('✓') ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//                 : <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2" />;
              
//               return (
//                 <div key={idx} className="flex items-start gap-3 ml-4 mb-2">
//                   <div className="shrink-0 mt-0.5">{icon}</div>
//                   <p className="text-gray-600 leading-relaxed">
//                     {content
//                       .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
//                       .replace(/`([^`]+)`/g, '<code class="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono border border-blue-100">$1</code>')
//                       .split(/(<[^>]+>[^<]*<\/[^>]+>)/g)
//                       .map((part, i) => 
//                         part.startsWith('<') ? (
//                           <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
//                         ) : (
//                           part
//                         )
//                       )
//                     }
//                   </p>
//                 </div>
//               );
//             }
//             // Numbered lists
//             if (/^\d+[\.\)]/.test(line.trim())) {
//               const match = line.match(/^(\d+)[\.\)]\s*(.*)/);
//               if (match) {
//                 return (
//                   <div key={idx} className="flex items-start gap-3 ml-4 mb-2">
//                     <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
//                       {match[1]}
//                     </span>
//                     <p className="text-gray-600 leading-relaxed">
//                       {match[2]
//                         .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
//                         .replace(/`([^`]+)`/g, '<code class="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono border border-blue-100">$1</code>')
//                         .split(/(<[^>]+>[^<]*<\/[^>]+>)/g)
//                         .map((part, i) => 
//                           part.startsWith('<') ? (
//                             <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
//                           ) : (
//                             part
//                           )
//                         )
//                       }
//                     </p>
//                   </div>
//                 );
//               }
//             }
//             // Regular paragraph
//             return (
//               <p key={idx} className="text-gray-600 leading-relaxed mb-3">
//                 {line
//                   .replace(/\*\*\*(.*?)\*\*\*/g, '___$1___')
//                   .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
//                   .replace(/\*(.*?)\*/g, '<em class="text-gray-700">$1</em>')
//                   .replace(/___(.*?)___/g, '<strong><em>$1</em></strong>')
//                   .replace(/`([^`]+)`/g, '<code class="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono border border-blue-100">$1</code>')
//                   .replace(/\[(\d+)\]/g, '<sup class="text-xs text-gray-400 ml-0.5">[$1]</sup>')
//                   .split(/(<[^>]+>[^<]*<\/[^>]+>)/g)
//                   .map((part, i) => 
//                     part.startsWith('<') ? (
//                       <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
//                     ) : (
//                       part
//                     )
//                   )
//                 }
//               </p>
//             );
//           })}
//         </div>
//       </Card>
      
//       {result.practice_challenge && (
//         <Card >
//           <div className="space-y-3">
//             {result.practice_challenge.split('\n').map((line, idx) => {
//               if (line.trim() === '') return null;
              
//               // Challenge header with emoji or number
//               if (/^(\d+[\.\)]|🎯|💡|✅|⚠️|🔍|📝)/.test(line.trim())) {
//                 const cleanLine = line.replace(/^(\d+[\.\)]|🎯|💡|✅|⚠️|🔍|📝)\s*/, '');
//                 const num = line.match(/^(\d+)/)?.[1];
//                 return (
//                   <div key={idx} className="flex items-start gap-3 mt-4 first:mt-0">
//                     <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold shrink-0">
//                       {num || '•'}
//                     </span>
//                     <p className="text-sm text-gray-800 font-semibold">
//                       {cleanLine
//                         .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')
//                         .split(/(<[^>]+>[^<]*<\/[^>]+>)/g)
//                         .map((part, i) => 
//                           part.startsWith('<') ? (
//                             <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
//                           ) : (
//                             part
//                           )
//                         )
//                       }
//                     </p>
//                   </div>
//                 );
//               }
              
//               // Bullet points
//               if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
//                 return (
//                   <div key={idx} className="flex items-start gap-2 ml-10">
//                     <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
//                     <p className="text-sm text-gray-600 leading-relaxed">
//                       {line.replace(/^[\s]*[-•]\s*/, '')
//                         .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-800">$1</strong>')
//                         .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-700 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
//                         .split(/(<[^>]+>[^<]*<\/[^>]+>)/g)
//                         .map((part, i) => 
//                           part.startsWith('<') ? (
//                             <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
//                           ) : (
//                             part
//                           )
//                         )
//                       }
//                     </p>
//                   </div>
//                 );
//               }
              
//               // Regular text
//               return (
//                 <p key={idx} className="text-sm text-gray-600 ml-10 leading-relaxed">
//                   {line
//                     .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-800">$1</strong>')
//                     .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-700 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
//                     .split(/(<[^>]+>[^<]*<\/[^>]+>)/g)
//                     .map((part, i) => 
//                       part.startsWith('<') ? (
//                         <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
//                       ) : (
//                         part
//                       )
//                     )
//                   }
//                 </p>
//               );
//             })}
//           </div>
//         </Card>
//       )}
//     </div>
//   );

//  case 'explain':
//   // Parse practice challenges into individual questions
//   const parseQuestions = (text) => {
//     if (!text) return [];
//     const questions = [];
//     const blocks = text.split(/=== QUESTION START ===/);
    
//     blocks.forEach(block => {
//       if (!block.trim()) return;
//       const cleanBlock = block.replace(/=== QUESTION END ===/g, '').trim();
      
//       const question = {
//         title: cleanBlock.match(/Title:\s*(.+)/)?.[1] || 'Practice Challenge',
//         difficulty: cleanBlock.match(/Difficulty:\s*(.+)/)?.[1] || 'medium',
//         topics: cleanBlock.match(/Topics:\s*(.+)/)?.[1]?.split(',').map(t => t.trim()) || [],
//         problem: cleanBlock.match(/Problem:\s*([\s\S]+?)(?=Examples:|Constraints:|SuggestedTimeMinutes:|$)/)?.[1]?.trim(),
//         examples: [],
//         constraints: [],
//         suggestedTime: cleanBlock.match(/SuggestedTimeMinutes:\s*(\d+)/)?.[1]
//       };
      
//       // Parse examples
//       const examplesMatch = cleanBlock.match(/Examples:\s*([\s\S]+?)(?=Constraints:|SuggestedTimeMinutes:|$)/);
//       if (examplesMatch) {
//         const exampleLines = examplesMatch[1].trim().split(/\n/).filter(l => l.trim());
//         let currentExample = {};
//         exampleLines.forEach(line => {
//           if (/^\d+\)/.test(line.trim())) {
//             if (currentExample.input) question.examples.push(currentExample);
//             currentExample = { number: line.match(/^(\d+)\)/)?.[1] };
//           } else if (line.toLowerCase().includes('input:')) {
//             currentExample.input = line.replace(/input:/i, '').trim();
//           } else if (line.toLowerCase().includes('output:')) {
//             currentExample.output = line.replace(/output:/i, '').trim();
//           }
//         });
//         if (currentExample.input) question.examples.push(currentExample);
//       }
      
//       // Parse constraints
//       const constraintsMatch = cleanBlock.match(/Constraints:\s*([\s\S]+?)(?=SuggestedTimeMinutes:|$)/);
//       if (constraintsMatch) {
//         question.constraints = constraintsMatch[1]
//           .trim()
//           .split('\n')
//           .map(l => l.replace(/^[-•]\s*/, '').trim())
//           .filter(l => l);
//       }
      
//       questions.push(question);
//     });
    
//     return questions;
//   };

//   const questions = parseQuestions(result.practice_challenge);

//   return (
//     <Card title="Code Explanation" icon={BookOpen} accent="#8b5cf6">
//       <div className="space-y-6">
//         {/* Main Explanation */}
//         <div className="prose prose-sm max-w-none">
//           {(result.explanation || '').split('\n').map((line, idx) => {
//             if (line.startsWith('# ')) {
//               return (
//                 <h1 key={idx} className="text-2xl font-bold text-gray-900 mt-6 mb-4 pb-2 border-b border-gray-200">
//                   {line.replace('# ', '')}
//                 </h1>
//               );
//             }
//             if (line.startsWith('## ')) {
//               return (
//                 <h2 key={idx} className="text-lg font-bold text-gray-800 mt-5 mb-3 flex items-center gap-2">
//                   <div className="w-1 h-5 bg-purple-500 rounded-full" />
//                   {line.replace('## ', '')}
//                 </h2>
//               );
//             }
//             if (line.startsWith('### ')) {
//               return (
//                 <h3 key={idx} className="text-base font-semibold text-gray-700 mt-4 mb-2">
//                   {line.replace('### ', '')}
//                 </h3>
//               );
//             }
//             if (line.trim() === '') {
//               return <div key={idx} className="h-2" />;
//             }
//             return (
//               <p key={idx} className="text-gray-600 leading-relaxed mb-3">
//                 {line
//                   .replace(/\*\*\*(.*?)\*\*\*/g, '___$1___')
//                   .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
//                   .replace(/\*(.*?)\*/g, '<em class="text-gray-700">$1</em>')
//                   .replace(/___(.*?)___/g, '<strong><em>$1</em></strong>')
//                   .replace(/`([^`]+)`/g, '<code class="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded text-sm font-mono border border-purple-100">$1</code>')
//                   .replace(/\[(\d+)\]/g, '<sup class="text-xs text-gray-400 ml-0.5">[$1]</sup>')
//                   .split(/(<[^>]+>[^<]*<\/[^>]+>)/g)
//                   .map((part, i) => 
//                     part.startsWith('<') ? (
//                       <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
//                     ) : (
//                       part
//                     )
//                   )
//                 }
//               </p>
//             );
//           })}
//         </div>

//         {/* Practice Challenges - As Individual Cards */}
//         {questions.length > 0 && (
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
//               <Zap className="w-5 h-5 text-amber-500" />
//               <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
//                 Practice Challenges ({questions.length})
//               </h3>
//             </div>
            
//             {questions.map((q, idx) => (
//               <div 
//                 key={idx} 
//                 className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//               >
//                 {/* Question Header */}
//                 <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-4 border-b border-amber-100">
//                   <div className="flex items-start justify-between gap-4">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-2">
//                         <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-bold">
//                           {idx + 1}
//                         </span>
//                         <h4 className="text-base font-bold text-gray-900">{q.title}</h4>
//                       </div>
//                       <div className="flex flex-wrap items-center gap-2">
//                         <DifficultyBadge level={q.difficulty} />
//                         {q.suggestedTime && (
//                           <span className="px-2 py-0.5 bg-white rounded text-xs text-gray-600 border border-gray-200 flex items-center gap-1">
//                             <Clock className="w-3 h-3" />
//                             {q.suggestedTime} min
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Topics */}
//                   {q.topics.length > 0 && (
//                     <div className="flex flex-wrap gap-1.5 mt-3">
//                       {q.topics.map((topic, tidx) => (
//                         <span 
//                           key={tidx} 
//                           className="px-2 py-0.5 bg-white/80 rounded text-xs text-gray-600 border border-amber-200"
//                         >
//                           {topic}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Question Body */}
//                 <div className="p-5 space-y-4">
//                   {/* Problem */}
//                   <div>
//                     <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Problem</h5>
//                     <p className="text-sm text-gray-700 leading-relaxed">{q.problem}</p>
//                   </div>
                  
//                   {/* Examples */}
//                   {q.examples.length > 0 && (
//                     <div>
//                       <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Examples</h5>
//                       <div className="space-y-2">
//                         {q.examples.map((ex, eidx) => (
//                           <div key={eidx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                             <div className="text-xs text-gray-500 mb-1">Example {ex.number}</div>
//                             <div className="space-y-1">
//                               {ex.input && (
//                                 <div className="flex items-start gap-2">
//                                   <span className="text-xs font-medium text-gray-500 w-12 shrink-0">Input:</span>
//                                   <code className="text-sm text-gray-800 font-mono">{ex.input}</code>
//                                 </div>
//                               )}
//                               {ex.output && (
//                                 <div className="flex items-start gap-2">
//                                   <span className="text-xs font-medium text-gray-500 w-12 shrink-0">Output:</span>
//                                   <code className="text-sm text-emerald-700 font-mono">{ex.output}</code>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* Constraints */}
//                   {q.constraints.length > 0 && (
//                     <div>
//                       <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Constraints</h5>
//                       <ul className="space-y-1">
//                         {q.constraints.map((c, cidx) => (
//                           <li key={cidx} className="flex items-start gap-2 text-sm text-gray-600">
//                             <span className="text-gray-400 mt-1">•</span>
//                             <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{c}</code>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Action Footer */}
//                 <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
//                   <span className="text-xs text-gray-500">Try solving this challenge!</span>
//                   <Button 
//                     size="sm" 
//                     variant="secondary"
//                     onClick={() => {
//                       // Load template code for this challenge
//                       setCode(`# ${q.title}\n# Difficulty: ${q.difficulty}\n\n# TODO: Implement your solution here\n\ndef solution():\n    pass\n\n# Test your solution\nif __name__ == "__main__":\n    solution()`);
//                       setActiveTab('run');
//                       setEditorKey(prev => prev + 1);
//                     }}
//                   >
//                     Start Coding
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
        
//         {/* Fallback if parsing fails */}
//         {!questions.length && result.practice_challenge && (
//           <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
//             <h4 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-3 flex items-center gap-2">
//               <Zap className="w-4 h-4 text-amber-600" />
//               Practice Challenges
//             </h4>
//             <pre className="text-sm text-amber-800 whitespace-pre-wrap font-mono bg-white/50 p-3 rounded-lg">
//               {result.practice_challenge}
//             </pre>
//           </div>
//         )}
//       </div>
//     </Card>
//   );
//       case 'generate':
//         const generatedCode = result.generated_code || result.code || '';
//         return (
//           <Card 
//             title="Generated Code" 
//             icon={Code}
//             accent="#6366f1"
//             headerAction={
//               <Button size="sm" variant="secondary" icon={Copy} onClick={() => copyToClipboard(generatedCode)}>
//                 Copy
//               </Button>
//             }
//           >
//             <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
//               <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
//                 <span className="text-xs text-gray-400 font-mono">generated.{currentLang?.extension}</span>
//                 <span className="text-xs text-gray-500">{generatedCode.split('\n').length} lines</span>
//               </div>
//               <pre className="p-4 text-sm font-mono text-green-400 overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto">
//                 {generatedCode || '// No code generated'}
//               </pre>
//             </div>
//             <div className="mt-4 flex gap-2">
//               <Button 
//                 size="sm" 
//                 variant="secondary"
//                 icon={Code}
//                 onClick={() => handleLoadInEditor(generatedCode)}
//               >
//                 Load in Editor
//               </Button>
//               <Button 
//                 size="sm" 
//                 variant="ghost"
//                 icon={Download}
//                 onClick={() => {
//                   const blob = new Blob([generatedCode], { type: 'text/plain' });
//                   const url = URL.createObjectURL(blob);
//                   const a = document.createElement('a');
//                   a.href = url;
//                   a.download = `generated.${currentLang?.extension}`;
//                   a.click();
//                 }}
//               >
//                 Download
//               </Button>
//             </div>
//           </Card>
//         );

//       case 'animate':
//         let trace = null;
//         try {
//           let raw = result.animation_trace;
//           if (typeof raw === 'string') {
//             raw = raw.replace(/```json/g, '').replace(/```/g, '').trim();
//             trace = JSON.parse(raw);
//           } else {
//             trace = raw;
//           }
//         } catch (e) {
//           console.error('Failed to parse animation trace:', e);
//         }

//         return (
//           <Card title="Execution Visualization" icon={Film} accent="#f59e0b">
//             {trace ? <AnimationPlayer trace={trace} editorRef={editorRef} /> : <div className="text-center py-8 text-gray-500">No animation data available</div>}
//           </Card>
//         );

//       case 'interview':
//         if (result.interview_score !== undefined) {
//           const score = result.interview_score;
//           const colors = score >= 80 
//             ? { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', accent: '#10b981', label: 'Excellent!' }
//             : score >= 60 
//             ? { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', accent: '#f59e0b', label: 'Good Job' }
//             : { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', accent: '#ef4444', label: 'Keep Practicing' };

//           return (
//             <Card title="Interview Results" icon={Trophy} accent={colors.accent}>
//               <div className={`${colors.bg} border ${colors.border} rounded-2xl p-8 text-center mb-6`}>
//                 <div className="relative inline-flex items-center justify-center mb-4">
//                   <svg className="w-32 h-32 transform -rotate-90">
//                     <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-200" />
//                     <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray={`${score * 3.52} 352`} strokeLinecap="round" className={colors.text} />
//                   </svg>
//                   <div className="absolute text-center">
//                     <span className={`text-4xl font-bold ${colors.text} block`}>{score}</span>
//                     <span className="text-xs text-gray-400 uppercase tracking-wider">Score</span>
//                   </div>
//                 </div>
//                 <h3 className={`text-xl font-bold ${colors.text} mb-2`}>{colors.label}</h3>
//               </div>
              
//               <div className="space-y-3">
//                 <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Detailed Feedback</h4>
//                 <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap border border-gray-200 max-h-96 overflow-y-auto">
//                   {result.review}
//                 </div>
//               </div>

//               <div className="mt-6 flex gap-3">
//                 <Button variant="secondary" className="flex-1" onClick={() => { setResult(null); setInterviewSession(null); }}>
//                   New Interview
//                 </Button>
//               </div>
//             </Card>
//           );
//         }
//         return null;

//       default:
//         return null;
//     }
//   };

//   // Keyboard Shortcuts Modal
//   const renderShortcutsModal = () => (
//     <AnimatePresence>
//       {showShortcuts && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
//           onClick={() => setShowShortcuts(false)}
//         >
//           <motion.div
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.95, opacity: 0 }}
//             className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
//             onClick={e => e.stopPropagation()}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                 <Keyboard className="w-5 h-5" />
//                 Keyboard Shortcuts
//               </h3>
//               <button onClick={() => setShowShortcuts(false)} className="text-gray-400 hover:text-gray-600">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="space-y-3">
//               {[
//                 { keys: ['Ctrl', 'Enter'], action: 'Execute current action' },
//                 { keys: ['Ctrl', 'B'], action: 'Toggle sidebar' },
//               ].map((shortcut, idx) => (
//                 <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
//                   <span className="text-sm text-gray-600">{shortcut.action}</span>
//                   <div className="flex items-center gap-1">
//                     {shortcut.keys.map((key, i) => (
//                       <React.Fragment key={i}>
//                         <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono font-semibold text-gray-700">{key}</kbd>
//                         {i < shortcut.keys.length - 1 && <span className="text-gray-400">+</span>}
//                       </React.Fragment>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
//         <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
//               <Terminal className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h1 className="text-lg font-bold text-gray-900 tracking-tight">CodeMentor</h1>
//               <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">AI-Powered Development</p>
//             </div>
//           </div>
          
//           <div className="hidden md:flex items-center gap-6">
//             <div className="flex items-center gap-4 text-xs text-gray-400">
//               <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded font-mono text-gray-600">Ctrl</kbd>
//               <span>+</span>
//               <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded font-mono text-gray-600">Enter</kbd>
//               <span className="ml-1 text-gray-500">to execute</span>
//             </div>
//             <button onClick={() => setShowShortcuts(true)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
//               <Keyboard className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Layout */}
//       <div className="flex-1 max-w-[1600px] mx-auto w-full flex overflow-hidden">
        
//         {/* Sidebar */}
//         <motion.aside 
//           initial={false}
//           animate={{ width: sidebarCollapsed ? 80 : 280 }}
//           className="hidden lg:flex flex-col bg-white border-r border-gray-200 shrink-0 z-30"
//         >
//           <div className="p-4 space-y-6 overflow-y-auto flex-1">
//             <div className="space-y-1">
//               {!sidebarCollapsed && <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">Actions</p>}
//               {TABS.map((tab) => {
//                 const Icon = tab.icon;
//                 const isActive = activeTab === tab.id;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => { setActiveTab(tab.id); setResult(null); setError(''); setInterviewSession(null); }}
//                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'shadow-sm' : 'hover:bg-gray-50 text-gray-600'}`}
//                     style={{ backgroundColor: isActive ? `${tab.accent}15` : 'transparent', color: isActive ? tab.accent : undefined, border: isActive ? `1px solid ${tab.accent}30` : '1px solid transparent' }}
//                     title={sidebarCollapsed ? tab.label : undefined}
//                   >
//                     <Icon className="w-5 h-5 shrink-0" style={{ color: isActive ? tab.accent : undefined }} />
//                     {!sidebarCollapsed && <><span className="flex-1 text-left">{tab.label}</span>{isActive && <ChevronRight className="w-4 h-4 opacity-50" />}</>}
//                     {isActive && !sidebarCollapsed && <motion.div layoutId="activeTab" className="absolute left-0 w-1 h-6 rounded-r-full" style={{ backgroundColor: tab.accent }} />}
//                   </button>
//                 );
//               })}
//             </div>

//             <div className="mx-3 h-px bg-gray-200" />

//             <div className="space-y-1">
//               {!sidebarCollapsed && <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">Language</p>}
//               <div className="space-y-0.5">
//                 {LANGUAGES.map((lang) => {
//                   const isSelected = language === lang.id;
//                   return (
//                     <button
//                       key={lang.id}
//                       onClick={() => setLanguage(lang.id)}
//                       className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${isSelected ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
//                       title={sidebarCollapsed ? lang.label : undefined}
//                     >
//                       <span className="text-base shrink-0">{lang.icon}</span>
//                       {!sidebarCollapsed && <span className="font-mono text-xs">{lang.label}</span>}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           <div className="p-4 border-t border-gray-200">
//             <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="w-full flex items-center justify-center p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
//               {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
//             </button>
//           </div>
//         </motion.aside>

//         {/* Mobile Navigation */}
//         <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-2 py-2 pb-safe shadow-lg">
//           <div className="flex gap-1 overflow-x-auto scrollbar-hide">
//             {TABS.map((tab) => {
//               const Icon = tab.icon;
//               const isActive = activeTab === tab.id;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => { setActiveTab(tab.id); setResult(null); setError(''); setInterviewSession(null); }}
//                   className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg min-w-[64px] transition-all ${isActive ? 'bg-gray-100' : 'text-gray-500'}`}
//                   style={{ color: isActive ? tab.accent : undefined }}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span className="text-[10px] font-medium">{tab.label}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Main Content */}
//         <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 overflow-y-auto">
//           <div className="max-w-4xl mx-auto space-y-6">
            
//             {/* Tab Header */}
//             <AnimatePresence mode="wait">
//               {activeTabData && (
//                 <motion.div key={activeTab} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex items-center gap-3 mb-6">
//                   <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm" style={{ backgroundColor: `${activeTabData.accent}15` }}>
//                     <activeTabData.icon className="w-6 h-6" style={{ color: activeTabData.accent }} />
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-bold text-gray-900">{activeTabData.label}</h2>
//                     <p className="text-sm text-gray-500">{activeTabData.description}</p>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Content Area */}
//             <AnimatePresence mode="wait">
//               {renderContentArea()}
//             </AnimatePresence>

//             {/* Error Display */}
//             <AnimatePresence>
//               {error && (
//                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
//                   <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
//                   <div className="flex-1">
//                     <h4 className="text-sm font-semibold text-red-800 mb-1">Error</h4>
//                     <p className="text-sm text-red-700">{error}</p>
//                   </div>
//                   <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 p-1 hover:bg-red-100 rounded">
//                     <X className="w-4 h-4" />
//                   </button>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Results */}
//             <AnimatePresence>
//               {result && !loading && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">{renderResults()}</motion.div>}
//             </AnimatePresence>

//             {/* Loading State */}
//             {loading && (
//               <div className="flex flex-col items-center justify-center py-16">
//                 <div className="relative">
//                   <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
//                   <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin" style={{ animationDuration: '1.5s' }} />
//                 </div>
//                 <p className="mt-4 text-sm font-medium text-gray-700">Processing your request...</p>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>

//       {renderShortcutsModal()}
//     </div>
//   );
// };

// export default CodeMentor;






import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { codeMentorAPI } from '../services/api';
import { 
  Play, Search, BookOpen, Wand2, Film, Briefcase, Code, 
  Copy, Terminal, ChevronRight, Loader2, AlertCircle, 
  CheckCircle2, XCircle, Clock, Zap, Trophy, RotateCcw,
  Settings, Download, Sparkles,  
  FileCode2,  Keyboard, ChevronLeft, Type, 
   X, Trash2, Lightbulb
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import AnimationPlayer from "../components/AnimationPlayer";

// ==========================================
// CONFIGURATION & CONSTANTS
// ==========================================

const LANGUAGES = [
  { id: 'python', label: 'Python', icon: '🐍', extension: 'py', monacoLang: 'python' },
  { id: 'javascript', label: 'JavaScript', icon: '⚡', extension: 'js', monacoLang: 'javascript' },
  { id: 'typescript', label: 'TypeScript', icon: '🔷', extension: 'ts', monacoLang: 'typescript' },
  { id: 'java', label: 'Java', icon: '☕', extension: 'java', monacoLang: 'java' },
  { id: 'cpp', label: 'C++', icon: '⚙️', extension: 'cpp', monacoLang: 'cpp' },
  { id: 'c', label: 'C', icon: '🔧', extension: 'c', monacoLang: 'c' },
  { id: 'go', label: 'Go', icon: '🐹', extension: 'go', monacoLang: 'go' },
  { id: 'rust', label: 'Rust', icon: '🦀', extension: 'rs', monacoLang: 'rust' },
  { id: 'php', label: 'PHP', icon: '🐘', extension: 'php', monacoLang: 'php' },
  { id: 'csharp', label: 'C#', icon: '🔷', extension: 'cs', monacoLang: 'csharp' },
  { id: 'kotlin', label: 'Kotlin', icon: '🎯', extension: 'kt', monacoLang: 'kotlin' },
  { id: 'sql', label: 'SQL', icon: '🗄️', extension: 'sql', monacoLang: 'sql' },
  { id: 'ruby', label: 'Ruby', icon: '💎', extension: 'rb', monacoLang: 'ruby' },
  { id: 'swift', label: 'Swift', icon: '🦉', extension: 'swift', monacoLang: 'swift' },
  { id: 'r', label: 'R', icon: '📊', extension: 'r', monacoLang: 'r' },
];

const TABS = [
  { id: 'run', label: 'Run', icon: Play, accent: '#10b981', description: 'Execute code in secure sandbox' },
  { id: 'review', label: 'Review', icon: Search, accent: '#3b82f6', description: 'AI-powered code analysis' },
  { id: 'explain', label: 'Explain', icon: BookOpen, accent: '#8b5cf6', description: 'Understand how code works' },
  { id: 'generate', label: 'Generate', icon: Wand2, accent: '#6366f1', description: 'AI code generation' },
  { id: 'animate', label: 'Visualize', icon: Film, accent: '#f59e0b', description: 'Step-through execution' },
  { id: 'interview', label: 'Interview', icon: Briefcase, accent: '#ef4444', description: 'Mock coding interview' },
];

const DEFAULT_TEMPLATES = {
  python: `# Write your Python code here
print("Hello, World!")`,
  javascript: `// Write your JavaScript code here
console.log("Hello, World!");`,
  typescript: `// Write your TypeScript code here
console.log("Hello, World!");`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
  rust: `fn main() {
    println!("Hello, World!");
}`,
  php: `<?php
echo "Hello, World!";
?>`,
  csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
  kotlin: `fun main() {
    println("Hello, World!")
}`,
  sql: `SELECT 'Hello, World!' AS message;`,
  ruby: `puts "Hello, World!"`,
  swift: `print("Hello, World!")`,
  r: `print("Hello, World!")`,
};

// ==========================================
// REUSABLE UI COMPONENTS
// ==========================================

const stripMarkdownCodeBlocks = (code) => {
  if (!code) return '';
  return code
    .replace(/```[\w]*\n/g, '')
    .replace(/```\n?/g, '')
    .trim();
};

const Button = memo(({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  loading = false,
  disabled = false,
  className = '',
  style = {}
}) => {
  const baseStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md',
    secondary: 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 border-transparent',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm',
    accent: 'text-white shadow-sm hover:shadow-md',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    icon: 'p-2',
  };

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg font-medium
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${baseStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      style={style}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </motion.button>
  );
});

const Card = memo(({ 
  children, 
  title, 
  icon: Icon, 
  className = '',
  headerAction,
  accent,
  collapsible = false,
  defaultCollapsed = false
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${className}`}
    >
      {(title || Icon) && (
        <div 
          className={`px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between ${collapsible ? 'cursor-pointer select-none' : ''}`}
          onClick={collapsible ? () => setCollapsed(!collapsed) : undefined}
        >
          <div className="flex items-center gap-2.5">
            {Icon && <Icon className="w-4 h-4" style={{ color: accent || '#6b7280' }} />}
            {title && <h3 className="text-sm font-semibold text-gray-900">{title}</h3>}
          </div>
          <div className="flex items-center gap-2">
            {headerAction}
            {collapsible && (
              <ChevronRight 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${collapsed ? '' : 'rotate-90'}`} 
              />
            )}
          </div>
        </div>
      )}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

const CodeOutput = memo(({ output, error, executionTime }) => (
  <div className={`rounded-xl overflow-hidden border ${error ? 'border-red-200' : 'border-emerald-200'}`}>
    <div className={`px-4 py-2.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider border-b ${error ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
      <div className="flex items-center gap-2">
        {error ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
        {error ? 'Execution Error' : 'Standard Output'}
      </div>
      {executionTime && (
        <span className="text-xs font-mono opacity-75">{executionTime}s</span>
      )}
    </div>
    <pre className={`p-4 font-mono text-sm whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto ${error ? 'bg-red-50 text-red-900' : 'bg-emerald-50/30 text-emerald-900'}`}>
      {error || output || 'No output generated'}
    </pre>
  </div>
));

const DifficultyBadge = memo(({ level }) => {
  const colors = {
    beginner: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    medium: 'bg-amber-100 text-amber-800 border-amber-200',
    advanced: 'bg-red-100 text-red-800 border-red-200',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${colors[level] || colors.medium}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
});

const Tooltip = memo(({ children, text }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-50"
          >
            {text}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// ==========================================
// MAIN COMPONENT
// ==========================================

const CodeMentor = () => {
  // Core State
  const [activeTab, setActiveTab] = useState('run');
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(DEFAULT_TEMPLATES.python);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [instruction, setInstruction] = useState('');
  const [executionTime, setExecutionTime] = useState(null);
  
  // Store practice challenges separately so they persist across tab switches
  const [practiceChallenges, setPracticeChallenges] = useState(null);
  
  // Interview State
  const [interviewData, setInterviewData] = useState({
    difficulty: 'medium',
    duration: 45,
  });
  const [interviewSession, setInterviewSession] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  
  // UI State
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [showShortcuts, setShowShortcuts] = useState(false);
  
  const editorRef = useRef(null);
  const timerRef = useRef(null);

  // Update code when language changes (only if using template)
  useEffect(() => {
    const template = DEFAULT_TEMPLATES[language];
    const isCurrentCodeTemplate = Object.values(DEFAULT_TEMPLATES).some(
      t => t.trim() === code.trim()
    );
    
    if (isCurrentCodeTemplate || !code.trim()) {
      setCode(template);
    }
  }, [language]);

  // Interview Timer
  useEffect(() => {
    if (interviewSession && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [interviewSession, timeRemaining]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handlePrimaryAction();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setSidebarCollapsed(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, code, instruction, interviewSession]);

  const handlePrimaryAction = () => {
    // Only clear results when explicitly running a new action
    // But preserve practice challenges
    setResult(null);
    setError('');
    
    switch (activeTab) {
      case 'run': handleRunCode(); break;
      case 'review': handleReviewCode(); break;
      case 'explain': handleExplainCode(); break;
      case 'animate': handleAnimateCode(); break;
      case 'generate': handleGenerateCode(); break;
      case 'interview': 
        if (interviewSession) submitInterview();
        else startInterview();
        break;
    }
  };

  // Smart tab switching - preserve practice challenges
  const handleTabSwitch = (tabId) => {
    setActiveTab(tabId);
    setInterviewSession(null);
    // Don't clear results or practice challenges when switching tabs
  };

  // API Handlers
   // API Handlers
  const handleApiCall = async (apiFn, errorPrefix, preservePracticeChallenges = false) => {
    const startTime = Date.now();
    setLoading(true);
    setError('');
    // Don't clear result here, let the caller decide
    
    try {
      const response = await apiFn();
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      setExecutionTime(duration);
      
      const newResult = response.data || response;
      
      // If preserving practice challenges and we have them, merge them in
      if (preservePracticeChallenges && practiceChallenges) {
        newResult.practice_challenge = practiceChallenges;
      }
      
      setResult(newResult);
      return response;
    } catch (err) {
      console.error(`${errorPrefix}:`, err);
      setError(`${errorPrefix}: ${err.response?.data?.error || err.message || 'Unknown error'}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleRunCode = () => {
    const cleanCode = stripMarkdownCodeBlocks(code);
    // Don't preserve practice challenges for run - it replaces the result entirely
    handleApiCall(
      () => codeMentorAPI.runCode({ code: cleanCode, language }),
      'Execution failed',
      true // preserve practice challenges in result
    );
  };

  const handleReviewCode = () => {
    const cleanCode = stripMarkdownCodeBlocks(code);
    handleApiCall(
      () => codeMentorAPI.reviewCode({ code: cleanCode, language, difficulty: 'medium' }),
      'Review failed'
    );
  };

  const handleExplainCode = () => {
    const cleanCode = stripMarkdownCodeBlocks(code);
    handleApiCall(
      () => codeMentorAPI.explainCode({ code: cleanCode, language, level: 'beginner' }),
      'Explanation failed'
    ).then((response) => {
      // Store practice challenges separately when we get them from explain
      if (response?.data?.practice_challenge) {
        setPracticeChallenges(response.data.practice_challenge);
      }
    });
  };

  const handleAnimateCode = () => {
    const cleanCode = stripMarkdownCodeBlocks(code);
    handleApiCall(
      () => codeMentorAPI.animateCode({ code: cleanCode, language }),
      'Animation failed'
    );
  };

  const handleGenerateCode = () => handleApiCall(
    () => codeMentorAPI.generateCode({ instruction, language }),
    'Generation failed'
  );

  const startInterview = async () => {
    const response = await handleApiCall(
      () => codeMentorAPI.startInterview({
        language,
        difficulty: interviewData.difficulty,
        duration_minutes: interviewData.duration,
      }),
      'Failed to start interview'
    );
    if (response?.data) {
      setInterviewSession(response.data);
      setTimeRemaining(interviewData.duration * 60);
    }
  };

  const submitInterview = async () => {
    if (!interviewSession?.id) return;
    const cleanCode = stripMarkdownCodeBlocks(code);
    const response = await handleApiCall(
      () => codeMentorAPI.submitInterview(interviewSession.id, { code: cleanCode }),
      'Submission failed'
    );
    if (response?.data) {
      setInterviewSession(null);
      setTimeRemaining(null);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLoadInEditor = (generatedCode) => {
    setCode(generatedCode);
    setActiveTab('run');
    // Don't clear practice challenges
  };

  const clearResults = () => {
    setResult(null);
    setError('');
    setPracticeChallenges(null);
  };

  const activeTabData = TABS.find(t => t.id === activeTab);
  const currentLang = LANGUAGES.find(l => l.id === language);

  // ==========================================
  // RENDER SECTIONS
  // ==========================================

  const renderEditor = () => (
    <motion.div
      key="editor-container"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm flex flex-col"
    >
      {/* Editor Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-md border border-gray-200 shadow-sm">
            <FileCode2 className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
              main.{currentLang?.extension || 'txt'}
            </span>
          </div>
          <span className="text-xs text-gray-400">|</span>
          <span className="text-xs text-gray-500">{currentLang?.label}</span>
        </div>
        <div className="flex items-center gap-1">
          <Tooltip text="Reset Code">
            <button 
              onClick={() => {
                const template = DEFAULT_TEMPLATES[language] || '';
                setCode(template);
              }}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </Tooltip>
          <Tooltip text="Copy Code">
            <button 
              onClick={() => navigator.clipboard.writeText(code)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <Copy className="w-4 h-4" />
            </button>
          </Tooltip>
          <Tooltip text="Download">
            <button 
              onClick={() => {
                const blob = new Blob([code], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `main.${currentLang?.extension || 'txt'}`;
                a.click();
              }}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <Download className="w-4 h-4" />
            </button>
          </Tooltip>
          {(result || error || practiceChallenges) && (
            <Tooltip text="Clear All Results">
              <button 
                onClick={clearResults}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </Tooltip>
          )}
          <Tooltip text="Settings">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg transition-all ${showSettings ? 'bg-gray-200 text-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
            >
              <Settings className="w-4 h-4" />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-6 overflow-hidden"
          >
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-600">Font Size</span>
              <input
                type="range"
                min="12"
                max="20"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-24 accent-blue-600"
              />
              <span className="text-xs text-gray-500 w-4">{fontSize}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Monaco Editor */}
      <div className="bg-[#1e1e1e]" style={{ height: '450px' }}>
        <Editor
          height="100%"
          language={currentLang?.monacoLang || 'plaintext'}
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={(editor, monaco) => { 
            editorRef.current = editor;
            editor.layout();
            editor.focus();
          }}
          theme="vs-dark"
          options={{
            minimap: { enabled: true, scale: 1 },
            fontSize: fontSize,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            padding: { top: 16, bottom: 16 },
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            automaticLayout: true,
            folding: true,
            bracketPairColorization: { enabled: true },
            formatOnPaste: true,
            suggest: {
              showKeywords: true,
              showSnippets: true,
            },
          }}
        />
      </div>

      {/* Action Bar */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <Button
          onClick={handlePrimaryAction}
          loading={loading}
          icon={activeTabData?.icon}
          variant="accent"
          style={{ backgroundColor: activeTabData?.accent }}
        >
          {loading ? 'Processing...' : activeTabData?.label}
        </Button>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <button 
            onClick={() => setShowShortcuts(true)}
            className="hidden sm:flex items-center gap-1.5 hover:text-gray-600 transition-colors"
          >
            <Keyboard className="w-3.5 h-3.5" />
            Shortcuts
          </button>
          <span className="w-px h-3 bg-gray-300 hidden sm:block" />
          <span>{code.split('\n').length} lines</span>
          <span className="w-px h-3 bg-gray-300" />
          <span>{code.length.toLocaleString()} chars</span>
        </div>
      </div>
    </motion.div>
  );

  const renderGenerateTab = () => (
    <motion.div
      key="generate"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
    >
      <Card title="AI Code Generation" icon={Sparkles} accent="#6366f1">
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg p-4 flex items-start gap-3">
            <Zap className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-indigo-900">Describe your requirements</h4>
              <p className="text-sm text-indigo-700 mt-1">
                Be specific about functionality, inputs/outputs, and constraints.
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Prompt</label>
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder='E.g., "Create a function that finds the longest palindromic substring..."'
              className="w-full px-4 py-3 rounded-lg text-sm bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-y min-h-[160px]"
            />
          </div>

          <Button 
            onClick={handleGenerateCode} 
            loading={loading} 
            variant="accent" 
            size="lg" 
            icon={Wand2}
            className="w-full"
            style={{ backgroundColor: '#6366f1' }}
            disabled={!instruction.trim()}
          >
            {loading ? 'Generating with AI...' : 'Generate Code'}
          </Button>
        </div>
      </Card>
    </motion.div>
  );

  const renderInterviewSetup = () => (
    <motion.div
      key="interview-setup"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card title="Mock Interview Setup" icon={Trophy} accent="#4e57d5">
        <div className="space-y-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            Practice coding interviews with AI-generated problems.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Difficulty</label>
              <div className="grid grid-cols-3 gap-2">
                {['beginner', 'medium', 'advanced'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setInterviewData({ ...interviewData, difficulty: diff })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                      interviewData.difficulty === diff
                        ? 'bg-green-50 border-green-200 text-green-700 shadow-sm'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</label>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <input
                  type="range"
                  min="15"
                  max="90"
                  step="15"
                  value={interviewData.duration}
                  onChange={(e) => setInterviewData({ ...interviewData, duration: parseInt(e.target.value) })}
                  className="flex-1 accent-green-600"
                />
                <span className="text-sm font-medium text-gray-700 w-12">{interviewData.duration}m</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={startInterview} 
            loading={loading} 
             variant="primary"
            size="lg" 
            icon={Play}
            className="w-full"
          >
            Start Interview Session
          </Button>
        </div>
      </Card>
    </motion.div>
  );

  const renderInterviewActive = () => {
    if (!interviewSession) return null;
    
    let problem;
    try {
      problem = typeof interviewSession.interview_problem === 'string' 
        ? JSON.parse(interviewSession.interview_problem) 
        : interviewSession.interview_problem;
    } catch {
      problem = { description: interviewSession.interview_problem };
    }

    const isTimeLow = timeRemaining < 300;

    return (
      <div className="space-y-4">
        {/* Timer Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-4 flex items-center justify-between border ${
            isTimeLow ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isTimeLow ? 'bg-red-100' : 'bg-gray-100'}`}>
              <Clock className={`w-5 h-5 ${isTimeLow ? 'text-red-600 animate-pulse' : 'text-gray-600'}`} />
            </div>
            <div>
              <span className={`font-mono text-2xl font-bold ${isTimeLow ? 'text-red-600' : 'text-gray-900'}`}>
                {formatTime(timeRemaining)}
              </span>
              <p className="text-xs text-gray-500">remaining</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DifficultyBadge level={interviewSession.interview_difficulty} />
            <button 
              onClick={() => setInterviewSession(null)} 
              className="text-xs text-red-600 hover:text-red-700 font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors"
            >
              End Session
            </button>
          </div>
        </motion.div>

        {/* Problem Card */}
        <Card title={problem.title || 'Coding Challenge'} icon={Code} accent="#ef4444" collapsible>
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{problem.description}</p>
            </div>
            
            {problem.examples && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
                <h4 className="text-xs font-semibold text-gray-500 uppercase">Example</h4>
                {problem.examples.map((ex, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="text-xs text-gray-500 font-medium">Input:</div>
                    <code className="text-xs bg-white px-3 py-2 rounded border block font-mono text-gray-700">{ex.input}</code>
                    <div className="text-xs text-gray-500 font-medium mt-2">Output:</div>
                    <code className="text-xs bg-white px-3 py-2 rounded border block font-mono text-emerald-600">{ex.output}</code>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Solution Editor */}
        <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#1e1e1e] shadow-lg">
          <div className="px-4 py-3 bg-[#252526] border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-green-400" />
              <span className="text-xs font-medium text-gray-300">Your Solution</span>
            </div>
            <span className="text-xs text-gray-500 font-mono">{currentLang?.extension}</span>
          </div>
          <Editor
            height="380px"
            language={currentLang?.monacoLang || 'plaintext'}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{ 
              minimap: { enabled: false }, 
              fontSize: 14, 
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={submitInterview} loading={loading} variant="success" size="lg" icon={CheckCircle2} className="flex-1">
            Submit Solution
          </Button>
          <Button onClick={() => { setInterviewSession(null); setTimeRemaining(null); }} variant="secondary" icon={XCircle}>
            Quit
          </Button>
        </div>
      </div>
    );
  };

  const renderContentArea = () => {
    switch (activeTab) {
      case 'generate':
        return renderGenerateTab();
      case 'interview':
        return interviewSession ? renderInterviewActive() : renderInterviewSetup();
      default:
        return renderEditor();
    }
  };

   const renderResults = () => {
    // Use practiceChallenges from state if available, otherwise from result
    const currentPracticeChallenges = practiceChallenges || result?.practice_challenge;
    
    // Don't return early - check if we have ANY result data or practice challenges
    const hasResultData = result && (result.sandbox_output !== undefined || result.sandbox_error !== undefined || result.review || result.explanation || result.generated_code || result.animation_trace || result.interview_score !== undefined);
    
    if (!hasResultData && !currentPracticeChallenges) return null;
    if (loading) return null;

    const copyToClipboard = (text) => navigator.clipboard.writeText(text);

    switch (activeTab) {
      case 'run':
        return (
          <div className="space-y-4">
            {/* Show run output if we have it */}
            {(result?.sandbox_output !== undefined || result?.sandbox_error !== undefined) && (
              <CodeOutput output={result?.sandbox_output} error={result?.sandbox_error} executionTime={executionTime} />
            )}
            
            {/* Show practice challenges if available */}
            {currentPracticeChallenges && (
              <Card title="Practice Challenges" icon={Zap} accent="#f59e0b" collapsible defaultCollapsed={true}>
                {/* ... practice challenges rendering code ... */}
                {/* Use the same parsing and rendering logic from explain case */}
                {(() => {
                  const parseQuestions = (text) => {
                    if (!text) return [];
                    const questions = [];
                    const blocks = text.split(/=== QUESTION START ===/);
                    
                    blocks.forEach(block => {
                      if (!block.trim()) return;
                      const cleanBlock = block.replace(/=== QUESTION END ===/g, '').trim();
                      
                      const question = {
                        title: cleanBlock.match(/Title:\s*(.+)/)?.[1] || 'Practice Challenge',
                        difficulty: cleanBlock.match(/Difficulty:\s*(.+)/)?.[1] || 'medium',
                        topics: cleanBlock.match(/Topics:\s*(.+)/)?.[1]?.split(',').map(t => t.trim()) || [],
                        problem: cleanBlock.match(/Problem:\s*([\s\S]+?)(?=Examples:|Constraints:|SuggestedTimeMinutes:|$)/)?.[1]?.trim(),
                        examples: [],
                        constraints: [],
                        suggestedTime: cleanBlock.match(/SuggestedTimeMinutes:\s*(\d+)/)?.[1]
                      };
                      
                      const examplesMatch = cleanBlock.match(/Examples:\s*([\s\S]+?)(?=Constraints:|SuggestedTimeMinutes:|$)/);
                      if (examplesMatch) {
                        const exampleLines = examplesMatch[1].trim().split(/\n/).filter(l => l.trim());
                        let currentExample = {};
                        exampleLines.forEach(line => {
                          if (/^\d+\)/.test(line.trim())) {
                            if (currentExample.input) question.examples.push(currentExample);
                            currentExample = { number: line.match(/^(\d+)\)/)?.[1] };
                          } else if (line.toLowerCase().includes('input:')) {
                            currentExample.input = line.replace(/input:/i, '').trim();
                          } else if (line.toLowerCase().includes('output:')) {
                            currentExample.output = line.replace(/output:/i, '').trim();
                          }
                        });
                        if (currentExample.input) question.examples.push(currentExample);
                      }
                      
                      const constraintsMatch = cleanBlock.match(/Constraints:\s*([\s\S]+?)(?=SuggestedTimeMinutes:|$)/);
                      if (constraintsMatch) {
                        question.constraints = constraintsMatch[1]
                          .trim()
                          .split('\n')
                          .map(l => l.replace(/^[-•]\s*/, '').trim())
                          .filter(l => l);
                      }
                      
                      questions.push(question);
                    });
                    
                    return questions;
                  };

                  const questions = parseQuestions(currentPracticeChallenges);

                  if (questions.length === 0) {
                    return (
                      <pre className="text-sm text-amber-800 whitespace-pre-wrap font-mono bg-white/50 p-3 rounded-lg">
                        {currentPracticeChallenges}
                      </pre>
                    );
                  }

                  return (
                    <div className="space-y-4">
                      {questions.map((q, idx) => (
                        <div 
                          key={idx} 
                          className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-4 border-b border-amber-100">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-bold">
                                    {idx + 1}
                                  </span>
                                  <h4 className="text-base font-bold text-gray-900">{q.title}</h4>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <DifficultyBadge level={q.difficulty} />
                                  {q.suggestedTime && (
                                    <span className="px-2 py-0.5 bg-white rounded text-xs text-gray-600 border border-gray-200 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {q.suggestedTime} min
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {q.topics.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {q.topics.map((topic, tidx) => (
                                  <span 
                                    key={tidx} 
                                    className="px-2 py-0.5 bg-white/80 rounded text-xs text-gray-600 border border-amber-200"
                                  >
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="p-5 space-y-4">
                            <div>
                              <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Problem</h5>
                              <p className="text-sm text-gray-700 leading-relaxed">{q.problem}</p>
                            </div>
                            
                            {q.examples.length > 0 && (
                              <div>
                                <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Examples</h5>
                                <div className="space-y-2">
                                  {q.examples.map((ex, eidx) => (
                                    <div key={eidx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                      <div className="text-xs text-gray-500 mb-1">Example {ex.number}</div>
                                      <div className="space-y-1">
                                        {ex.input && (
                                          <div className="flex items-start gap-2">
                                            <span className="text-xs font-medium text-gray-500 w-12 shrink-0">Input:</span>
                                            <code className="text-sm text-gray-800 font-mono">{ex.input}</code>
                                          </div>
                                        )}
                                        {ex.output && (
                                          <div className="flex items-start gap-2">
                                            <span className="text-xs font-medium text-gray-500 w-12 shrink-0">Output:</span>
                                            <code className="text-sm text-emerald-700 font-mono">{ex.output}</code>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {q.constraints.length > 0 && (
                              <div>
                                <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Constraints</h5>
                                <ul className="space-y-1">
                                  {q.constraints.map((c, cidx) => (
                                    <li key={cidx} className="flex items-start gap-2 text-sm text-gray-600">
                                      <span className="text-gray-400 mt-1">•</span>
                                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{c}</code>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          
                          <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                            <span className="text-xs text-gray-500">Try solving this challenge!</span>
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => {
                                setCode(`# ${q.title}\n# Difficulty: ${q.difficulty}\n\n# TODO: Implement your solution here\n\ndef solution():\n    pass\n\n# Test your solution\nif __name__ == "__main__":\n    solution()`);
                              }}
                            >
                              Load Template
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </Card>
            )}
          </div>
        );
      }
    

    switch (activeTab) {
            case 'run':
        return (
          <div className="space-y-4">
            {/* Always show run output if we have result with sandbox data */}
            {result && (result.sandbox_output !== undefined || result.sandbox_error !== undefined) && (
              <CodeOutput output={result.sandbox_output} error={result.sandbox_error} executionTime={executionTime} />
            )}
            
            {/* Show practice challenges in run tab too */}
            {currentPracticeChallenges && (
              <Card title="Practice Challenges" icon={Zap} accent="#f59e0b" collapsible defaultCollapsed={true}>
                {/* ... render challenges ... */}
              </Card>
            )}
          </div>
        );

      case 'review':
        return (
          <div className="space-y-4">
            <Card title="Code Review Analysis" icon={Search} accent="#3b82f6" collapsible>
              <div className="space-y-6">
                {(result?.review || '').split('\n').map((line, idx) => {
                  if (line.startsWith('# ')) {
                    return (
                      <h1 key={idx} className="text-2xl font-bold text-gray-900 mt-4 mb-4 pb-3 border-b-2 border-blue-100">
                        {line.replace('# ', '')}
                      </h1>
                    );
                  }
                  if (line.startsWith('## ')) {
                    return (
                      <h2 key={idx} className="text-lg font-bold text-gray-800 mt-5 mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                        {line.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (line.startsWith('### ')) {
                    return (
                      <h3 key={idx} className="text-base font-semibold text-gray-700 mt-4 mb-2 flex items-center gap-2">
                        <div className="w-1 h-4 bg-blue-400 rounded-full" />
                        {line.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (line.trim() === '') {
                    return <div key={idx} className="h-2" />;
                  }
                  if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
                    const content = line.replace(/^[\s]*[-•]\s*/, '');
                    const icon = content.toLowerCase().includes('error') || content.toLowerCase().includes('bug') ? <XCircle className="w-4 h-4 text-red-500" />
                      : content.toLowerCase().includes('warning') || content.toLowerCase().includes('caution') ? <AlertCircle className="w-4 h-4 text-amber-500" />
                      : content.toLowerCase().includes('good') || content.toLowerCase().includes('excellent') || content.toLowerCase().includes('✓') ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      : <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2" />;
                    
                    return (
                      <div key={idx} className="flex items-start gap-3 ml-4 mb-2">
                        <div className="shrink-0 mt-0.5">{icon}</div>
                        <p className="text-gray-600 leading-relaxed">
                          {content
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
                            .replace(/`([^`]+)`/g, '<code class="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono border border-blue-100">$1</code>')
                            .split(/(<[^>]+>[^<]*<\/[^>]+>)/g)
                            .map((part, i) => 
                              part.startsWith('<') ? (
                                <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
                              ) : (
                                part
                              )
                            )
                          }
                        </p>
                      </div>
                    );
                  }
                  if (/^\d+[\.\)]/.test(line.trim())) {
                    const match = line.match(/^(\d+)[\.\)]\s*(.*)/);
                    if (match) {
                      return (
                        <div key={idx} className="flex items-start gap-3 ml-4 mb-2">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
                            {match[1]}
                          </span>
                          <p className="text-gray-600 leading-relaxed">
                            {match[2]
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
                              .replace(/`([^`]+)`/g, '<code class="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono border border-blue-100">$1</code>')
                              .split(/(<[^>]+>[^<]*<\/[^>]+>)/g)
                              .map((part, i) => 
                                part.startsWith('<') ? (
                                  <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
                                ) : (
                                  part
                                )
                              )
                            }
                          </p>
                        </div>
                      );
                    }
                  }
                  return (
                    <p key={idx} className="text-gray-600 leading-relaxed mb-3">
                      {line
                        .replace(/\*\*\*(.*?)\*\*\*/g, '___$1___')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em class="text-gray-700">$1</em>')
                        .replace(/___(.*?)___/g, '<strong><em>$1</em></strong>')
                        .replace(/`([^`]+)`/g, '<code class="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono border border-blue-100">$1</code>')
                        .replace(/\[(\d+)\]/g, '<sup class="text-xs text-gray-400 ml-0.5">[$1]</sup>')
                        .split(/(<[^>]+>[^<]*<\/[^>]+>)/g)
                        .map((part, i) => 
                          part.startsWith('<') ? (
                            <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
                          ) : (
                            part
                          )
                        )
                      }
                    </p>
                  );
                })}
              </div>
            </Card>
            
            {result?.practice_challenge && (
              <Card >
                <div className="space-y-3">
                  {result.practice_challenge.split('\n').map((line, idx) => {
                    if (line.trim() === '') return null;
                    
                    if (/^(\d+[\.\)]|🎯|💡|✅|⚠️|🔍|📝)/.test(line.trim())) {
                      const cleanLine = line.replace(/^(\d+[\.\)]|🎯|💡|✅|⚠️|🔍|📝)\s*/, '');
                      const num = line.match(/^(\d+)/)?.[1];
                      return (
                        <div key={idx} className="flex items-start gap-3 mt-4 first:mt-0">
                          <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold shrink-0">
                            {num || '•'}
                          </span>
                          <p className="text-sm text-gray-800 font-semibold">
                            {cleanLine
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')
                              .split(/(<[^>]+>[^<]*<\/[^>]+>)/g)
                              .map((part, i) => 
                                part.startsWith('<') ? (
                                  <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
                                ) : (
                                  part
                                )
                              )
                            }
                          </p>
                        </div>
                      );
                    }
                    
                    if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
                      return (
                        <div key={idx} className="flex items-start gap-2 ml-10">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {line.replace(/^[\s]*[-•]\s*/, '')
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-800">$1</strong>')
                              .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-700 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
                              .split(/(<[^>]+>[^<]*<\/[^>]+>)/g)
                              .map((part, i) => 
                                part.startsWith('<') ? (
                                  <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
                                ) : (
                                  part
                                )
                              )
                            }
                          </p>
                        </div>
                      );
                    }
                    
                    return (
                      <p key={idx} className="text-sm text-gray-600 ml-10 leading-relaxed">
                        {line
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-800">$1</strong>')
                          .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-700 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
                          .split(/(<[^>]+>[^<]*<\/[^>]+>)/g)
                          .map((part, i) => 
                            part.startsWith('<') ? (
                              <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
                            ) : (
                              part
                            )
                          )
                        }
                      </p>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>
        );

      case 'explain':
        const parseQuestions = (text) => {
          if (!text) return [];
          const questions = [];
          const blocks = text.split(/=== QUESTION START ===/);
          
          blocks.forEach(block => {
            if (!block.trim()) return;
            const cleanBlock = block.replace(/=== QUESTION END ===/g, '').trim();
            
            const question = {
              title: cleanBlock.match(/Title:\s*(.+)/)?.[1] || 'Practice Challenge',
              difficulty: cleanBlock.match(/Difficulty:\s*(.+)/)?.[1] || 'medium',
              topics: cleanBlock.match(/Topics:\s*(.+)/)?.[1]?.split(',').map(t => t.trim()) || [],
              problem: cleanBlock.match(/Problem:\s*([\s\S]+?)(?=Examples:|Constraints:|SuggestedTimeMinutes:|$)/)?.[1]?.trim(),
              examples: [],
              constraints: [],
              suggestedTime: cleanBlock.match(/SuggestedTimeMinutes:\s*(\d+)/)?.[1]
            };
            
            const examplesMatch = cleanBlock.match(/Examples:\s*([\s\S]+?)(?=Constraints:|SuggestedTimeMinutes:|$)/);
            if (examplesMatch) {
              const exampleLines = examplesMatch[1].trim().split(/\n/).filter(l => l.trim());
              let currentExample = {};
              exampleLines.forEach(line => {
                if (/^\d+\)/.test(line.trim())) {
                  if (currentExample.input) question.examples.push(currentExample);
                  currentExample = { number: line.match(/^(\d+)\)/)?.[1] };
                } else if (line.toLowerCase().includes('input:')) {
                  currentExample.input = line.replace(/input:/i, '').trim();
                } else if (line.toLowerCase().includes('output:')) {
                  currentExample.output = line.replace(/output:/i, '').trim();
                }
              });
              if (currentExample.input) question.examples.push(currentExample);
            }
            
            const constraintsMatch = cleanBlock.match(/Constraints:\s*([\s\S]+?)(?=SuggestedTimeMinutes:|$)/);
            if (constraintsMatch) {
              question.constraints = constraintsMatch[1]
                .trim()
                .split('\n')
                .map(l => l.replace(/^[-•]\s*/, '').trim())
                .filter(l => l);
            }
            
            questions.push(question);
          });
          
          return questions;
        };

        const questions = parseQuestions(currentPracticeChallenges || result?.practice_challenge);

        return (
          <Card title="Code Explanation" icon={BookOpen} accent="#8b5cf6">
            <div className="space-y-6">
              <div className="prose prose-sm max-w-none">
                {(result?.explanation || '').split('\n').map((line, idx) => {
                  if (line.startsWith('# ')) {
                    return (
                      <h1 key={idx} className="text-2xl font-bold text-gray-900 mt-6 mb-4 pb-2 border-b border-gray-200">
                        {line.replace('# ', '')}
                      </h1>
                    );
                  }
                  if (line.startsWith('## ')) {
                    return (
                      <h2 key={idx} className="text-lg font-bold text-gray-800 mt-5 mb-3 flex items-center gap-2">
                        <div className="w-1 h-5 bg-purple-500 rounded-full" />
                        {line.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (line.startsWith('### ')) {
                    return (
                      <h3 key={idx} className="text-base font-semibold text-gray-700 mt-4 mb-2">
                        {line.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (line.trim() === '') {
                    return <div key={idx} className="h-2" />;
                  }
                  return (
                    <p key={idx} className="text-gray-600 leading-relaxed mb-3">
                      {line
                        .replace(/\*\*\*(.*?)\*\*\*/g, '___$1___')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em class="text-gray-700">$1</em>')
                        .replace(/___(.*?)___/g, '<strong><em>$1</em></strong>')
                        .replace(/`([^`]+)`/g, '<code class="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded text-sm font-mono border border-purple-100">$1</code>')
                        .replace(/\[(\d+)\]/g, '<sup class="text-xs text-gray-400 ml-0.5">[$1]</sup>')
                        .split(/(<[^>]+>[^<]*<\/[^>]+>)/g)
                        .map((part, i) => 
                          part.startsWith('<') ? (
                            <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
                          ) : (
                            part
                          )
                        )
                      }
                    </p>
                  );
                })}
              </div>

              {questions.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                      Practice Challenges ({questions.length})
                    </h3>
                  </div>
                  
                  {questions.map((q, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-4 border-b border-amber-100">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-bold">
                                {idx + 1}
                              </span>
                              <h4 className="text-base font-bold text-gray-900">{q.title}</h4>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <DifficultyBadge level={q.difficulty} />
                              {q.suggestedTime && (
                                <span className="px-2 py-0.5 bg-white rounded text-xs text-gray-600 border border-gray-200 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {q.suggestedTime} min
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {q.topics.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {q.topics.map((topic, tidx) => (
                              <span 
                                key={tidx} 
                                className="px-2 py-0.5 bg-white/80 rounded text-xs text-gray-600 border border-amber-200"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-5 space-y-4">
                        <div>
                          <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Problem</h5>
                          <p className="text-sm text-gray-700 leading-relaxed">{q.problem}</p>
                        </div>
                        
                        {q.examples.length > 0 && (
                          <div>
                            <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Examples</h5>
                            <div className="space-y-2">
                              {q.examples.map((ex, eidx) => (
                                <div key={eidx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                  <div className="text-xs text-gray-500 mb-1">Example {ex.number}</div>
                                  <div className="space-y-1">
                                    {ex.input && (
                                      <div className="flex items-start gap-2">
                                        <span className="text-xs font-medium text-gray-500 w-12 shrink-0">Input:</span>
                                        <code className="text-sm text-gray-800 font-mono">{ex.input}</code>
                                      </div>
                                    )}
                                    {ex.output && (
                                      <div className="flex items-start gap-2">
                                        <span className="text-xs font-medium text-gray-500 w-12 shrink-0">Output:</span>
                                        <code className="text-sm text-emerald-700 font-mono">{ex.output}</code>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {q.constraints.length > 0 && (
                          <div>
                            <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Constraints</h5>
                            <ul className="space-y-1">
                              {q.constraints.map((c, cidx) => (
                                <li key={cidx} className="flex items-start gap-2 text-sm text-gray-600">
                                  <span className="text-gray-400 mt-1">•</span>
                                  <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{c}</code>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                        <span className="text-xs text-gray-500">Try solving this challenge!</span>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => {
                            setCode(`# ${q.title}\n# Difficulty: ${q.difficulty}\n\n# TODO: Implement your solution here\n\ndef solution():\n    pass\n\n# Test your solution\nif __name__ == "__main__":\n    solution()`);
                            // Use smart tab switch to preserve results
                            handleTabSwitch('run');
                          }}
                        >
                          Start Coding
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {!questions.length && (currentPracticeChallenges || result?.practice_challenge) && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
                  <h4 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-600" />
                    Practice Challenges
                  </h4>
                  <pre className="text-sm text-amber-800 whitespace-pre-wrap font-mono bg-white/50 p-3 rounded-lg">
                    {currentPracticeChallenges || result?.practice_challenge}
                  </pre>
                </div>
              )}
            </div>
          </Card>
        );

      case 'generate':
        const generatedCode = result?.generated_code || result?.code || '';
        return (
          <Card 
            title="Generated Code" 
            icon={Code}
            accent="#6366f1"
            headerAction={
              <Button size="sm" variant="secondary" icon={Copy} onClick={() => copyToClipboard(generatedCode)}>
                Copy
              </Button>
            }
          >
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-xs text-gray-400 font-mono">generated.{currentLang?.extension}</span>
                <span className="text-xs text-gray-500">{generatedCode.split('\n').length} lines</span>
              </div>
              <pre className="p-4 text-sm font-mono text-green-400 overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto">
                {generatedCode || '// No code generated'}
              </pre>
            </div>
            <div className="mt-4 flex gap-2">
              <Button 
                size="sm" 
                variant="secondary"
                icon={Code}
                onClick={() => handleLoadInEditor(generatedCode)}
              >
                Load in Editor
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                icon={Download}
                onClick={() => {
                  const blob = new Blob([generatedCode], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `generated.${currentLang?.extension}`;
                  a.click();
                }}
              >
                Download
              </Button>
            </div>
          </Card>
        );

      case 'animate':
        let trace = null;
        try {
          let raw = result?.animation_trace;
          if (typeof raw === 'string') {
            raw = raw.replace(/```json/g, '').replace(/```/g, '').trim();
            trace = JSON.parse(raw);
          } else {
            trace = raw;
          }
        } catch (e) {
          console.error('Failed to parse animation trace:', e);
        }

        return (
          <Card title="Execution Visualization" icon={Film} accent="#f59e0b">
            {trace ? <AnimationPlayer trace={trace} editorRef={editorRef} /> : <div className="text-center py-8 text-gray-500">No animation data available</div>}
          </Card>
        );

     case 'interview':
  if (result?.interview_score !== undefined) {
    const score = result.interview_score;
    
    const getGrade = (s) => {
      if (s >= 90) return { 
        label: 'Outstanding', 
        color: 'emerald', 
        bg: 'bg-emerald-50', 
        border: 'border-emerald-200',
        text: 'text-emerald-800',
        accent: '#10b981',
        icon: Trophy
      };
      if (s >= 80) return { 
        label: 'Strong Hire', 
        color: 'blue', 
        bg: 'bg-blue-50', 
        border: 'border-blue-200',
        text: 'text-blue-800',
        accent: '#3b82f6',
        icon: CheckCircle2
      };
      if (s >= 70) return { 
        label: 'Hire', 
        color: 'cyan', 
        bg: 'bg-cyan-50', 
        border: 'border-cyan-200',
        text: 'text-cyan-800',
        accent: '#06b6d4',
        icon: CheckCircle2
      };
      if (s >= 60) return { 
        label: 'Leaning Hire', 
        color: 'amber', 
        bg: 'bg-amber-50', 
        border: 'border-amber-200',
        text: 'text-amber-800',
        accent: '#f59e0b',
        icon: AlertCircle
      };
      if (s >= 50) return { 
        label: 'Borderline', 
        color: 'orange', 
        bg: 'bg-orange-50', 
        border: 'border-orange-200',
        text: 'text-orange-800',
        accent: '#f97316',
        icon: AlertCircle
      };
      return { 
        label: 'Needs Improvement', 
        color: 'rose', 
        bg: 'bg-rose-50', 
        border: 'border-rose-200',
        text: 'text-rose-800',
        accent: '#f43f5e',
        icon: XCircle
      };
    };

    const grade = getGrade(score);
    const GradeIcon = grade.icon;

    // Parse markdown feedback into structured sections
    const parseMarkdownFeedback = (text) => {
      if (!text) return [];
      
      const sections = [];
      const lines = text.split('\n');
      let currentSection = null;
      let currentContent = [];
      
      const flushSection = () => {
        if (currentSection) {
          sections.push({
            title: currentSection.title,
            level: currentSection.level,
            content: currentContent
          });
          currentContent = [];
        }
      };
      
      lines.forEach(line => {
        const trimmed = line.trim();
        
        // Header detection (### or ## or #)
        if (trimmed.match(/^#{1,4}\s+/)) {
          flushSection();
          const level = trimmed.match(/^#+/)[0].length;
          const title = trimmed.replace(/^#+\s+/, '');
          currentSection = { title, level };
        }
        // Bullet points
        else if (trimmed.match(/^[-•]\s+/) || trimmed.match(/^\*\s+/)) {
          const content = trimmed.replace(/^[-•*]\s+/, '');
          // Parse bold text **text**
          const parsedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          currentContent.push({ type: 'bullet', content: parsedContent });
        }
        // Numbered lists
        else if (trimmed.match(/^\d+[.)]\s+/)) {
          const content = trimmed.replace(/^\d+[.)]\s+/, '');
          const parsedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          currentContent.push({ type: 'number', content: parsedContent });
        }
        // Regular text (non-empty)
        else if (trimmed) {
          const parsedContent = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          currentContent.push({ type: 'text', content: parsedContent });
        }
      });
      
      flushSection();
      return sections;
    };

    const feedbackSections = parseMarkdownFeedback(result.review);

    return (
      <div className="space-y-4">
        {/* Score Header */}
        <div className={`${grade.bg} ${grade.border} border-2 rounded-2xl p-6 text-center relative overflow-hidden`}>
          <div className="relative z-10">
            <div className="relative inline-flex items-center justify-center mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-white/60" />
                <circle 
                  cx="64" 
                  cy="64" 
                  r="56" 
                  stroke={grade.accent} 
                  strokeWidth="8" 
                  fill="none" 
                  strokeDasharray={`${(score / 100) * 351.86} 351.86`} 
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className={`text-4xl font-bold ${grade.text} block`}>{score}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">/ 100</span>
              </div>
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-2 ${grade.bg} ${grade.text} border ${grade.border}`}>
              <GradeIcon className="w-4 h-4" />
              {grade.label}
            </div>
          </div>
        </div>

        {/* Structured Feedback Sections */}
        <div className="space-y-4">
          {feedbackSections.map((section, idx) => {
            // Determine accent color based on section title
            const titleLower = section.title.toLowerCase();
            let accent = '#3b82f6'; // default blue
            let bgColor = 'bg-blue-50';
            let borderColor = 'border-blue-200';
            let Icon = BookOpen;
            
            if (titleLower.includes('summary') || titleLower.includes('approach')) {
              accent = '#3b82f6';
              bgColor = 'bg-blue-50';
              borderColor = 'border-blue-200';
              Icon = BookOpen;
            } else if (titleLower.includes('correctness') || titleLower.includes('issue') || titleLower.includes('error')) {
              accent = '#ef4444';
              bgColor = 'bg-red-50';
              borderColor = 'border-red-200';
              Icon = XCircle;
            } else if (titleLower.includes('complexity') || titleLower.includes('time') || titleLower.includes('space')) {
              accent = '#8b5cf6';
              bgColor = 'bg-purple-50';
              borderColor = 'border-purple-200';
              Icon = Zap;
            } else if (titleLower.includes('improvement') || titleLower.includes('suggest')) {
              accent = '#f59e0b';
              bgColor = 'bg-amber-50';
              borderColor = 'border-amber-200';
              Icon = Lightbulb;
            } else if (titleLower.includes('strength') || titleLower.includes('good')) {
              accent = '#10b981';
              bgColor = 'bg-emerald-50';
              borderColor = 'border-emerald-200';
              Icon = CheckCircle2;
            }

            return (
              <div key={idx} className={`${bgColor} ${borderColor} border rounded-xl overflow-hidden`}>
                {/* Section Header */}
                <div className="px-4 py-3 border-b border-inherit border-opacity-50 flex items-center gap-2">
                  <Icon className="w-4 h-4" style={{ color: accent }} />
                  <h3 className="font-bold text-sm" style={{ color: accent }}>
                    {section.title}
                  </h3>
                </div>
                
                {/* Section Content */}
                <div className="p-4 space-y-2">
                  {section.content.map((item, cidx) => {
                    if (item.type === 'bullet') {
                      return (
                        <div key={cidx} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: accent }}></span>
                          <p 
                            className="text-sm text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        </div>
                      );
                    } else if (item.type === 'number') {
                      return (
                        <div key={cidx} className="flex items-start gap-3">
                          <span 
                            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white"
                            style={{ backgroundColor: accent }}
                          >
                            {cidx + 1}
                          </span>
                          <p 
                            className="text-sm text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <p 
                          key={cidx} 
                          className="text-sm text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>

        

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button 
            variant="secondary" 
            className="flex-1"
            icon={RotateCcw}
            onClick={() => { 
              setResult(null); 
              setInterviewSession(null);
              setCode(DEFAULT_TEMPLATES[language] || '');
            }}
          >
            New Interview
          </Button>
          
        </div>
      </div>
    );
  }
  return null;
    }
  };

  const renderShortcutsModal = () => (
    <AnimatePresence>
      {showShortcuts && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowShortcuts(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Keyboard className="w-5 h-5" />
                Keyboard Shortcuts
              </h3>
              <button onClick={() => setShowShortcuts(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { keys: ['Ctrl', 'Enter'], action: 'Execute current action' },
                { keys: ['Ctrl', 'B'], action: 'Toggle sidebar' },
              ].map((shortcut, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-600">{shortcut.action}</span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, i) => (
                      <React.Fragment key={i}>
                        <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono font-semibold text-gray-700">{key}</kbd>
                        {i < shortcut.keys.length - 1 && <span className="text-gray-400">+</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 tracking-tight">CodeMentor</h1>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">AI-Powered Development</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded font-mono text-gray-600">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded font-mono text-gray-600">Enter</kbd>
              <span className="ml-1 text-gray-500">to execute</span>
            </div>
            <button onClick={() => setShowShortcuts(true)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Keyboard className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 max-w-[1600px] mx-auto w-full flex overflow-hidden">
        
        {/* Sidebar */}
        <motion.aside 
          initial={false}
          animate={{ width: sidebarCollapsed ? 80 : 280 }}
          className="hidden lg:flex flex-col bg-white border-r border-gray-200 shrink-0 z-30"
        >
          <div className="p-4 space-y-6 overflow-y-auto flex-1">
            <div className="space-y-1">
              {!sidebarCollapsed && <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">Actions</p>}
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabSwitch(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'shadow-sm' : 'hover:bg-gray-50 text-gray-600'}`}
                    style={{ backgroundColor: isActive ? `${tab.accent}15` : 'transparent', color: isActive ? tab.accent : undefined, border: isActive ? `1px solid ${tab.accent}30` : '1px solid transparent' }}
                    title={sidebarCollapsed ? tab.label : undefined}
                  >
                    <Icon className="w-5 h-5 shrink-0" style={{ color: isActive ? tab.accent : undefined }} />
                    {!sidebarCollapsed && <><span className="flex-1 text-left">{tab.label}</span>{isActive && <ChevronRight className="w-4 h-4 opacity-50" />}</>}
                    {isActive && !sidebarCollapsed && <motion.div layoutId="activeTab" className="absolute left-0 w-1 h-6 rounded-r-full" style={{ backgroundColor: tab.accent }} />}
                  </button>
                );
              })}
            </div>

            <div className="mx-3 h-px bg-gray-200" />

            <div className="space-y-1">
              {!sidebarCollapsed && <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">Language</p>}
              <div className="space-y-0.5">
                {LANGUAGES.map((lang) => {
                  const isSelected = language === lang.id;
                  return (
                    <button
                      key={lang.id}
                      onClick={() => setLanguage(lang.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${isSelected ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      title={sidebarCollapsed ? lang.label : undefined}
                    >
                      <span className="text-base shrink-0">{lang.icon}</span>
                      {!sidebarCollapsed && <span className="font-mono text-xs">{lang.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="w-full flex items-center justify-center p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>
        </motion.aside>

        {/* Mobile Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-2 py-2 pb-safe shadow-lg">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabSwitch(tab.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg min-w-[64px] transition-all ${isActive ? 'bg-gray-100' : 'text-gray-500'}`}
                  style={{ color: isActive ? tab.accent : undefined }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Tab Header */}
            <AnimatePresence mode="wait">
              {activeTabData && (
                <motion.div key={activeTab} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm" style={{ backgroundColor: `${activeTabData.accent}15` }}>
                    <activeTabData.icon className="w-6 h-6" style={{ color: activeTabData.accent }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{activeTabData.label}</h2>
                    <p className="text-sm text-gray-500">{activeTabData.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Content Area */}
            <AnimatePresence mode="wait">
              {renderContentArea()}
            </AnimatePresence>

            {/* Error Display */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-red-800 mb-1">Error</h4>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                  <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 p-1 hover:bg-red-100 rounded">
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results */}
            <AnimatePresence>
              {renderResults()}
            </AnimatePresence>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                  <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin" style={{ animationDuration: '1.5s' }} />
                </div>
                <p className="mt-4 text-sm font-medium text-gray-700">Processing your request...</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {renderShortcutsModal()}
    </div>
  );
};

export default CodeMentor;