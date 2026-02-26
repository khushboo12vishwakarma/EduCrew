// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../services/api';
// import Loading from '../components/Loading';
// import mermaid from 'mermaid';

// const StudyMaterialDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [material, setMaterial] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('notes');

//   // Add useEffect for mermaid initialization
// useEffect(() => {
//   if (activeTab === 'flowchart' && material?.flowchart) {
//     mermaid.initialize({ 
//       startOnLoad: true,
//       theme: 'default',
//       securityLevel: 'loose'
//     });
//     mermaid.run();
//   }
// }, [activeTab, material]);

//   useEffect(() => {
//     fetchMaterial();
//   }, [id]);

//   const fetchMaterial = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get(`/study-materials/${id}/`);
//       setMaterial(response.data);
//     } catch (err) {
//       console.error('Error fetching material:', err);
//       setError('Failed to load study material');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <Loading />;
//   if (error) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <p className="text-red-500 mb-4">{error}</p>
//         <button 
//           onClick={() => navigate('/my-study-materials')}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           Back to Materials
//         </button>
//       </div>
//     </div>
//   );
//   if (!material) return <div className="min-h-screen flex items-center justify-center">Material not found</div>;

//   return (
//     <div className="min-h-screen bg-slate-50 py-8">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-6 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => navigate('/my-study-materials')}
//               className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
//             >
//               <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//             <div>
//               <h1 className="text-2xl font-bold text-slate-900">{material.filename}</h1>
//               <p className="text-sm text-slate-500">
//                 Created on {new Date(material.uploaded_at).toLocaleString()}
//               </p>
//             </div>
//           </div>
//           <div className="flex gap-2">
//             {material.file && (
//               <a 
//                 href={material.file} 
//                 download
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                 </svg>
//                 Download
//               </a>
//             )}
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-t-xl border-b border-slate-200">
//           <div className="flex">
//             {[
//               { key: 'notes', label: 'Notes' },
//               { key: 'flashcards', label: 'Flashcards', count: material.flashcards_count },
//               { key: 'quiz', label: 'Quiz', count: material.quiz_count },
//               { key: 'flowchart', label: 'Flowchart' }, // ADDED: Flowchart tab
//             ].map((tab) => (
//               <button
//                 key={tab.key}
//                 onClick={() => setActiveTab(tab.key)}
//                 className={`px-6 py-4 font-medium transition-colors ${
//                   activeTab === tab.key 
//                     ? 'text-blue-600 border-b-2 border-blue-600' 
//                     : 'text-slate-500 hover:text-slate-700'
//                 }`}
//               >
//                 {tab.label}
//                 {tab.count > 0 && (
//                   <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
//                     {tab.count}
//                   </span>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Content */}
//         <div className="bg-white rounded-b-xl p-6 shadow-sm border border-t-0 border-slate-200 min-h-[400px]">
          
//           {/* Notes Tab */}
//           {activeTab === 'notes' && (
//             <div className="prose max-w-none">
//               {material.notes ? (
//                 <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
//                   {material.notes}
//                 </div>
//               ) : material.summary ? (
//                 <div>
//                   <h3 className="text-lg font-bold text-slate-900 mb-4">Summary</h3>
//                   <p className="text-slate-700">{material.summary}</p>
//                 </div>
//               ) : (
//                 <div className="text-center text-slate-500 py-12">
//                   <p>No notes available for this material.</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Flashcards Tab - FIXED */}
//           {activeTab === 'flashcards' && (
//             <div>
//               {material.flashcards && material.flashcards.length > 0 ? (
//                 <div className="grid gap-4">
//                   {material.flashcards.map((card, idx) => (
//                     <Flashcard key={idx} card={card} index={idx} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center text-slate-500 py-12">
//                   <p>No flashcards generated yet.</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Quiz Tab - FIXED */}
//           {activeTab === 'quiz' && (
//             <div>
//               {material.quiz && material.quiz.length > 0 ? (
//                 <div className="space-y-6">
//                   {material.quiz.map((q, idx) => (
//                     <QuizQuestion key={idx} question={q} index={idx} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center text-slate-500 py-12">
//                   <p>No quiz questions available.</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Flowchart Tab - NEW */}
//           {activeTab === 'flowchart' && (
//   <div>
//     {material.flowchart ? (
//       <div className="bg-white p-6 rounded-xl border border-slate-200">
//         <div className="mermaid">
//           {material.flowchart}
//         </div>
//       </div>
//     ) : (
//       <div className="text-center text-slate-500 py-12">
//         <p>No flowchart generated for this material.</p>
//       </div>
//     )}
//   </div>
// )}

//         </div>
//       </div>
//     </div>
//   );
// };

// // FIXED: Flashcard Component with proper question/answer display
// const Flashcard = ({ card, index }) => {
//   const [flipped, setFlipped] = useState(false);

//   return (
//     <div 
//       onClick={() => setFlipped(!flipped)}
//       className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl cursor-pointer hover:shadow-md transition-all border border-blue-100"
//     >
//       <div className="flex items-start gap-4">
//         <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
//           {index + 1}
//         </span>
//         <div className="flex-1">
//           {/* FIXED: Show actual question */}
//           <p className="font-medium text-slate-900 mb-2">Question:</p>
//           <p className="text-slate-700 mb-4 text-lg">{card.question}</p>
          
//           {/* FIXED: Show actual answer when flipped */}
//           {flipped && (
//             <div className="border-t border-blue-200 pt-4 mt-4">
//               <p className="font-medium text-slate-900 mb-2">Answer:</p>
//               <p className="text-slate-700 text-lg">{card.answer}</p>
//             </div>
//           )}
          
//           <p className="text-xs text-slate-400 mt-4">
//             {flipped ? 'Click to hide answer' : 'Click to reveal answer'}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // FIXED: Quiz Component with proper answer checking
// // FIXED QuizQuestion component - replace in StudyMaterialDetail.jsx

// const QuizQuestion = ({ question, index }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [showResult, setShowResult] = useState(false);

//   const handleSelect = (optionIndex) => {
//     if (showResult) return;
//     setSelectedOption(optionIndex);
//     setShowResult(true);
//   };

//   // Get the letter of selected option (A, B, C, D)
//   const selectedLetter = selectedOption !== null 
//     ? String.fromCharCode(65 + selectedOption) 
//     : null;
  
//   // Compare letters
//   const correctAnswerLetter = question.answer.toString().trim().toUpperCase();
//   const isCorrect = selectedLetter === correctAnswerLetter;

//   return (
//     <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
//       <div className="flex items-start gap-4">
//         <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
//           {index + 1}
//         </span>
//         <div className="flex-1">
//           <p className="font-medium text-slate-900 mb-4 text-lg">{question.question}</p>
          
//           <div className="space-y-2">
//             {question.options.map((option, optIdx) => {
//               const optionLetter = String.fromCharCode(65 + optIdx);
//               const isSelected = selectedOption === optIdx;
//               const isCorrectOption = optionLetter === correctAnswerLetter;
              
//               let buttonClass = "w-full text-left p-3 rounded-lg transition-colors border ";
              
//               if (showResult) {
//                 if (isCorrectOption) {
//                   buttonClass += "bg-green-100 text-green-800 border-green-300";
//                 } else if (isSelected && !isCorrect) {
//                   buttonClass += "bg-red-100 text-red-800 border-red-300";
//                 } else {
//                   buttonClass += "bg-white text-slate-600 border-slate-200";
//                 }
//               } else {
//                 buttonClass += isSelected 
//                   ? "bg-blue-100 text-blue-800 border-blue-300"
//                   : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200";
//               }

//               return (
//                 <button
//                   key={optIdx}
//                   onClick={() => handleSelect(optIdx)}
//                   disabled={showResult}
//                   className={buttonClass}
//                 >
//                   <span className="font-bold mr-3">{optionLetter}.</span>
//                   {option}
//                 </button>
//               );
//             })}
//           </div>

//           {showResult && (
//             <div className={`mt-4 p-3 rounded-lg ${
//               isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//             }`}>
//               {isCorrect ? (
//                 <span className="flex items-center gap-2">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   Correct! Well done.
//                 </span>
//               ) : (
//                 <span className="flex items-center gap-2">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                   Incorrect. The correct answer is: <strong>{correctAnswerLetter}</strong>
//                 </span>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
       
// export default StudyMaterialDetail;




// src/pages/StudyMaterialDetail.jsx - COMPLETE WITH MERMAID

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mermaid from 'mermaid';
import api from '../services/api';
import Loading from '../components/Loading';

const StudyMaterialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('notes');

  useEffect(() => {
    fetchMaterial();
  }, [id]);

  // Initialize mermaid when flowchart tab is active
  useEffect(() => {
    if (activeTab === 'flowchart' && material?.flowchart) {
      mermaid.initialize({ 
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        flowchart: { useMaxWidth: true }
      });
      mermaid.run();
    }
  }, [activeTab, material]);

  const fetchMaterial = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/study-materials/${id}/`);
      setMaterial(response.data);
    } catch (err) {
      console.error('Error fetching material:', err);
      setError('Failed to load study material');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/my-study-materials')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
        Back to Materials
        </button>
      </div>
    </div>
  );
  if (!material) return <div className="min-h-screen flex items-center justify-center">Material not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/my-study-materials')}
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{material.filename}</h1>
              <p className="text-sm text-slate-500">
                Created on {new Date(material.uploaded_at).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {material.file && (
              <a 
                href={material.file} 
                download
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </a>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-xl border-b border-slate-200">
          <div className="flex">
            {[
              { key: 'notes', label: 'Notes' },
              { key: 'flashcards', label: 'Flashcards', count: material.flashcards_count },
              { key: 'quiz', label: 'Quiz', count: material.quiz_count },
              { key: 'flowchart', label: 'Flowchart' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.key 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-xl p-6 shadow-sm border border-t-0 border-slate-200 min-h-[400px]">
          
          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="prose max-w-none">
              {material.notes ? (
                <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                  {material.notes}
                </div>
              ) : material.summary ? (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Summary</h3>
                  <p className="text-slate-700">{material.summary}</p>
                </div>
              ) : (
                <div className="text-center text-slate-500 py-12">
                  <p>No notes available for this material.</p>
                </div>
              )}
            </div>
          )}

          {/* Flashcards Tab */}
          {activeTab === 'flashcards' && (
            <div>
              {material.flashcards && material.flashcards.length > 0 ? (
                <div className="grid gap-4">
                  {material.flashcards.map((card, idx) => (
                    <Flashcard key={idx} card={card} index={idx} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-slate-500 py-12">
                  <p>No flashcards generated yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Quiz Tab - FIXED */}
          {activeTab === 'quiz' && (
            <div>
              {material.quiz && material.quiz.length > 0 ? (
                <div className="space-y-6">
                  {material.quiz.map((q, idx) => (
                    <QuizQuestion key={idx} question={q} index={idx} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-slate-500 py-12">
                  <p>No quiz questions available.</p>
                </div>
              )}
            </div>
          )}

          {/* Flowchart Tab - FIXED WITH MERMAID */}
          {activeTab === 'flowchart' && (
            <div>
              {material.flowchart ? (
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Flowchart</h3>
                  <div className="mermaid flex justify-center">
                    {material.flowchart}
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-500 py-12">
                  <p>No flowchart generated for this material.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Flashcard Component
const Flashcard = ({ card, index }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      onClick={() => setFlipped(!flipped)}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl cursor-pointer hover:shadow-md transition-all border border-blue-100"
    >
      <div className="flex items-start gap-4">
        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
          {index + 1}
        </span>
        <div className="flex-1">
          <p className="font-medium text-slate-900 mb-2">Question:</p>
          <p className="text-slate-700 mb-4 text-lg">{card.question}</p>
          
          {flipped && (
            <div className="border-t border-blue-200 pt-4 mt-4">
              <p className="font-medium text-slate-900 mb-2">Answer:</p>
              <p className="text-slate-700 text-lg">{card.answer}</p>
            </div>
          )}
          
          <p className="text-xs text-slate-400 mt-4">
            {flipped ? 'Click to hide answer' : 'Click to reveal answer'}
          </p>
        </div>
      </div>
    </div>
  );
};

// FIXED QuizQuestion Component
const QuizQuestion = ({ question, index }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (optionIndex) => {
    if (showResult) return;
    setSelectedOption(optionIndex);
    setShowResult(true);
  };

  const selectedLetter = selectedOption !== null 
    ? String.fromCharCode(65 + selectedOption) 
    : null;
  
  const correctAnswerLetter = question.answer.toString().trim().toUpperCase();
  const isCorrect = selectedLetter === correctAnswerLetter;

  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
      <div className="flex items-start gap-4">
        <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
          {index + 1}
        </span>
        <div className="flex-1">
          <p className="font-medium text-slate-900 mb-4 text-lg">{question.question}</p>
          
          <div className="space-y-2">
            {question.options.map((option, optIdx) => {
              const optionLetter = String.fromCharCode(65 + optIdx);
              const isSelected = selectedOption === optIdx;
              const isCorrectOption = optionLetter === correctAnswerLetter;
              
              let buttonClass = "w-full text-left p-3 rounded-lg transition-colors border ";
              
              if (showResult) {
                if (isCorrectOption) {
                  buttonClass += "bg-green-100 text-green-800 border-green-300";
                } else if (isSelected && !isCorrect) {
                  buttonClass += "bg-red-100 text-red-800 border-red-300";
                } else {
                  buttonClass += "bg-white text-slate-600 border-slate-200";
                }
              } else {
                buttonClass += isSelected 
                  ? "bg-blue-100 text-blue-800 border-blue-300"
                  : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200";
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelect(optIdx)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <span className="font-bold mr-3">{optionLetter}.</span>
                  {option}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className={`mt-4 p-3 rounded-lg ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isCorrect ? (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Correct! Well done.
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Incorrect. The correct answer is: <strong>{correctAnswerLetter}</strong>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialDetail;