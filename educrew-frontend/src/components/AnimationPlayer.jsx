// // // // import { useState, useEffect } from "react";
// // // // import { motion } from "framer-motion";
// // // // import VisualEngine from "./VisualEngine";


// // // // const AnimationPlayer = ({ trace, editorRef }) => {
// // // //   const [currentStep, setCurrentStep] = useState(0);
// // // //   const [playing, setPlaying] = useState(false);
// // // //   const [speed, setSpeed] = useState(1000);

// // // //   const steps = trace?.steps || [];
// // // //   const step = steps[currentStep];

// // // //   // ▶️ Auto Play Logic
// // // //   useEffect(() => {
// // // //     if (!playing) return;

// // // //     const timer = setInterval(() => {
// // // //       setCurrentStep(prev => {
// // // //         if (prev < steps.length - 1) return prev + 1;
// // // //         setPlaying(false);
// // // //         return prev;
// // // //       });
// // // //     }, speed);

// // // //     return () => clearInterval(timer);
// // // //   }, [playing, speed, steps.length]);

// // // //   // ✨ Code Line Highlight Logic
// // // //   useEffect(() => {
// // // //     if (!editorRef?.current || !step?.line) return;

// // // //     const editor = editorRef.current;
// // // //     const monaco = window.monaco;

// // // //     const decorations = editor.deltaDecorations([], [
// // // //       {
// // // //         range: new monaco.Range(step.line, 1, step.line, 1),
// // // //         options: {
// // // //           isWholeLine: true,
// // // //           className: "executing-line"
// // // //         }
// // // //       }
// // // //     ]);

// // // //     return () => editor.deltaDecorations(decorations, []);
// // // //   }, [step, editorRef]);

// // // //   if (!step) return <div>No animation data</div>;

// // // //   // 🔍 Detect Array Automatically
// // // //   const arrayKey = step.state
// // // //     ? Object.keys(step.state).find(key =>
// // // //         Array.isArray(step.state[key])
// // // //       )
// // // //     : null;

// // // //   const arrayData = arrayKey ? step.state[arrayKey] : null;
// // // //   const activeIndex = step.highlight?.array_index;

// // // //   return (
// // // //     <div className="space-y-6 bg-white p-6 rounded-2xl shadow-lg">

// // // //       {/* Controls */}
// // // //       <div className="flex items-center gap-4">
// // // //         <button
// // // //           onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
// // // //           className="px-4 py-2 bg-gray-200 rounded-lg"
// // // //         >
// // // //           Prev
// // // //         </button>

// // // //         <button
// // // //           onClick={() => setPlaying(p => !p)}
// // // //           className="px-4 py-2 bg-blue-500 text-white rounded-lg"
// // // //         >
// // // //           {playing ? "Pause" : "Play"}
// // // //         </button>

// // // //         <button
// // // //           onClick={() => setCurrentStep(s => Math.min(steps.length - 1, s + 1))}
// // // //           className="px-4 py-2 bg-gray-200 rounded-lg"
// // // //         >
// // // //           Next
// // // //         </button>

// // // //         <select
// // // //           value={speed}
// // // //           onChange={(e) => setSpeed(Number(e.target.value))}
// // // //           className="ml-auto px-3 py-2 border rounded"
// // // //         >
// // // //           <option value={1500}>Slow</option>
// // // //           <option value={1000}>Normal</option>
// // // //           <option value={500}>Fast</option>
// // // //         </select>
// // // //       </div>


// // // //       {/* Progress Bar */}
// // // // <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
// // // //   <motion.div
// // // //     className="h-2 bg-blue-500 rounded-full"
// // // //     animate={{
// // // //       width: `${((currentStep + 1) / steps.length) * 100}%`
// // // //     }}
// // // //     transition={{ duration: 0.5, ease: "easeInOut" }}

// // // //   />
// // // // </div>

// // // // <div className="text-sm text-gray-500 text-right">
// // // //   Step {currentStep + 1} of {steps.length}
// // // // </div>


// // // //       {/* Step Info */}
// // // //       <div className="bg-gray-100 p-4 rounded-xl">
// // // //         <h3 className="font-bold text-lg">Step {step.step}</h3>
// // // //         <p className="text-gray-700">{step.description}</p>
// // // //       </div>

// // // //       <VisualEngine step={step} />


// // // //       {/* Array Visualization */}
// // // //       {arrayData && (
// // // //         <div className="flex gap-4 mt-6 justify-center">
// // // //           {arrayData.map((value, index) => (
// // // //             <motion.div
// // // //               key={index}
// // // //               animate={{
// // // //                 scale: index === activeIndex ? 1.2 : 1,
// // // //                 backgroundColor:
// // // //                   index === activeIndex ? "#facc15" : "#ffffff"
// // // //               }}
// // // //               transition={{ duration: 0.3 }}
// // // //               className="w-14 h-14 flex items-center justify-center border-2 rounded-lg shadow font-bold text-lg"
// // // //             >
// // // //               {value}
// // // //             </motion.div>
// // // //           ))}
// // // //         </div>
// // // //       )}

// // // //       {/* Variable Panel */}
// // // //       <div className="grid grid-cols-2 gap-4 mt-6">
// // // //         {Object.entries(step.state || {}).map(([key, value]) => (
// // // //           <div key={key} className="bg-gray-50 p-3 rounded-lg">
// // // //             <strong>{key}</strong>
// // // //             <pre className="text-xs">
// // // //               {JSON.stringify(value, null, 2)}
// // // //             </pre>
// // // //           </div>
// // // //         ))}
// // // //       </div>

// // // //     </div>
// // // //   );
// // // // };

// // // // export default AnimationPlayer;




// import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Play, Pause, SkipBack, SkipForward, RotateCcw, 
//   Clock, ChevronRight, BarChart3, Layers, Eye,
//   Maximize2, Minimize2, Settings, Volume2, VolumeX,
//   ZoomIn, 
//   ZoomOut,
//   Terminal, 
//   Activity, 
//   Code2,
//   StepForward,
//   StepBack,
//   Info,
//   Keyboard,
//   X,
//   History,
//   ChevronDown,
//   ChevronUp,
//   FileCode,
//   Binary,
//   Gauge
// } from "lucide-react";
// import VisualEngine from "./VisualEngine";

// // Custom hook for keyboard controls
// const useKeyboardControls = (handlers, enabled = true) => {
//   useEffect(() => {
//     if (!enabled) return;
    
//     const handleKeyDown = (e) => {
//       if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
//       switch(e.key) {
//         case ' ':
//           e.preventDefault();
//           handlers.togglePlay();
//           break;
//         case 'ArrowRight':
//           e.preventDefault();
//           handlers.stepForward();
//           break;
//         case 'ArrowLeft':
//           e.preventDefault();
//           handlers.stepBackward();
//           break;
//         case 'Home':
//           e.preventDefault();
//           handlers.reset();
//           break;
//         case 'End':
//           e.preventDefault();
//           handlers.goToEnd();
//           break;
//         case 'f':
//           e.preventDefault();
//           handlers.toggleFullscreen?.();
//           break;
//         default:
//           break;
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [handlers, enabled]);
// };

// // Timeline component for showing execution history
// const ExecutionTimeline = ({ steps, currentStep, onStepClick, isCompact = false }) => {
//   const scrollRef = useRef(null);
  
//   useEffect(() => {
//     if (scrollRef.current) {
//       const activeElement = scrollRef.current.children[currentStep];
//       if (activeElement) {
//         activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
//       }
//     }
//   }, [currentStep]);

//   if (isCompact) {
//     return (
//       <div className="flex items-center gap-1 px-2">
//         {steps.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => onStepClick(idx)}
//             className={`h-1.5 rounded-full transition-all duration-200 ${
//               idx === currentStep ? 'w-6 bg-blue-500' : 
//               idx < currentStep ? 'w-1.5 bg-blue-500/40' : 'w-1.5 bg-slate-700'
//             }`}
//             title={`Step ${idx + 1}`}
//           />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="flex gap-1 overflow-x-auto py-2 px-1 scrollbar-hide" ref={scrollRef}>
//       {steps.map((step, idx) => (
//         <motion.button
//           key={idx}
//           onClick={() => onStepClick(idx)}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className={`
//             flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono font-bold
//             transition-all duration-200 border-2
//             ${idx === currentStep 
//               ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30' 
//               : idx < currentStep 
//                 ? 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600' 
//                 : 'bg-slate-900/50 border-slate-800 text-slate-600'
//             }
//           `}
//         >
//           {idx + 1}
//         </motion.button>
//       ))}
//     </div>
//   );
// };

// // Speed control with visual indicator
// const SpeedControl = ({ speed, onChange }) => {
//   const speeds = [
//     { label: '0.25x', value: 2000, icon: <Gauge className="w-3 h-3" /> },
//     { label: '0.5x', value: 1000, icon: <Gauge className="w-3 h-3" /> },
//     { label: '1x', value: 500, icon: <Gauge className="w-3 h-3" /> },
//     { label: '2x', value: 250, icon: <Gauge className="w-3 h-3" /> },
//     { label: '4x', value: 125, icon: <Gauge className="w-3 h-3" /> }
//   ];

//   return (
//     <div className="flex items-center gap-1 bg-slate-900/80 rounded-lg p-1 border border-slate-700">
//       <span className="text-[10px] text-slate-500 px-2 font-medium">SPEED</span>
//       <div className="flex gap-0.5">
//         {speeds.map((option) => (
//           <button
//             key={option.value}
//             onClick={() => onChange(option.value)}
//             className={`
//               px-2.5 py-1.5 rounded-md text-[10px] font-bold transition-all flex items-center gap-1
//               ${speed === option.value 
//                 ? 'bg-blue-600 text-white shadow-sm' 
//                 : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
//               }
//             `}
//           >
//             {option.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// const AnimationPlayer = ({ trace, editorRef }) => {
//   // State Management
//   const [currentStep, setCurrentStep] = useState(0);
//   const [playing, setPlaying] = useState(false);
//   const [speed, setSpeed] = useState(500);
//   const [activeTab, setActiveTab] = useState('visual');
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showShortcuts, setShowShortcuts] = useState(false);
//   const [showTimeline, setShowTimeline] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [zoom, setZoom] = useState(1);
//   const [showMiniMap, setShowMiniMap] = useState(true);
//   const [playbackDirection, setPlaybackDirection] = useState(1); // 1 for forward, -1 for backward
  
//   const containerRef = useRef(null);
//   const steps = trace?.steps || [];
//   const step = steps[currentStep];
//   const progress = useMemo(() => 
//     steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0, 
//   [currentStep, steps.length]);

//   // Define callbacks at component top level - NOT inside useMemo
//   const stepForward = useCallback(() => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(prev => prev + 1);
//       setPlaybackDirection(1);
//     }
//   }, [currentStep, steps.length]);

//   const stepBackward = useCallback(() => {
//     if (currentStep > 0) {
//       setCurrentStep(prev => prev - 1);
//       setPlaybackDirection(-1);
//     }
//   }, [currentStep]);

//   const reset = useCallback(() => {
//     setCurrentStep(0);
//     setPlaying(false);
//     setPlaybackDirection(1);
//   }, []);

//   const goToEnd = useCallback(() => {
//     setCurrentStep(steps.length - 1);
//     setPlaying(false);
//   }, [steps.length]);

//   const toggleFullscreen = useCallback(() => {
//     if (!document.fullscreenElement) {
//       containerRef.current?.requestFullscreen();
//       setIsFullscreen(true);
//     } else {
//       document.exitFullscreen();
//       setIsFullscreen(false);
//     }
//   }, []);

//   // Now useMemo only combines the callbacks into handlers object
//   const handlers = useMemo(() => ({
//     togglePlay: () => setPlaying(p => !p),
//     stepForward,
//     stepBackward,
//     reset,
//     goToEnd,
//     toggleFullscreen
//   }), [stepForward, stepBackward, reset, goToEnd, toggleFullscreen]);

//   useKeyboardControls(handlers);

//   // Auto Play Logic with direction support
//   useEffect(() => {
//     if (!playing) return;

//     const timer = setInterval(() => {
//       setCurrentStep(prev => {
//         if (playbackDirection === 1 && prev < steps.length - 1) return prev + 1;
//         if (playbackDirection === -1 && prev > 0) return prev - 1;
//         setPlaying(false);
//         return prev;
//       });
//     }, speed);

//     return () => clearInterval(timer);
//   }, [playing, speed, steps.length, playbackDirection]);

//   // Code Line Highlight Logic
//   useEffect(() => {
//     if (!editorRef?.current || !step?.line) return;

//     const editor = editorRef.current;
//     const monaco = window.monaco;

//     const decorations = editor.deltaDecorations([], [
//       {
//         range: new monaco.Range(step.line, 1, step.line, 1),
//         options: {
//           isWholeLine: true,
//           className: "executing-line",
//           glyphMarginClassName: "executing-glyph",
//           linesDecorationsClassName: "step-indicator"
//         }
//       }
//     ]);

//     return () => editor.deltaDecorations(decorations, []);
//   }, [step, editorRef]);

//   // Reset when trace changes
//   useEffect(() => {
//     setCurrentStep(0);
//     setPlaying(false);
//     setPlaybackDirection(1);
//   }, [trace]);

//   // Zoom handlers
//   const handleZoomIn = useCallback(() => setZoom(prev => Math.min(prev + 0.1, 2)), []);
//   const handleZoomOut = useCallback(() => setZoom(prev => Math.max(prev - 0.1, 0.5)), []);

//   // Data structure detection
//   const arrayKey = useMemo(() => 
//     step?.state ? Object.keys(step.state).find(key => Array.isArray(step.state[key])) : null,
//   [step]);
  
//   const arrayData = arrayKey ? step.state[arrayKey] : null;
//   const activeIndex = step?.highlight?.array_index;
//   const hasVariables = step?.state && Object.keys(step.state).length > 0;

//   // Empty state
//   if (!step) {
//     return (
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl border border-gray-200/60 shadow-xl"
//       >
//         <div className="relative">
//           <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
//           <div className="relative w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-lg border border-gray-100">
//             <Activity className="w-12 h-12 text-gray-400" />
//           </div>
//         </div>
//         <h3 className="mt-6 text-xl font-bold text-gray-900">Ready to Visualize</h3>
//         <p className="mt-2 text-sm text-gray-500 max-w-xs leading-relaxed">
//           Run your code to generate an execution trace. The animation will appear here.
//         </p>
//       </motion.div>
//     );
//   }

//   return (
//     <div 
//       ref={containerRef}
//       className={`
//         flex flex-col bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 
//         ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}
//       `}
//     >
//       {/* Professional Video Player Header */}
//       <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-lg border border-blue-500/30">
//             <Terminal className="w-4 h-4 text-blue-400" />
//             <span className="text-xs font-bold text-blue-300 tracking-wider">ALGO-VIS</span>
//           </div>
          
//           <div className="h-4 w-px bg-slate-700" />
          
//           <div className="flex items-center gap-3 text-xs">
//             <span className="text-slate-400 font-mono">
//               STEP <span className="text-white font-bold">{currentStep + 1}</span>
//               <span className="text-slate-600">/</span>
//               <span className="text-slate-500">{steps.length}</span>
//             </span>
//             <span className="text-slate-600">|</span>
//             <span className="text-slate-400 font-mono">
//               LINE <span className="text-emerald-400 font-bold">{step.line || '--'}</span>
//             </span>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-2">
//           {/* Zoom Controls */}
//           <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1 border border-slate-700">
//             <button 
//               onClick={handleZoomOut}
//               className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
//               title="Zoom Out (-)"
//             >
//               <ZoomOut className="w-4 h-4" />
//             </button>
//             <span className="text-[10px] text-slate-400 w-10 text-center font-mono">{Math.round(zoom * 100)}%</span>
//             <button 
//               onClick={handleZoomIn}
//               className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
//               title="Zoom In (+)"
//             >
//               <ZoomIn className="w-4 h-4" />
//             </button>
//           </div>

//           <button 
//             onClick={() => setShowMiniMap(!showMiniMap)}
//             className={`p-2 rounded-lg transition-colors ${showMiniMap ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
//             title="Toggle Mini Map"
//           >
//             <Layers className="w-4 h-4" />
//           </button>

//           <button 
//             onClick={() => setShowTimeline(!showTimeline)}
//             className={`p-2 rounded-lg transition-colors ${showTimeline ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
//             title="Toggle Timeline"
//           >
//             <History className="w-4 h-4" />
//           </button>

//           <button 
//             onClick={() => setShowShortcuts(true)}
//             className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
//             title="Keyboard Shortcuts (?)"
//           >
//             <Keyboard className="w-4 h-4" />
//           </button>
          
//           <button 
//             onClick={toggleFullscreen}
//             className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
//             title="Fullscreen (F)"
//           >
//             {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
//           </button>
//         </div>
//       </div>

//       {/* Main Stage - Cinema Style with Zoom */}
//       <div className="flex-1 relative bg-gradient-to-b from-slate-900 to-slate-950 min-h-[500px] overflow-hidden">
//         {/* Animated Grid Background */}
//         <div className="absolute inset-0 opacity-[0.03]" 
//           style={{
//             backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
//                               linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
//             backgroundSize: `${40 * zoom}px ${40 * zoom}px`
//           }}
//         />

//         {/* Zoom Container */}
//         <motion.div 
//           className="relative z-10 h-full w-full flex items-center justify-center p-6"
//           animate={{ scale: zoom }}
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         >
//           <AnimatePresence mode="wait" initial={false}>
//             {activeTab === 'visual' && (
//               <motion.div
//                 key="visual"
//                 initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
//                 animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
//                 exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
//                 transition={{ duration: 0.3 }}
//                 className="h-full w-full flex items-center justify-center"
//               >
//                 <VisualEngine step={step} direction={playbackDirection} />
//               </motion.div>
//             )}
            
//             {activeTab === 'array' && arrayData && (
//               <motion.div
//                 key="array"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -30 }}
//                 className="h-full flex flex-col items-center justify-center w-full max-w-4xl"
//               >
//                 <ArrayVisualization 
//                   data={arrayData} 
//                   activeIndex={activeIndex} 
//                   step={step}
//                   compareIndices={step.highlight?.compare_indices}
//                 />
//               </motion.div>
//             )}

//             {activeTab === 'variables' && hasVariables && (
//               <motion.div
//                 key="variables"
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="h-full w-full overflow-auto p-4"
//               >
//                 <VariablesGrid state={step.state} highlight={step.highlight} />
//               </motion.div>
//             )}

//             {activeTab === 'code' && (
//               <motion.div
//                 key="code"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="h-full w-full flex items-center justify-center"
//               >
//                 <CodeContext step={step} totalSteps={steps.length} />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {/* Floating Tab Navigation - Centered */}
//         <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
//           <div className="flex items-center gap-1 p-1.5 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-2xl">
//             <TabButton 
//               active={activeTab === 'visual'} 
//               onClick={() => setActiveTab('visual')}
//               icon={BarChart3}
//               label="Visual"
//             />
//             {arrayData && (
//               <TabButton 
//                 active={activeTab === 'array'} 
//                 onClick={() => setActiveTab('array')}
//                 icon={Layers}
//                 label="Array"
//               />
//             )}
//             {hasVariables && (
//               <TabButton 
//                 active={activeTab === 'variables'} 
//                 onClick={() => setActiveTab('variables')}
//                 icon={Binary}
//                 label="Data"
//               />
//             )}
//             <TabButton 
//               active={activeTab === 'code'} 
//               onClick={() => setActiveTab('code')}
//               icon={FileCode}
//               label="Code"
//             />
//           </div>
//         </div>

//         {/* Mini Map Overlay */}
//         <AnimatePresence>
//           {showMiniMap && steps.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               className="absolute right-4 top-20 w-48 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700 p-3 z-10"
//             >
//               <div className="text-[10px] text-slate-400 font-bold mb-2 uppercase tracking-wider">Execution Map</div>
//               <div className="grid grid-cols-6 gap-1">
//                 {steps.map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setCurrentStep(idx)}
//                     className={`
//                       aspect-square rounded-sm text-[8px] font-mono transition-all
//                       ${idx === currentStep ? 'bg-blue-500 text-white' : 
//                         idx < currentStep ? 'bg-blue-500/30 text-blue-300' : 'bg-slate-800 text-slate-600'}
//                     `}
//                   >
//                     {idx + 1}
//                   </button>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Timeline Panel (Collapsible) */}
//       <AnimatePresence>
//         {showTimeline && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="bg-slate-900 border-t border-slate-800 overflow-hidden"
//           >
//             <div className="p-4">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Execution Timeline</span>
//                 <button 
//                   onClick={() => setShowTimeline(false)}
//                   className="text-slate-500 hover:text-white"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//               <ExecutionTimeline 
//                 steps={steps} 
//                 currentStep={currentStep} 
//                 onStepClick={setCurrentStep}
//               />
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Info Panel - Step Description */}
//       <div className="bg-slate-900 border-t border-slate-800 px-6 py-4">
//         <div className="flex items-start gap-4 max-w-4xl mx-auto">
//           <motion.div 
//             key={step.step}
//             initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
//             animate={{ scale: 1, opacity: 1, rotate: 0 }}
//             transition={{ type: "spring", stiffness: 400, damping: 20 }}
//             className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 shrink-0"
//           >
//             {step.step}
//           </motion.div>
//           <div className="flex-1 min-w-0">
//             <div className="flex items-center gap-2 mb-1">
//               <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded">
//                 Current Operation
//               </span>
//               {step.operation && (
//                 <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
//                   {step.operation}
//                 </span>
//               )}
//             </div>
//             <p className="text-slate-200 leading-relaxed text-sm font-medium">
//               {step.description}
//             </p>
//             {step.line && (
//               <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 font-mono">
//                 <ChevronRight className="w-3 h-3 text-blue-500" />
//                 <span>Line {step.line}</span>
//                 {step.code_snippet && (
//                   <span className="text-slate-600 ml-2 truncate max-w-md opacity-60">
//                     {step.code_snippet}
//                   </span>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Professional Video Player Controls */}
//       <div className="bg-slate-950 border-t border-slate-800 px-6 py-4">
//         {/* Progress Bar - Video Style */}
//         <div className="mb-4 group relative">
//           <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden cursor-pointer group-hover:h-3 transition-all">
//             {/* Buffered/Completed progress */}
//             <motion.div
//               className="absolute inset-y-0 left-0 bg-slate-700"
//               style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
//             />
//             {/* Current progress */}
//             <motion.div
//               className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
//               style={{ width: `${progress}%` }}
//             >
//               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100" />
//             </motion.div>
            
//             {/* Click area for seeking */}
//             <div 
//               className="absolute inset-0"
//               onClick={(e) => {
//                 const rect = e.currentTarget.getBoundingClientRect();
//                 const x = e.clientX - rect.left;
//                 const percentage = x / rect.width;
//                 setCurrentStep(Math.floor(percentage * (steps.length - 1)));
//               }}
//             />
//           </div>
          
//           {/* Time indicators */}
//           <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono uppercase tracking-wider">
//             <span>{formatTime(currentStep, speed)}</span>
//             <span className="text-slate-400">Step {currentStep + 1} of {steps.length}</span>
//             <span>{formatTime(steps.length - 1, speed)}</span>
//           </div>
//         </div>

//         {/* Control Bar - Video Player Style */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-1">
//             {/* Playback Controls Group */}
//             <ControlButton onClick={reset} icon={RotateCcw} title="Reset (Home)" />
//             <ControlButton onClick={stepBackward} icon={SkipBack} disabled={currentStep === 0} title="Previous (←)" />
            
//             {/* Play/Pause - Primary Action */}
//             <button
//               onClick={handlers.togglePlay}
//               className={`
//                 mx-3 w-14 h-14 rounded-full flex items-center justify-center transition-all transform hover:scale-110 active:scale-95
//                 ${playing 
//                   ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border-2 border-amber-500/50' 
//                   : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/30 border-2 border-blue-500'
//                 }
//               `}
//             >
//               {playing ? (
//                 <Pause className="w-6 h-6 fill-current" />
//               ) : (
//                 <Play className="w-6 h-6 fill-current ml-1" />
//               )}
//             </button>
            
//             <ControlButton onClick={stepForward} icon={SkipForward} disabled={currentStep === steps.length - 1} title="Next (→)" />
//             <ControlButton onClick={goToEnd} icon={StepForward} title="End" />
            
//             <div className="w-px h-6 bg-slate-800 mx-2" />
            
//             {/* Direction Toggle */}
//             <button
//               onClick={() => setPlaybackDirection(d => d === 1 ? -1 : 1)}
//               className={`
//                 p-2 rounded-lg transition-all text-xs font-bold
//                 ${playbackDirection === 1 
//                   ? 'text-emerald-400 bg-emerald-500/10' 
//                   : 'text-amber-400 bg-amber-500/10'}
//               `}
//               title="Toggle Direction"
//             >
//               {playbackDirection === 1 ? 'FWD' : 'REV'}
//             </button>
//           </div>

//           {/* Right Side Controls */}
//           <div className="flex items-center gap-4">
//             <SpeedControl speed={speed} onChange={setSpeed} />
//           </div>
//         </div>
//       </div>

//       {/* Keyboard Shortcuts Modal */}
//       <AnimatePresence>
//         {showShortcuts && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
//             onClick={() => setShowShortcuts(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl"
//               onClick={e => e.stopPropagation()}
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-bold text-white flex items-center gap-2">
//                   <Keyboard className="w-5 h-5 text-blue-500" />
//                   Keyboard Shortcuts
//                 </h3>
//                 <button 
//                   onClick={() => setShowShortcuts(false)}
//                   className="text-slate-400 hover:text-white"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
              
//               <div className="grid grid-cols-2 gap-3">
//                 {[
//                   { key: 'Space', action: 'Play/Pause', icon: Play },
//                   { key: '←', action: 'Previous Step', icon: SkipBack },
//                   { key: '→', action: 'Next Step', icon: SkipForward },
//                   { key: 'Home', action: 'Reset to Start', icon: RotateCcw },
//                   { key: 'End', action: 'Jump to End', icon: StepForward },
//                   { key: 'F', action: 'Toggle Fullscreen', icon: Maximize2 }
//                 ].map((shortcut) => (
//                   <div key={shortcut.key} className="flex items-center justify-between py-3 px-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
//                     <div className="flex items-center gap-3">
//                       <shortcut.icon className="w-4 h-4 text-slate-500" />
//                       <span className="text-slate-300 text-sm">{shortcut.action}</span>
//                     </div>
//                     <kbd className="px-2.5 py-1 bg-slate-800 rounded-md text-xs font-mono text-white border border-slate-600 shadow-sm">
//                       {shortcut.key}
//                     </kbd>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="mt-6 pt-4 border-t border-slate-800">
//                 <p className="text-xs text-slate-500 text-center">
//                   Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">?</kbd> anytime to show this help
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// // Enhanced Helper Components

// const TabButton = ({ active, onClick, icon: Icon, label }) => (
//   <button
//     onClick={onClick}
//     className={`
//       flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
//       ${active 
//         ? 'bg-slate-700 text-white shadow-lg shadow-slate-900/50 scale-105' 
//         : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
//       }
//     `}
//   >
//     <Icon className={`w-4 h-4 ${active ? 'text-blue-400' : ''}`} />
//     <span>{label}</span>
//   </button>
// );

// const ControlButton = ({ onClick, icon: Icon, disabled, title }) => (
//   <button
//     onClick={onClick}
//     disabled={disabled}
//     title={title}
//     className={`
//       p-3 rounded-xl text-slate-400 transition-all duration-200
//       hover:text-white hover:bg-slate-800 hover:scale-105
//       disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400 disabled:hover:scale-100
//       active:scale-95
//     `}
//   >
//     <Icon className="w-5 h-5" />
//   </button>
// );

// // Array Visualization Component
// const ArrayVisualization = ({ data, activeIndex, step, compareIndices }) => {
//   const maxValue = Math.max(...data);
  
//   return (
//     <div className="w-full">
//       <div className="flex items-end justify-center gap-2 h-64 mb-6">
//         {data.map((value, index) => {
//           const isActive = index === activeIndex || index === step?.state?.i || index === step?.state?.j;
//           const isComparing = compareIndices?.includes(index);
//           const height = Math.max(24, (value / maxValue) * 200);
          
//           return (
//             <motion.div
//               key={index}
//               initial={false}
//               animate={{
//                 scale: isActive ? 1.15 : isComparing ? 1.08 : 1,
//                 y: isActive ? -12 : 0,
//               }}
//               transition={{ type: "spring", stiffness: 400, damping: 25 }}
//               className="relative flex flex-col items-center gap-2"
//             >
//               {/* Value Bar */}
//               <motion.div
//                 animate={{
//                   height: height,
//                   backgroundColor: isActive ? '#fbbf24' : isComparing ? '#3b82f6' : '#1e293b',
//                 }}
//                 className="w-14 rounded-t-lg border-2 border-b-0 shadow-lg relative overflow-hidden"
//                 style={{
//                   borderColor: isActive ? '#f59e0b' : isComparing ? '#2563eb' : '#334155',
//                   boxShadow: isActive ? '0 0 30px rgba(251, 191, 36, 0.4)' : '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
//                 }}
//               >
//                 {/* Shine effect */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                
//                 {/* Value Label */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <span className={`font-bold text-lg ${isActive ? 'text-amber-950' : isComparing ? 'text-blue-100' : 'text-slate-400'}`}>
//                     {value}
//                   </span>
//                 </div>
//               </motion.div>
              
//               {/* Index Label */}
//               <span className={`text-xs font-mono font-bold ${isActive ? 'text-amber-400' : 'text-slate-500'}`}>
//                 {index}
//               </span>

//               {/* Pointer Indicator */}
//               {isActive && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10, scale: 0 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   className="absolute -top-10"
//                 >
//                   <div className="bg-amber-500 text-slate-900 text-xs font-bold px-2 py-1 rounded-lg shadow-lg flex items-center gap-1">
//                     {step?.state?.i === index ? 'i' : step?.state?.j === index ? 'j' : '★'}
//                   </div>
//                   <div className="w-0.5 h-4 bg-amber-500 mx-auto" />
//                 </motion.div>
//               )}
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* Legend */}
//       <div className="flex items-center justify-center gap-6">
//         {[
//           { color: 'bg-amber-500', label: 'Active', border: 'border-amber-600', desc: 'Current element' },
//           { color: 'bg-blue-500', label: 'Comparing', border: 'border-blue-600', desc: 'Being compared' },
//           { color: 'bg-slate-800', label: 'Normal', border: 'border-slate-700', desc: 'Unchanged' }
//         ].map((item) => (
//           <div key={item.label} className="flex items-center gap-2 group cursor-help" title={item.desc}>
//             <div className={`w-3 h-3 rounded ${item.color} border ${item.border} shadow-sm`} />
//             <span className="text-xs text-slate-400 font-medium group-hover:text-slate-300 transition-colors">{item.label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Variables Grid Component
// const VariablesGrid = ({ state, highlight }) => {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//       {Object.entries(state).map(([key, value], idx) => {
//         const isArray = Array.isArray(value);
//         const isHighlighted = highlight?.[key] !== undefined;
//         const isComplex = typeof value === 'object' && !isArray;
        
//         return (
//           <motion.div
//             key={key}
//             initial={{ opacity: 0, y: 20, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ delay: idx * 0.03, type: "spring", stiffness: 300 }}
//             className={`
//               group relative overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-200
//               ${isHighlighted 
//                 ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10' 
//                 : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
//               }
//             `}
//           >
//             {/* Animated background for highlighted */}
//             {isHighlighted && (
//               <motion.div 
//                 className="absolute inset-0 bg-amber-500/5"
//                 animate={{ opacity: [0.05, 0.1, 0.05] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               />
//             )}
            
//             <div className="relative p-4">
//               <div className="flex items-center justify-between mb-2">
//                 <span className={`
//                   text-xs font-bold uppercase tracking-wider font-mono
//                   ${isHighlighted ? 'text-amber-400' : 'text-slate-400'}
//                 `}>
//                   {key}
//                 </span>
//                 <span className={`
//                   text-[10px] px-1.5 py-0.5 rounded font-mono
//                   ${isArray ? 'bg-purple-500/20 text-purple-400' : 
//                     isComplex ? 'bg-blue-500/20 text-blue-400' : 
//                     'bg-slate-700 text-slate-400'}
//                 `}>
//                   {isArray ? `array[${value.length}]` : typeof value}
//                 </span>
//               </div>
              
//               <div className={`
//                 font-mono break-all
//                 ${isHighlighted ? 'text-amber-200' : 'text-slate-200'}
//                 ${isArray ? 'text-xs' : 'text-lg font-semibold'}
//               `}>
//                 {isArray ? (
//                   <div className="flex flex-wrap gap-1">
//                     {value.slice(0, 8).map((v, i) => (
//                       <motion.span 
//                         key={i} 
//                         initial={false}
//                         animate={{ 
//                           scale: highlight?.array_index === i ? 1.1 : 1,
//                           backgroundColor: highlight?.array_index === i ? '#fbbf24' : '#1e293b'
//                         }}
//                         className={`
//                           px-2 py-1 rounded border text-xs font-medium
//                           ${highlight?.array_index === i ? 'border-amber-500 text-amber-950' : 'border-slate-700 text-slate-300'}
//                         `}
//                       >
//                         {v}
//                       </motion.span>
//                     ))}
//                     {value.length > 8 && (
//                       <span className="text-slate-500 text-xs self-center px-1">+{value.length - 8} more</span>
//                     )}
//                   </div>
//                 ) : isComplex ? (
//                   <pre className="text-xs text-slate-300 overflow-x-auto">
//                     {JSON.stringify(value, null, 2)}
//                   </pre>
//                 ) : (
//                   <span className={isHighlighted ? 'text-amber-300' : 'text-emerald-400'}>
//                     {String(value)}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// };

// // Code Context Component
// const CodeContext = ({ step, totalSteps }) => {
//   return (
//     <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 max-w-2xl w-full">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Execution Context</h3>
//         <span className="text-xs text-slate-500 font-mono">Step {step.step} of {totalSteps}</span>
//       </div>
      
//       <div className="space-y-4">
//         <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
//           <div className="text-xs text-slate-500 mb-2 font-mono">CURRENT OPERATION</div>
//           <p className="text-slate-200 font-medium">{step.description}</p>
//         </div>
        
//         {step.code_snippet && (
//           <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 font-mono text-sm">
//             <div className="text-xs text-slate-500 mb-2">CODE</div>
//             <code className="text-emerald-400">{step.code_snippet}</code>
//           </div>
//         )}
        
//         {step.line && (
//           <div className="flex items-center gap-2 text-xs text-slate-500">
//             <FileCode className="w-4 h-4" />
//             <span>Executing line {step.line}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const formatTime = (stepIndex, speed) => {
//   const totalMs = stepIndex * speed;
//   const seconds = Math.floor(totalMs / 1000);
//   const ms = Math.floor((totalMs % 1000) / 10);
//   return `${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
// };

// export default AnimationPlayer;



import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, SkipBack, SkipForward, RotateCcw, 
  Eye,
  Maximize2, Minimize2, 
  ZoomIn, 
  ZoomOut,
  Code2,
  StepForward,
  Info,
  Keyboard,
  Binary,
  Gauge,
  ArrowUp,
  MousePointer2,
  Zap,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  ArrowRightLeft,
  RefreshCw
} from "lucide-react";
import VisualEngine from "./VisualEngine";

// Custom hook for keyboard controls
const useKeyboardControls = (handlers, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;
    
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      switch(e.key) {
        case ' ':
          e.preventDefault();
          handlers.togglePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handlers.stepForward();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlers.stepBackward();
          break;
        case 'Home':
          e.preventDefault();
          handlers.reset();
          break;
        case 'End':
          e.preventDefault();
          handlers.goToEnd();
          break;
        case 'f':
          e.preventDefault();
          handlers.toggleFullscreen?.();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers, enabled]);
};

// Beginner-friendly explanation component
const ExplanationCard = ({ step, isActive }) => {
  if (!step) return null;

  const getExplanationType = (operation) => {
    const types = {
      'COMPARE': { color: 'blue', icon: ArrowRightLeft, text: 'Comparison' },
      'SWAP': { color: 'amber', icon: RefreshCw, text: 'Swap Elements' },
      'PIVOT': { color: 'purple', icon: MousePointer2, text: 'Choose Pivot' },
      'INIT': { color: 'emerald', icon: Play, text: 'Initialize' },
      'LOOP': { color: 'indigo', icon: RotateCcw, text: 'Loop Start' },
      'CONDITION': { color: 'orange', icon: AlertCircle, text: 'Check Condition' },
      'RETURN': { color: 'green', icon: CheckCircle2, text: 'Return Result' }
    };
    return types[operation] || { color: 'slate', icon: Info, text: 'Processing' };
  };

  const type = getExplanationType(step.operation);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 overflow-hidden"
    >
      {/* Header */}
      <div className={`bg-${type.color}-500/10 border-b border-${type.color}-500/20 px-4 py-3`}>
        <div className="flex items-center gap-2">
          <type.icon className={`w-5 h-5 text-${type.color}-400`} />
          <span className={`text-${type.color}-400 font-bold text-sm uppercase tracking-wider`}>
            {type.text}
          </span>
          <span className="ml-auto text-xs text-slate-500 font-mono">
            Step {step.step}
          </span>
        </div>
      </div>

      {/* Explanation Content */}
      <div className="p-4 space-y-4">
        {/* Main Explanation */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-3 h-3" />
            What's Happening
          </h4>
          <p className="text-slate-200 text-sm leading-relaxed">
            {step.explanation || step.description}
          </p>
        </div>

        {/* Why This Matters */}
        {step.why && (
          <div className="space-y-2 bg-slate-950/50 rounded-lg p-3 border border-slate-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Lightbulb className="w-3 h-3" />
              Why This Matters
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              {step.why}
            </p>
          </div>
        )}

        {/* Code Translation */}
        {step.code_translation && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-3 h-3" />
              In Code Terms
            </h4>
            <code className="block bg-slate-950 rounded-lg p-3 text-xs text-emerald-300 font-mono border border-slate-800">
              {step.code_translation}
            </code>
          </div>
        )}

        {/* Visual Hint */}
        {step.visual_hint && (
          <div className="flex items-start gap-2 text-xs text-slate-400 bg-blue-500/5 rounded-lg p-3 border border-blue-500/10">
            <Eye className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>{step.visual_hint}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Timeline component for showing execution history
const ExecutionTimeline = ({ steps, currentStep, onStepClick, isCompact = false }) => {
  const scrollRef = useRef(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      const activeElement = scrollRef.current.children[currentStep];
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentStep]);

  if (isCompact) {
    return (
      <div className="flex items-center gap-1 px-2">
        {steps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => onStepClick(idx)}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              idx === currentStep ? 'w-6 bg-blue-500' : 
              idx < currentStep ? 'w-1.5 bg-blue-500/40' : 'w-1.5 bg-slate-700'
            }`}
            title={`Step ${idx + 1}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-1 overflow-x-auto py-2 px-1 scrollbar-hide" ref={scrollRef}>
      {steps.map((step, idx) => (
        <motion.button
          key={idx}
          onClick={() => onStepClick(idx)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono font-bold
            transition-all duration-200 border-2
            ${idx === currentStep 
              ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30' 
              : idx < currentStep 
                ? 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600' 
                : 'bg-slate-900/50 border-slate-800 text-slate-600'
            }
          `}
        >
          {idx + 1}
        </motion.button>
      ))}
    </div>
  );
};

// Speed control with visual indicator
const SpeedControl = ({ speed, onChange }) => {
  const speeds = [
    { label: '0.25x', value: 2000, icon: <Gauge className="w-3 h-3" /> },
    { label: '0.5x', value: 1000, icon: <Gauge className="w-3 h-3" /> },
    { label: '1x', value: 500, icon: <Gauge className="w-3 h-3" /> },
    { label: '2x', value: 250, icon: <Gauge className="w-3 h-3" /> },
    { label: '4x', value: 125, icon: <Gauge className="w-3 h-3" /> }
  ];

;

  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Learning Speed</span>
      <div className="flex items-center gap-1 bg-slate-900/80 rounded-lg p-1 border border-slate-700">
        {speeds.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              px-3 py-1.5 rounded-md text-xs font-medium transition-all flex flex-col items-center min-w-[60px]
              ${speed === option.value 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }
            `}
          >
            <span className="font-bold">{option.label}</span>
            <span className={`text-[8px] ${speed === option.value ? 'text-blue-200' : 'text-slate-600'}`}>
              {option.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Enhanced Pointer Indicator with Yellow Arrow
const PointerIndicator = ({ label, color = 'amber', explanation }) => {
  const colorClasses = {
    amber: 'text-amber-400 bg-amber-500 border-amber-400 shadow-amber-500/30',
    blue: 'text-blue-400 bg-blue-500 border-blue-400 shadow-blue-500/30',
    emerald: 'text-emerald-400 bg-emerald-500 border-emerald-400 shadow-emerald-500/30',
    purple: 'text-purple-400 bg-purple-500 border-purple-400 shadow-purple-500/30'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0 }}
      className="absolute -top-20 left-1/2 -translate-x-1/2 z-20"
    >
      <div className="flex flex-col items-center group cursor-help" title={explanation}>
        {/* Label Badge */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className={`
            px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg border-2 mb-1
            ${colorClasses[color] || colorClasses.amber}
            bg-opacity-20 backdrop-blur-sm
          `}
        >
          <div className="flex items-center gap-1">
            <ArrowUp className="w-4 h-4" />
            <span className="font-mono text-lg">{label}</span>
          </div>
        </motion.div>
        
        {/* Arrow Shaft */}
        <div className={`
          w-1 h-8 rounded-full
          ${color === 'amber' ? 'bg-amber-500' : 
            color === 'blue' ? 'bg-blue-500' : 
            color === 'emerald' ? 'bg-emerald-500' : 'bg-purple-500'}
        `} />
        
        {/* Arrow Head */}
        <motion.div
          animate={{ y: [0, 2, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className={`
            w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px]
            ${color === 'amber' ? 'border-t-amber-500' : 
              color === 'blue' ? 'border-t-blue-500' : 
              color === 'emerald' ? 'border-t-emerald-500' : 'border-t-purple-500'}
          `}
        />

        {/* Explanation Tooltip */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-slate-200 text-xs px-2 py-1 rounded border border-slate-700 whitespace-nowrap pointer-events-none">
          {explanation}
        </div>
      </div>
    </motion.div>
  );
};

const AnimationPlayer = ({ trace, editorRef }) => {
  // State Management
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(800); // Default to learning speed
  const [activeTab, setActiveTab] = useState('learn'); // Default to learning mode
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [playbackDirection, setPlaybackDirection] = useState(1);
  const [showExplanation, setShowExplanation] = useState(true);
  
  const containerRef = useRef(null);
  const steps = trace?.steps || [];
  const step = steps[currentStep];
  const progress = useMemo(() => 
    steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0, 
  [currentStep, steps.length]);

  // Define callbacks at component top level
  const stepForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setPlaybackDirection(1);
    }
  }, [currentStep, steps.length]);

  const stepBackward = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setPlaybackDirection(-1);
    }
  }, [currentStep]);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setPlaying(false);
    setPlaybackDirection(1);
  }, []);

  const goToEnd = useCallback(() => {
    setCurrentStep(steps.length - 1);
    setPlaying(false);
  }, [steps.length]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handlers = useMemo(() => ({
    togglePlay: () => setPlaying(p => !p),
    stepForward,
    stepBackward,
    reset,
    goToEnd,
    toggleFullscreen
  }), [stepForward, stepBackward, reset, goToEnd, toggleFullscreen]);

  useKeyboardControls(handlers);

  // Auto Play Logic
  useEffect(() => {
    if (!playing) return;

    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (playbackDirection === 1 && prev < steps.length - 1) return prev + 1;
        if (playbackDirection === -1 && prev > 0) return prev - 1;
        setPlaying(false);
        return prev;
      });
    }, speed);

    return () => clearInterval(timer);
  }, [playing, speed, steps.length, playbackDirection]);

  // Code Line Highlight Logic
  useEffect(() => {
    if (!editorRef?.current || !step?.line) return;

    const editor = editorRef.current;
    const monaco = window.monaco;

    const decorations = editor.deltaDecorations([], [
      {
        range: new monaco.Range(step.line, 1, step.line, 1),
        options: {
          isWholeLine: true,
          className: "executing-line",
          glyphMarginClassName: "executing-glyph",
          linesDecorationsClassName: "step-indicator"
        }
      }
    ]);

    return () => editor.deltaDecorations(decorations, []);
  }, [step, editorRef]);

  // Reset when trace changes
  useEffect(() => {
    setCurrentStep(0);
    setPlaying(false);
    setPlaybackDirection(1);
  }, [trace]);

  // Zoom handlers
  const handleZoomIn = useCallback(() => setZoom(prev => Math.min(prev + 0.1, 2)), []);
  const handleZoomOut = useCallback(() => setZoom(prev => Math.max(prev - 0.1, 0.5)), []);

  // Data structure detection
  const arrayKey = useMemo(() => 
    step?.state ? Object.keys(step.state).find(key => Array.isArray(step.state[key])) : null,
  [step]);
  
  const arrayData = arrayKey ? step.state[arrayKey] : null;
  const activeIndex = step?.highlight?.array_index;
  const hasVariables = step?.state && Object.keys(step.state).length > 0;

  // Determine pointer info with explanations
  const getPointerInfo = (index) => {
    const pointers = [];
    if (step?.state?.i === index) pointers.push({ 
      label: 'i', 
      color: 'amber', 
      explanation: 'Outer loop index - tracks our current position' 
    });
    if (step?.state?.j === index) pointers.push({ 
      label: 'j', 
      color: 'blue', 
      explanation: 'Inner loop index - used for comparison' 
    });
    if (step?.state?.left === index) pointers.push({ 
      label: 'L', 
      color: 'emerald', 
      explanation: 'Left boundary of current section' 
    });
    if (step?.state?.right === index) pointers.push({ 
      label: 'R', 
      color: 'purple', 
      explanation: 'Right boundary of current section' 
    });
    if (step?.state?.mid === index) pointers.push({ 
      label: 'M', 
      color: 'emerald', 
      explanation: 'Middle index for divide and conquer' 
    });
    if (step?.state?.pivot === index) pointers.push({ 
      label: 'P', 
      color: 'amber', 
      explanation: 'Pivot element for partitioning' 
    });
    if (activeIndex === index && !step?.state?.i && !step?.state?.j) {
      pointers.push({ 
        label: '★', 
        color: 'amber',
        explanation: 'Currently selected element' 
      });
    }
    return pointers;
  };

  // Empty state
  if (!step) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl border border-gray-200/60 shadow-xl"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
          <div className="relative w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-lg border border-gray-100">
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>
        </div>
        <h3 className="mt-6 text-xl font-bold text-gray-900">Ready to Learn</h3>
        <p className="mt-2 text-sm text-gray-500 max-w-xs leading-relaxed">
          Run your code to start the interactive tutorial. I'll guide you through each step!
        </p>
      </motion.div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`
        flex flex-col bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 
        ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}
      `}
    >
      {/* Educational Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-300 tracking-wider">LEARNING MODE</span>
          </div>
          
          <div className="h-4 w-px bg-slate-700" />
          
          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400 font-mono">
              STEP <span className="text-amber-400 font-bold text-lg">{currentStep + 1}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-500">{steps.length}</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-mono">
              LINE <span className="text-emerald-400 font-bold">{step.line || '--'}</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowExplanation(!showExplanation)}
            className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-xs font-medium ${showExplanation ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <BookOpen className="w-4 h-4" />
            {showExplanation ? 'Hide Guide' : 'Show Guide'}
          </button>

          <div className="w-px h-6 bg-slate-700" />

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1 border border-slate-700">
            <button onClick={handleZoomOut} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[10px] text-slate-400 w-10 text-center font-mono">{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomIn} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors">
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button 
            onClick={() => setShowShortcuts(true)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Keyboard className="w-4 h-4" />
          </button>
          
          <button 
            onClick={toggleFullscreen}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Learning Area - Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Visualization */}
        <div className="flex-1 relative bg-gradient-to-b from-slate-900 to-slate-950 min-h-[500px] overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
              backgroundSize: `${40 * zoom}px ${40 * zoom}px`
            }}
          />

          {/* Current Operation Banner */}
          <motion.div 
            key={step.operation}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 right-4 z-20"
          >
            <div className="bg-slate-900/90 backdrop-blur-md rounded-xl border border-amber-500/30 p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Current Operation</div>
                  <div className="text-white font-bold text-lg">{step.operation || 'Processing'}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Next Up</div>
                  <div className="text-slate-400 text-sm">
                    {currentStep < steps.length - 1 ? steps[currentStep + 1].operation || 'Continue' : 'Finish'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Zoom Container */}
          <motion.div 
            className="relative z-10 h-full w-full flex items-center justify-center p-6 pt-24"
            animate={{ scale: zoom }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <AnimatePresence mode="wait">
              {activeTab === 'learn' && (
                <motion.div
                  key="learn"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="h-full w-full flex items-center justify-center"
                >
                  {arrayData ? (
                    <ArrayVisualization 
                      data={arrayData} 
                      activeIndex={activeIndex} 
                      step={step}
                      compareIndices={step.highlight?.compare_indices}
                      getPointerInfo={getPointerInfo}
                    />
                  ) : (
                    <VisualEngine step={step} direction={playbackDirection} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Mini Map */}
          <AnimatePresence>
            {showMiniMap && steps.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-4 bottom-4 w-56 bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-700 p-3 z-10"
              >
                <div className="text-[10px] text-slate-400 font-bold mb-2 uppercase tracking-wider">Progress Map</div>
                <div className="grid grid-cols-8 gap-1">
                  {steps.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentStep(idx)}
                      className={`
                        aspect-square rounded text-[8px] font-mono transition-all flex items-center justify-center
                        ${idx === currentStep ? 'bg-amber-500 text-slate-900 font-bold' : 
                          idx < currentStep ? 'bg-emerald-500/30 text-emerald-400' : 'bg-slate-800 text-slate-600'}
                      `}
                      title={s.operation}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel - Explanation (Collapsible) */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 380, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-l border-slate-800 bg-slate-900/50 overflow-hidden"
            >
              <div className="w-[380px] h-full overflow-y-auto p-4 space-y-4">
                {/* Step Explanation */}
                <ExplanationCard step={step} isActive={true} />

                {/* Variables Watch */}
                {hasVariables && (
                  <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Binary className="w-3 h-3" />
                      Variables Watch
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(step.state).slice(0, 6).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 font-mono">{key}</span>
                          <span className={`font-mono font-bold ${step.highlight?.[key] ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {Array.isArray(value) ? `[${value.length} items]` : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Code Snippet */}
                {step.code_snippet && (
                  <div className="bg-slate-950 rounded-xl border border-slate-800 p-4">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Code2 className="w-3 h-3" />
                      Current Code
                    </h4>
                    <pre className="text-xs text-emerald-300 font-mono overflow-x-auto">
                      {step.code_snippet}
                    </pre>
                  </div>
                )}

                {/* Tips */}
                <div className="bg-blue-500/5 rounded-xl border border-blue-500/20 p-4">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Lightbulb className="w-3 h-3" />
                    Pro Tip
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {currentStep === 0 ? "Watch how the pointers move. The outer loop (i) moves slowly while the inner loop (j) moves quickly." :
                     currentStep === steps.length - 1 ? "Notice how the array is now sorted! Each element is in its correct position." :
                     "Pay attention to the comparison. We're checking if elements need to be swapped."}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Control Bar */}
      <div className="bg-slate-950 border-t border-slate-800 px-6 py-4">
        {/* Progress Bar */}
        <div className="mb-4 group relative">
          <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden cursor-pointer group-hover:h-4 transition-all">
            <div className="absolute inset-0 bg-slate-700/50" />
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-blue-500" />
            </motion.div>
            <div 
              className="absolute inset-0"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = x / rect.width;
                setCurrentStep(Math.floor(percentage * (steps.length - 1)));
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono uppercase">
            <span>Start</span>
            <span className="text-amber-400 font-bold">Step {currentStep + 1} of {steps.length}</span>
            <span>End</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ControlButton onClick={reset} icon={RotateCcw} title="Start Over (Home)" />
            <ControlButton onClick={stepBackward} icon={SkipBack} disabled={currentStep === 0} title="Previous Step (←)" />
            
            <button
              onClick={handlers.togglePlay}
              className={`
                mx-3 w-16 h-16 rounded-full flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-xl
                ${playing 
                  ? 'bg-amber-500 text-slate-900 hover:bg-amber-400' 
                  : 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/30'
                }
              `}
            >
              {playing ? (
                <Pause className="w-8 h-8 fill-current" />
              ) : (
                <Play className="w-8 h-8 fill-current ml-1" />
              )}
            </button>
            
            <ControlButton onClick={stepForward} icon={SkipForward} disabled={currentStep === steps.length - 1} title="Next Step (→)" />
            <ControlButton onClick={goToEnd} icon={StepForward} title="Jump to End" />
          </div>

          <div className="flex items-center gap-6">
            <SpeedControl speed={speed} onChange={setSpeed} />
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowShortcuts(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-white mb-4">Keyboard Shortcuts</h3>
              <div className="space-y-2">
                {[
                  { key: 'Space', action: 'Play/Pause' },
                  { key: '← →', action: 'Previous/Next Step' },
                  { key: 'Home', action: 'Start Over' },
                  { key: 'End', action: 'Jump to End' },
                  { key: 'F', action: 'Fullscreen' }
                ].map((s) => (
                  <div key={s.key} className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400 text-sm">{s.action}</span>
                    <kbd className="px-2 py-1 bg-slate-800 rounded text-xs font-mono text-white">{s.key}</kbd>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper Components
const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
      ${active ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}
    `}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

const ControlButton = ({ onClick, icon: Icon, disabled, title }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
  >
    <Icon className="w-6 h-6" />
  </button>
);

// Enhanced Array Visualization for Learning
const ArrayVisualization = ({ data, activeIndex, step, compareIndices, getPointerInfo }) => {
  const maxValue = Math.max(...data);
  
  return (
    <div className="w-full max-w-4xl">
      {/* Array Container */}
      <div className="flex items-end justify-center gap-4 h-80 mb-8">
        {data.map((value, index) => {
          const pointers = getPointerInfo(index);
          const isActive = pointers.length > 0;
          const isComparing = compareIndices?.includes(index);
          const height = Math.max(40, (value / maxValue) * 240);
          
          return (
            <motion.div
              key={index}
              initial={false}
              animate={{
                scale: isActive ? 1.15 : isComparing ? 1.08 : 1,
                y: isActive ? -10 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative flex flex-col items-center"
              style={{ minWidth: '70px' }}
            >
              {/* Pointer Indicators */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 flex gap-1">
                <AnimatePresence>
                  {pointers.map((pointer, idx) => (
                    <PointerIndicator 
                      key={`${index}-${pointer.label}`}
                      label={pointer.label} 
                      color={pointer.color}
                      explanation={pointer.explanation}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Value Bar */}
              <motion.div
                animate={{
                  height: height,
                  backgroundColor: isActive ? '#fbbf24' : isComparing ? '#3b82f6' : '#1e293b',
                }}
                className="w-16 rounded-t-2xl border-2 border-b-0 shadow-2xl relative overflow-hidden"
                style={{
                  borderColor: isActive ? '#f59e0b' : isComparing ? '#2563eb' : '#334155',
                  boxShadow: isActive 
                    ? '0 0 40px rgba(251, 191, 36, 0.6), 0 10px 15px -3px rgba(0, 0, 0, 0.5)' 
                    : '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Shine Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"
                  animate={{ opacity: isActive ? [0.5, 0.2, 0.5] : 0.1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Value */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span 
                    animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.6, repeat: isActive ? Infinity : 0 }}
                    className={`font-bold text-xl ${isActive ? 'text-amber-950' : isComparing ? 'text-blue-100' : 'text-slate-400'}`}
                  >
                    {value}
                  </motion.span>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1.5 bg-amber-600"
                  />
                )}
              </motion.div>
              
              {/* Index */}
              <motion.span 
                animate={{ 
                  color: isActive ? '#fbbf24' : '#64748b',
                  fontWeight: isActive ? 700 : 400,
                  scale: isActive ? 1.2 : 1
                }}
                className="text-sm font-mono mt-3"
              >
                [{index}]
              </motion.span>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-500 rounded border-2 border-amber-600" />
          <span className="text-slate-400">Active Element</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded border-2 border-blue-600" />
          <span className="text-slate-400">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-800 rounded border-2 border-slate-700" />
          <span className="text-slate-400">Normal</span>
        </div>
      </div>
    </div>
  );
};

const formatTime = (stepIndex, speed) => {
  const totalMs = stepIndex * speed;
  const seconds = Math.floor(totalMs / 1000);
  const ms = Math.floor((totalMs % 1000) / 10);
  return `${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
};

// Missing icon component
const GraduationCap = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

export default AnimationPlayer;