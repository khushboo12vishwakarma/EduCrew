// import { motion } from "framer-motion";

// const VisualEngine = ({ step }) => {
//   if (!step) return null;

//   // Detect array automatically
//   const arrayKey = step.state
//     ? Object.keys(step.state).find(key =>
//         Array.isArray(step.state[key])
//       )
//     : null;

//   const array = arrayKey ? step.state[arrayKey] : null;
//   const activeIndex = step?.highlight?.array_index;

//   const width = 800;
//   const height = 250;

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
//       <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>

//   {/* CONDITION DIAMOND */}
//   {step.flow?.type === "condition" && (
//     <g>
//       <motion.polygon
//         points="350,40 400,90 350,140 300,90"
//         fill="#ffffff"
//         stroke="#ef4444"
//         strokeWidth="3"
//       />
//       <text
//         x="350"
//         y="95"
//         textAnchor="middle"
//         fontSize="14"
//         fill="#111827"
//       >
//         {step.flow.condition}
//       </text>
//     </g>
//   )}

//   {/* ARRAY VISUALIZATION */}
//  {array && array.map((value, index) => {
//   const x = 80 + index * 90;
//   const y = 120;

//   // Detect pointer automatically from state (i)
//   const pointerIndex =
//     typeof step.state?.i === "number"
//       ? step.state.i
//       : null;

//   const isActive =
//     index === pointerIndex ||
//     index === activeIndex;

//   return (
//     <g key={index}>
//       <motion.rect
//         x={x}
//         y={y}
//         width="70"
//         height="70"
//         rx="12"
//         fill={isActive ? "#facc15" : "#ffffff"}
//         stroke="#4f46e5"
//         strokeWidth="3"
//         animate={{
//           scale: isActive ? 1.15 : 1
//         }}
//         transition={{ duration: 0.3 }}
//       />

//       <text
//         x={x + 35}
//         y={y + 42}
//         textAnchor="middle"
//         fontSize="20"
//         fontWeight="bold"
//       >
//         {value}
//       </text>

//       {/* Pointer Arrow */}
//       {isActive && (
//         <>
//           <line
//             x1={x + 35}
//             y1={y - 20}
//             x2={x + 35}
//             y2={y}
//             stroke="#ef4444"
//             strokeWidth="3"
//           />
//           <text
//             x={x + 35}
//             y={y - 30}
//             textAnchor="middle"
//             fontSize="14"
//             fill="#ef4444"
//             fontWeight="bold"
//           >
//             i
//           </text>
//         </>
//       )}
//     </g>
//   );
// })}


//   {/* VARIABLE BOXES (ALWAYS SHOW) */}
//   {!array && Object.entries(step.state || {}).map(([key, value], i) => {
//     const x = 100 + i * 200;
//     const y = 120;

//     return (
//       <g key={key}>
//         <motion.rect
//           x={x}
//           y={y}
//           width="150"
//           height="80"
//           rx="15"
//           fill="#ffffff"
//           stroke="#6366f1"
//           strokeWidth="3"
//           animate={{ scale: 1.05 }}
//         />

//         <text
//           x={x + 75}
//           y={y + 30}
//           textAnchor="middle"
//           fontSize="14"
//           fill="#6b7280"
//         >
//           {key}
//         </text>

//         <text
//           x={x + 75}
//           y={y + 55}
//           textAnchor="middle"
//           fontSize="18"
//           fontWeight="bold"
//           fill="#111827"
//         >
//           {String(value)}
//         </text>

        
//       </g>
//     );
//   })}

// </svg>

//     </div>
//   );
// };

// export default VisualEngine;





import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const VisualEngine = ({ step }) => {
  if (!step) return null;

  const { state, highlight, flow, description } = step;
  
  // Detect data structures
  const arrayKey = state ? Object.keys(state).find(key => Array.isArray(state[key])) : null;
  const array = arrayKey ? state[arrayKey] : null;
  const activeIndex = highlight?.array_index;
  const pointerIndex = typeof state?.i === "number" ? state.i : null;
  const leftPointer = highlight?.left;
  const rightPointer = highlight?.right;
  const midPointer = highlight?.mid;

  // Canvas dimensions
  const width = 800;
  const height = 300;
  const boxSize = 60;
  const gap = 20;
  
  // Calculate centering
  const totalWidth = array ? array.length * (boxSize + gap) - gap : 0;
  const startX = (width - totalWidth) / 2;
  const centerY = height / 2;

  // Get value color based on state
  const getBoxColor = (index) => {
    if (index === activeIndex || index === pointerIndex) return { fill: "#fbbf24", stroke: "#f59e0b" };
    if (index === leftPointer) return { fill: "#60a5fa", stroke: "#3b82f6" };
    if (index === rightPointer) return { fill: "#f87171", stroke: "#ef4444" };
    if (index === midPointer) return { fill: "#a78bfa", stroke: "#8b5cf6" };
    if (highlight?.sorted?.includes(index)) return { fill: "#34d399", stroke: "#10b981" };
    return { fill: "#ffffff", stroke: "#d1d5db" };
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg 
        width="100%" 
        height={height} 
        viewBox={`0 0 ${width} ${height}`}
        className="min-w-[800px]"
      >
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Flow Visualization (if applicable) */}
        {flow?.type === "condition" && (
          <g transform={`translate(${width/2}, 60)`}>
            <motion.polygon
              points="0,-40 60,0 0,40 -60,0"
              fill="#fef2f2"
              stroke="#ef4444"
              strokeWidth="3"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-semibold fill-red-700"
            >
              {flow.condition}
            </text>
            {/* Yes/No labels */}
            <text x="80" y="0" className="text-xs fill-green-600 font-medium">Yes</text>
            <text x="-80" y="0" className="text-xs fill-red-600 font-medium">No</text>
          </g>
        )}

        {/* Array Visualization */}
        {array && (
          <g transform={`translate(0, ${centerY - boxSize/2})`}>
            {array.map((value, index) => {
              const x = startX + index * (boxSize + gap);
              const colors = getBoxColor(index);
              const isActive = index === activeIndex || index === pointerIndex || index === leftPointer || index === rightPointer || index === midPointer;

              return (
                <g key={index}>
                  {/* Connection Line (for swaps) */}
                  {highlight?.swap_indices?.includes(index) && (
                    <motion.path
                      d={`M ${x + boxSize/2} ${boxSize + 10} Q ${x + boxSize/2} ${boxSize + 40} ${startX + highlight.swap_indices.find(i => i !== index) * (boxSize + gap) + boxSize/2} ${boxSize + 10}`}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                    />
                  )}

                  {/* Box */}
                  <motion.rect
                    x={x}
                    y={0}
                    width={boxSize}
                    height={boxSize}
                    rx={12}
                    fill={colors.fill}
                    stroke={colors.stroke}
                    strokeWidth={isActive ? 4 : 2}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: isActive ? 1.1 : 1, 
                      opacity: 1,
                      y: isActive ? -5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />

                  {/* Value */}
                  <text
                    x={x + boxSize/2}
                    y={boxSize/2 + 6}
                    textAnchor="middle"
                    className={`text-lg font-bold ${isActive ? 'fill-gray-900' : 'fill-gray-700'}`}
                  >
                    {value}
                  </text>

                  {/* Index */}
                  <text
                    x={x + boxSize/2}
                    y={boxSize + 20}
                    textAnchor="middle"
                    className="text-xs fill-gray-400 font-medium"
                  >
                    {index}
                  </text>

                  {/* Pointer Labels */}
                  <AnimatePresence>
                    {index === pointerIndex && (
                      <motion.g
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <text
                          x={x + boxSize/2}
                          y={-15}
                          textAnchor="middle"
                          className="text-sm font-bold fill-amber-600"
                        >
                          i
                        </text>
                        <line
                          x1={x + boxSize/2}
                          y1={-10}
                          x2={x + boxSize/2}
                          y2={0}
                          stroke="#f59e0b"
                          strokeWidth="3"
                          markerEnd="url(#arrowhead)"
                        />
                      </motion.g>
                    )}

                    {index === leftPointer && (
                      <motion.g
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <text
                          x={x + boxSize/2}
                          y={boxSize + 45}
                          textAnchor="middle"
                          className="text-sm font-bold fill-blue-600"
                        >
                          left
                        </text>
                        <line
                          x1={x + boxSize/2}
                          y1={boxSize + 35}
                          x2={x + boxSize/2}
                          y2={boxSize + 5}
                          stroke="#3b82f6"
                          strokeWidth="3"
                        />
                      </motion.g>
                    )}

                    {index === rightPointer && (
                      <motion.g
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <text
                          x={x + boxSize/2}
                          y={boxSize + 45}
                          textAnchor="middle"
                          className="text-sm font-bold fill-red-600"
                        >
                          right
                        </text>
                        <line
                          x1={x + boxSize/2}
                          y1={boxSize + 35}
                          x2={x + boxSize/2}
                          y2={boxSize + 5}
                          stroke="#ef4444"
                          strokeWidth="3"
                        />
                      </motion.g>
                    )}

                    {index === midPointer && (
                      <motion.g
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <text
                          x={x + boxSize/2}
                          y={-15}
                          textAnchor="middle"
                          className="text-sm font-bold fill-purple-600"
                        >
                          mid
                        </text>
                        <line
                          x1={x + boxSize/2}
                          y1={-10}
                          x2={x + boxSize/2}
                          y2={0}
                          stroke="#8b5cf6"
                          strokeWidth="3"
                        />
                      </motion.g>
                    )}
                  </AnimatePresence>
                </g>
              );
            })}

            {/* Range Highlight */}
            {highlight?.range && (
              <motion.rect
                x={startX + highlight.range[0] * (boxSize + gap) - 10}
                y={-10}
                width={(highlight.range[1] - highlight.range[0] + 1) * (boxSize + gap) - gap + 20}
                height={boxSize + 20}
                rx={20}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray="8,4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.3, scale: 1 }}
              />
            )}
          </g>
        )}

        {/* Variable Boxes (when no array) */}
        {!array && state && Object.entries(state).map(([key, value], i) => {
          const x = 100 + i * 180;
          const y = centerY - 40;
          const isHighlighted = highlight?.[key] !== undefined;

          return (
            <motion.g
              key={key}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              transform={`translate(${x}, ${y})`}
            >
              <motion.rect
                x={0}
                y={0}
                width={140}
                height={80}
                rx={16}
                fill={isHighlighted ? "#fef3c7" : "#ffffff"}
                stroke={isHighlighted ? "#f59e0b" : "#6366f1"}
                strokeWidth={isHighlighted ? 4 : 3}
                animate={{ 
                  scale: isHighlighted ? [1, 1.05, 1] : 1,
                }}
                transition={{ duration: 0.5, repeat: isHighlighted ? Infinity : 0 }}
              />

              <text
                x={70}
                y={28}
                textAnchor="middle"
                className="text-sm font-semibold fill-gray-500 uppercase tracking-wider"
              >
                {key}
              </text>

              <text
                x={70}
                y={55}
                textAnchor="middle"
                className={`text-xl font-bold ${isHighlighted ? 'fill-amber-700' : 'fill-gray-800'}`}
              >
                {String(value).length > 10 
                  ? String(value).substring(0, 10) + '...' 
                  : String(value)
                }
              </text>
            </motion.g>
          );
        })}

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs">
        {array && (
          <>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-amber-400 border-2 border-amber-500" />
              <span className="text-gray-600">Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-blue-400 border-2 border-blue-500" />
              <span className="text-gray-600">Left</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-red-400 border-2 border-red-500" />
              <span className="text-gray-600">Right</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-purple-400 border-2 border-purple-500" />
              <span className="text-gray-600">Mid</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-emerald-400 border-2 border-emerald-500" />
              <span className="text-gray-600">Sorted</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VisualEngine;