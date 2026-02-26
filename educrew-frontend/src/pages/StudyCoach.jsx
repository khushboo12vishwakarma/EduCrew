import React, {useEffect, useRef,  useState, useCallback, useLayoutEffect } from 'react';
import { studyCoachAPI } from '../services/api';
import mermaid from 'mermaid';
import { jsPDF } from 'jspdf';
import {
  DocumentTextIcon,
  CloudArrowUpIcon,
  SparklesIcon,
  AcademicCapIcon,
  LightBulbIcon,
  QuestionMarkCircleIcon,
  ChartBarIcon,
  BookOpenIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  DocumentArrowDownIcon,
  ClipboardDocumentCheckIcon,
  ArrowRightIcon,
  FlagIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

/* ================= CONSTANTS ================= */
const FILE_SIZE_LIMIT = 10 * 1024 * 1024;
const MIN_TEXT_LENGTH = 10;
const ACCEPTED_FILE_TYPES = ['txt', 'pdf'];

const INPUT_MODES = {
  TEXT: 'text',
  FILE: 'file'
};

const TABS = {
  SUMMARY: 'summary',
  NOTES: 'notes',
  FLASHCARDS: 'flashcards',
  QUIZ: 'quiz',
  FLOWCHART: 'flowchart'
};

/* ================= VALIDATION ================= */
const validateInput = (mode, text, file) => {
  if (mode === INPUT_MODES.TEXT) {
    if (!text?.trim()) return 'Please enter some text to get started';
    if (text.trim().length < MIN_TEXT_LENGTH) {
      return `Text must be at least ${MIN_TEXT_LENGTH} characters long`;
    }
  } else {
    if (!file) return 'Please select a file to upload';
    const ext = file.name.split('.').pop().toLowerCase();
    if (!ACCEPTED_FILE_TYPES.includes(ext)) {
      return `Invalid file type. Please upload ${ACCEPTED_FILE_TYPES.map(t => t.toUpperCase()).join(' or ')} files only`;
    }
    if (file.size > FILE_SIZE_LIMIT) {
      return 'File size exceeds 10MB limit. Please choose a smaller file';
    }
  }
  return null;
};

// // Custom hook for Mermaid rendering
// const useMermaid = (chartCode) => {
//   const ref = useRef(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const render = async () => {
//       if (!chartCode || !ref.current) return;

//       try {
//         setIsLoading(true);
//         setError(null);

//         // Init Mermaid once
//         if (!mermaid.isInitialized()) {
//           mermaid.initialize({
//             startOnLoad: false,
//             theme: 'default', // or 'dark', 'forest', etc.
//             themeVariables: {
//               primaryColor: '#1e40af', // Tailwind blue
//               primaryTextColor: '#ffffff',
//               primaryBorderColor: '#1e40af',
//               lineColor: '#93c5fd',
//             },
//           });
//         }

//         // Render
//         await mermaid.run({
//           nodes: [ref.current],
//           suppressErrors: false,
//         });
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     render();
//   }, [chartCode]);

//   return { ref, isLoading, error };
// };


const downloadSvg = (svgString, filename = 'flowchart.svg') => {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/* ================= UTILITY COMPONENTS ================= */
const ModeButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base
      transition-all duration-200 border-2
      ${active
        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:shadow-sm'
      }
    `}
  >
    <Icon className="w-5 h-5" />
    {label}
  </button>
);

const TabButton = ({ active, onClick, icon: Icon, label, count }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-sm
      transition-all duration-200
      ${active
        ? 'bg-blue-600 text-white shadow-md'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }
    `}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
    {count !== undefined && (
      <span className={`
        text-xs px-2 py-0.5 rounded-full font-semibold
        ${active ? 'bg-white/30 text-white' : 'bg-white text-gray-700'}
      `}>
        {count}
      </span>
    )}
  </button>
);

const ErrorAlert = ({ message }) => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
    <div className="flex items-start gap-3">
      <XCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
      <div>
        <h3 className="text-sm font-semibold text-red-800">Error</h3>
        <p className="text-sm text-red-700 mt-1">{message}</p>
      </div>
    </div>
  </div>
);

const FileInfo = ({ file, onRemove }) => (
  <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-200">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
        <DocumentTextIcon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{file.name}</p>
        <p className="text-xs text-gray-600">{(file.size / 1024).toFixed(2)} KB</p>
      </div>
    </div>
    <button
      type="button"
      onClick={onRemove}
      className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded transition-colors"
    >
      Remove
    </button>
  </div>
);

/* ================= FEATURE CARDS ================= */
const FeatureCard = ({ icon: Icon, title, description, gradient }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className={`w-12 h-12 mb-4 rounded-lg ${gradient} flex items-center justify-center`}>
      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
    </div>
    <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);

/* ================= CONTENT SECTIONS ================= */
/* ================= PERFECT SUMMARY SECTION ================= */
const SummarySection = ({ summary }) => {
  // Advanced cleaning that handles your specific AI output format
  const processSummary = (text) => {
    if (!text) return '';
    
    return text
      // Remove all citations completely
      .replace(/\[\d+\](\[\d+\])*/g, '')
      // Remove markdown formatting
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      // Fix line breaks and spacing
      .replace(/\n\s*\n/g, '\n\n')
      .replace(/\s+/g, ' ')
      // Fix punctuation spacing
      .replace(/\s+([.,;:!?])/g, '$1')
      .replace(/([a-z])\s+([A-Z])/g, '$1. $2')
      // Clean up common AI artifacts
      .replace(/-\s*([a-z])/, ': $1')
      .trim();
  };

  // Split into properly formatted paragraphs
  const formatParagraphs = (text) => {
    const cleaned = processSummary(text);
    
    // Split by double newlines or long sentences
    return cleaned
      .split(/\n\s*\n|\.\s*(?=[A-Z][a-z])/)
      .map(p => p.trim())
      .filter(p => p.length > 20) // Only keep meaningful paragraphs
      .slice(0, 5); // Limit to 5 paragraphs max
  };

  const paragraphs = formatParagraphs(summary);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
          <SparklesIcon className="w-7 h-7 text-white" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">AI-Generated Summary</h2>
          <p className="text-gray-600 text-lg mt-1">Key insights from your study material</p>
        </div>
      </div>
      
      {/* Summary Container */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8 lg:p-10 space-y-6">
          {/* Main paragraphs */}
          <div className="space-y-5">
            {paragraphs.map((paragraph, index) => (
              <div key={index} className="group">
                <p className="text-gray-900 text-lg leading-relaxed tracking-wide hyphens-auto 
                             first:font-medium first:text-xl first:mb-1
                             hover:text-gray-800 transition-colors">
                  {paragraph}
                </p>
                {index < paragraphs.length - 1 && (
                  <div className="h-px bg-gradient-to-r from-blue-200 to-transparent my-4 mx-4 opacity-50 group-hover:opacity-75 transition-opacity" />
                )}
              </div>
            ))}
          </div>
          
          {/* Action prompt */}
          <div className="pt-6 border-t border-gray-100">
            <p className="text-blue-600 text-sm font-medium italic text-center">
              ✨ Ready to test your understanding? Try the flashcards or quiz below!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


const NotesSection = ({ notes, filename = 'study-notes' }) => {
  const [downloadStatus, setDownloadStatus] = useState('');

  // Download as TXT file
  const downloadTxt = () => {
    if (!notes?.trim()) return;

    const blob = new Blob([notes], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `${filename}.txt`;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadStatus('Downloaded as TXT!');
    setTimeout(() => setDownloadStatus(''), 2000);
  };

  // Download as PDF file
  const downloadPdf = () => {
    if (!notes?.trim()) return;

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const textWidth = pageWidth - 2 * margin;
      const lineHeight = 7;
      let yPosition = margin;

      // Title
      pdf.setFontSize(20);
      pdf.setFont(undefined, 'bold');
      pdf.text('Study Notes', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // Date
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(128, 128, 128);
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;

      // Divider line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;

      // Content
      pdf.setFontSize(11);
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(0, 0, 0);

      const splitText = pdf.splitTextToSize(notes, textWidth);

      splitText.forEach((line) => {
        // Check if we need a new page
        if (yPosition + lineHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;

          // Add page number
          pdf.setFontSize(9);
          pdf.setTextColor(150, 150, 150);
          pdf.text(`Page ${pdf.internal.pages.length - 1}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
          pdf.setFontSize(11);
          pdf.setTextColor(0, 0, 0);
        }

        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });

      // Add page number to last page
      pdf.setFontSize(9);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`Page ${pdf.internal.pages.length - 1}`, pageWidth / 2, pageHeight - 10, { align: 'center' });

      // Save PDF
      pdf.save(`${filename}.pdf`);

      setDownloadStatus('Downloaded as PDF!');
      setTimeout(() => setDownloadStatus(''), 2000);
    } catch (error) {
      console.error('PDF generation error:', error);
      setDownloadStatus('PDF generation failed');
      setTimeout(() => setDownloadStatus(''), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Download Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
            <BookOpenIcon className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Structured Notes</h2>
        </div>
        
        {/* Download Buttons */}
        <div className="flex gap-2 flex-wrap">
          {/* TXT Download */}
          <button
            onClick={downloadTxt}
            disabled={!notes?.trim()}
            className={`
              px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-1 shadow-sm
              ${notes?.trim()
                ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
            title="Download notes as TXT file"
          >
            <DocumentArrowDownIcon className="w-4 h-4" />
            TXT
          </button>

          {/* PDF Download */}
          <button
            onClick={downloadPdf}
            disabled={!notes?.trim()}
            className={`
              px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-1 shadow-sm
              ${notes?.trim()
                ? 'bg-red-600 hover:bg-red-700 text-white hover:shadow-md'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
            title="Download notes as PDF file"
          >
            <DocumentArrowDownIcon className="w-4 h-4" />
            PDF
          </button>

          {/* Status Message */}
          {downloadStatus && (
            <div className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 bg-green-100 text-green-800">
              ✓ {downloadStatus}
            </div>
          )}
        </div>
      </div>

      {/* Notes Content */}
      <div className="bg-white border-2 border-gray-200 rounded-xl shadow-md overflow-hidden">
        <div className="p-6 lg:p-8 max-h-[70vh] overflow-y-auto">
          <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed text-sm lg:text-base">
            {notes || 'No notes generated yet.'}
          </pre>
        </div>
      </div>

      {/* Usage Tip */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <LightBulbIcon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-emerald-900 mb-1 text-sm">💡 Download Options</h4>
            <p className="text-sm text-emerald-800 leading-relaxed">
              <strong>TXT:</strong> Universal format, use anywhere (Notepad, Word, etc.)
              <br />
              <strong>PDF:</strong> Professional format, perfect for printing and sharing!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


const FlashcardsSection = ({ flashcards }) => {
  const [flipped, setFlipped] = useState({});

  const toggleFlip = (index) => {
    setFlipped(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
          <LightBulbIcon className="w-5 h-5 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Flashcards</h2>
        <span className="text-base text-gray-500 font-medium">({flashcards.length} cards)</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashcards.map((card, index) => (
          <div
            key={index}
            onClick={() => toggleFlip(index)}
            className="cursor-pointer"
          >
            <div className={`
              relative ${flipped[index]
                ? 'bg-green-50 border-green-300'
                : 'bg-yellow-50 border-yellow-300'}
              border-2 rounded-lg p-5 hover:shadow-md transition-all
              min-h-[180px] flex flex-col justify-center
            `}>
              <div className="absolute top-2 right-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded
                  ${flipped[index] ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                  {index + 1}
                </span>
              </div>
              {!flipped[index] ? (
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-600 mb-2 font-semibold flex items-center gap-1">
                    <QuestionMarkCircleIcon className="w-4 h-4" />
                    Question
                  </p>
                  <p className="text-gray-900 font-semibold leading-relaxed mb-3">{card.q}</p>
                  <p className="text-xs text-gray-500 text-center italic">
                    Click to reveal answer
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-xs uppercase tracking-wide text-green-700 mb-2 font-semibold flex items-center gap-1">
                    <CheckCircleIcon className="w-4 h-4" />
                    Answer
                  </p>
                  <p className="text-gray-800 leading-relaxed mb-3">{card.a}</p>
                  <p className="text-xs text-gray-500 text-center italic">
                    Click to show question
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const QuizSection = ({ quiz, filename = 'quiz-results' }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [performanceHistory, setPerformanceHistory] = useState([]);

  // Load performance history
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`quiz_performance_${filename}`);
      if (saved) setPerformanceHistory(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to load quiz history');
    }
  }, [filename]);

  // Save performance
  const savePerformance = (score, total) => {
    const today = new Date().toISOString().split('T')[0];
    const percentage = Math.round((score / total) * 100);
    
    const newEntry = { date: today, score, total, percentage };
    let updated = performanceHistory.filter(item => item.date !== today);
    updated.unshift(newEntry);
    updated = updated.slice(0, 7);
    
    setPerformanceHistory(updated);
    localStorage.setItem(`quiz_performance_${filename}`, JSON.stringify(updated));
  };

  // Get letter from index (0 -> A, 1 -> B, etc.)
  const getLetter = (index) => String.fromCharCode(65 + index);

  // Calculate score
  const calculateScore = () => {
    return quiz.reduce((score, q, i) => 
      userAnswers[i] === q.answer ? score + 1 : score, 0
    );
  };

  // Select answer
  const selectAnswer = (answerLetter) => {
    if (quizCompleted) return;
    setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: answerLetter }));
  };

  // Next question or finish
  const nextOrFinish = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const score = calculateScore();
      savePerformance(score, quiz.length);
      setQuizCompleted(true);
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizCompleted(false);
    setIsReviewing(false);
  };

  // Toggle review
  const toggleReview = () => {
    setIsReviewing(!isReviewing);
  };

  // Get score message based on percentage
  const getScoreMessage = (percentage) => {
    if (percentage >= 80) return { 
      title: "Outstanding Performance!", 
      subtitle: "You've mastered this material!",
      color: "emerald",
      gradient: "from-emerald-500 to-teal-600",
      ringColor: "#10b981"
    };
    if (percentage >= 60) return { 
      title: "Great Job!", 
      subtitle: "You're on the right track!",
      color: "blue",
      gradient: "from-blue-500 to-indigo-600",
      ringColor: "#3b82f6"
    };
    if (percentage >= 40) return { 
      title: "Good Effort!", 
      subtitle: "Keep practicing to improve!",
      color: "orange",
      gradient: "from-orange-500 to-amber-600",
      ringColor: "#f97316"
    };
    return { 
      title: "Keep Learning!", 
      subtitle: "Review the material and try again!",
      color: "rose",
      gradient: "from-rose-500 to-pink-600",
      ringColor: "#f43f5e"
    };
  };

  if (!quiz?.length) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <QuestionMarkCircleIcon className="w-10 h-10 text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg">No quiz questions available</p>
      </div>
    );
  }

  const currentQuestion = quiz[currentQuestionIndex];
  const hasAnsweredCurrent = !!userAnswers[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quiz.length) * 100;
  const finalScore = calculateScore();
  const percentage = Math.round((finalScore / quiz.length) * 100);
  const scoreMessage = getScoreMessage(percentage);

  // Quiz in Progress
  if (!quizCompleted) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#4f46e5] rounded-2xl flex items-center justify-center shadow-lg">
              <QuestionMarkCircleIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Practice Quiz</h2>
              <p className="text-gray-500 font-medium">{quiz.length} Questions</p>
            </div>
          </div>
          <div className="bg-gray-100 px-5 py-3 rounded-xl flex items-center gap-2">
            <span className="text-2xl font-bold text-[#4f46e5]">{currentQuestionIndex + 1}</span>
            <span className="text-gray-400 text-xl">/</span>
            <span className="text-xl font-semibold text-gray-600">{quiz.length}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-[#4f46e5] h-full transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-10">
          {/* Question */}
          <h3 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentQuestion.options.map((option, index) => {
              const letter = getLetter(index);
              const isSelected = userAnswers[currentQuestionIndex] === letter;

              return (
                <button
                  key={index}
                  onClick={() => selectAnswer(letter)}
                  className={`
                    group relative p-5 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4
                    ${isSelected 
                      ? 'border-[#4f46e5] bg-[#eef2ff] shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center font-bold text-base transition-all
                    ${isSelected 
                      ? 'bg-[#4f46e5] text-white' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                    }
                  `}>
                    {letter}
                  </div>
                  <span className={`flex-grow font-medium text-base ${isSelected ? 'text-[#4f46e5]' : 'text-gray-700'}`}>
                    {option}
                  </span>
                  {isSelected && (
                    <CheckIcon className="w-6 h-6 text-[#4f46e5] flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 px-4 py-2.5 text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowPathIcon className="w-4 h-4" />
              Reset
            </button>

            <button
              onClick={nextOrFinish}
              disabled={!hasAnsweredCurrent}
              className={`
                flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all
                ${hasAnsweredCurrent
                  ? 'bg-[#4f46e5] text-white hover:bg-[#4338ca] shadow-lg shadow-indigo-500/25'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {currentQuestionIndex === quiz.length - 1 ? (
                <>
                  Finish Quiz
                  <FlagIcon className="w-5 h-5" />
                </>
              ) : (
                <>
                  Next Question
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results View
  return (
    <div className="space-y-6">
      {/* Score Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
        {/* Circular Progress */}
        <div className="mb-6 inline-flex items-center justify-center relative">
          <svg className="w-32 h-32 -rotate-90">
            <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle 
              cx="64" 
              cy="64" 
              r="56" 
              fill="none" 
              stroke={scoreMessage.ringColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="351.86"
              strokeDashoffset={351.86 - (351.86 * percentage) / 100}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-gray-900">{percentage}%</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide mt-1">Score</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-1">{scoreMessage.title}</h2>
        <p className={`text-sm font-semibold mb-1 text-${scoreMessage.color}-600`}>{scoreMessage.subtitle}</p>
        <p className="text-gray-500 text-sm mb-8">
          You answered <span className="font-semibold text-gray-700">{finalScore}</span> out of <span className="font-semibold text-gray-700">{quiz.length}</span> questions correctly
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={toggleReview}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ClipboardDocumentCheckIcon className="w-5 h-5" />
            {isReviewing ? 'Hide Review' : 'Review Answers'}
          </button>
          <button
            onClick={resetQuiz}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#4f46e5] text-white font-semibold rounded-lg hover:bg-[#4338ca] transition-colors shadow-lg shadow-indigo-500/25"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Retake Quiz
          </button>
        </div>
      </div>

      {/* Review Section */}
      {isReviewing && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Detailed Review</h3>
                <p className="text-sm text-gray-500">Analyze your performance question by question</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-gray-600">Correct</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                  <span className="text-gray-600">Incorrect</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {quiz.map((question, idx) => {
              const userAns = userAnswers[idx];
              const isCorrect = userAns === question.answer;
              
              return (
                <div key={idx} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`
                      flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                      ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}
                    `}>
                      {isCorrect ? (
                        <CheckIcon className="w-6 h-6" />
                      ) : (
                        <XMarkIcon className="w-6 h-6" />
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Question {idx + 1}</span>
                        <span className={`
                          px-2 py-0.5 text-xs font-bold rounded
                          ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}
                        `}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      
                      <h4 className="text-base font-bold text-gray-900 mb-4">{question.question}</h4>
                      
                      {/* Options */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {question.options.map((opt, optIdx) => {
                          const optLetter = getLetter(optIdx);
                          const isSelected = userAns === optLetter;
                          const isCorrectOpt = question.answer === optLetter;
                          
                          let cardClass = "p-4 rounded-lg border flex items-center gap-3 text-sm ";
                          let icon = null;
                          
                          if (isCorrectOpt && isSelected) {
                            // Correctly selected
                            cardClass += "bg-emerald-50 border-emerald-200";
                            icon = <CheckIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />;
                          } else if (isCorrectOpt && !isSelected) {
                            // Missed correct answer
                            cardClass += "bg-emerald-50/50 border-emerald-200";
                            icon = <span className="text-xs font-bold text-emerald-600">Correct</span>;
                          } else if (isSelected && !isCorrectOpt) {
                            // Wrong selection
                            cardClass += "bg-rose-50 border-rose-200";
                            icon = <XMarkIcon className="w-4 h-4 text-rose-600 flex-shrink-0" />;
                          } else {
                            // Not selected
                            cardClass += "bg-gray-50 border-gray-200 text-gray-500";
                          }

                          return (
                            <div key={optIdx} className={cardClass}>
                              <div className={`
                                flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm
                                ${isCorrectOpt ? 'bg-emerald-500 text-white' : isSelected ? 'bg-rose-500 text-white' : 'bg-white border border-gray-300 text-gray-600'}
                              `}>
                                {optLetter}
                              </div>
                              <span className={`flex-grow ${isCorrectOpt ? 'text-emerald-900 font-medium' : isSelected ? 'text-rose-900' : 'text-gray-600'}`}>
                                {opt}
                              </span>
                              {icon}
                            </div>
                          );
                        })}
                      </div>
                      
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const FlowchartSection = ({ flowchart, filename = 'study-flowchart' }) => {
  const containerRef = useRef(null);
  const [svg, setSvg] = useState('');
  const [isRendering, setIsRendering] = useState(false);
  const [renderError, setRenderError] = useState(null);
  const [copyStatus, setCopyStatus] = useState(false);
  const renderId = useRef(0);

  useLayoutEffect(() => {
    if (!flowchart?.trim()) return;

    const currentId = ++renderId.current;
    setIsRendering(true);
    setRenderError(null);

    const renderMermaid = async () => {
      try {
        // Clear previous content
        if (containerRef.current) containerRef.current.innerHTML = '';

        // 1. Pre-render validation
        const isValid = await mermaid.parse(flowchart, { suppressErrors: false });
        
        if (isValid) {
          const { svg: newSvg } = await mermaid.render(
            `mermaid-${Date.now()}`,
            flowchart
          );
          
          if (currentId === renderId.current) {
            setSvg(newSvg);
          }
        }
      } catch (error) {
        console.error('Mermaid render failed:', error);
        if (currentId === renderId.current) {
          setRenderError(error.message || 'Invalid flowchart syntax');
        }
      } finally {
        if (currentId === renderId.current) {
          setIsRendering(false);
        }
      }
    };

    const timeoutId = setTimeout(renderMermaid, 150);
    return () => clearTimeout(timeoutId);
  }, [flowchart]);

  const handleCopy = () => {
    navigator.clipboard.writeText(flowchart);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
            <ChartBarIcon className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Visual Flowchart</h2>
        </div>

        <div className="flex gap-2">
          {/* Copy Code Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            {copyStatus ? (
              <CheckCircleIcon className="w-4 h-4 text-green-500" />
            ) : (
              <DocumentTextIcon className="w-4 h-4 text-gray-500" />
            )}
            {copyStatus ? 'Copied!' : 'Copy Mermaid Code'}
          </button>

          {/* Download SVG (only if success) */}
          {!renderError && svg && (
            <button
              onClick={() => downloadSvg(svg, `${filename}.svg`)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              Download SVG
            </button>
          )}
        </div>
      </div>

      {/* Main Display Area */}
      <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden min-h-[300px] flex flex-col">
        {renderError ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center bg-green-50">
            <XCircleIcon className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-lg font-bold text-green-900">Rendering Error</h3>
            <p className="text-sm text-green-700 mb-6 max-w-md">
              The AI generated a complex flowchart that Mermaid couldn't visualize automatically. 
              You can copy the code and fix it in the official editor.
            </p>
            <div className="w-full max-w-2xl bg-gray-900 rounded-lg p-4 text-left overflow-x-auto">
               <pre className="text-pink-400 text-xs font-mono">{flowchart}</pre>
            </div>
            {/* <a 
              href="https://mermaid.live/" 
              target="_blank" 
              rel="noreferrer"
              className="mt-4 text-indigo-600 font-semibold hover:underline text-sm"
            >
              Open Mermaid Live Editor →
            </a> */}
          </div>
        ) : (
          <div 
            className={`flex-1 p-6 transition-opacity duration-300 ${isRendering ? 'opacity-30' : 'opacity-100'}`}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </div>
       <div className="flex justify-center">
  <a
    href="https://mermaid.live/"
    target="_blank"
    rel="noreferrer"
    className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-300 text-black rounded-lg text-sm font-medium hover:bg-indigo-400 shadow-sm"
  >
    <span>Open Mermaid Live Editor →</span>
  </a>
</div>

    </div>
  );
};


/* ================= MAIN COMPONENT ================= */
const StudyCoach = () => {
  const [state, setState] = useState({
    inputMode: INPUT_MODES.TEXT,
    textInput: '',
    file: null,
    result: null,
    loading: false,
    activeTab: TABS.SUMMARY,
    error: ''
  });

  const updateState = useCallback((updates) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  /* ================= HANDLERS ================= */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const validationError = validateInput(state.inputMode, state.textInput, state.file);
    if (validationError) {
      updateState({ error: validationError });
      return;
    }

    const formData = new FormData();
    if (state.inputMode === INPUT_MODES.TEXT) {
      formData.append('text', state.textInput.trim());
    } else {
      formData.append('file', state.file);
    }

    updateState({ loading: true, error: '', result: null });

    try {
      const response = await studyCoachAPI.uploadNotes(formData);
      let data = response.data;

      if (data.results && Array.isArray(data.results)) {
        data = data.results[0];
      }

      const normalized = {
        notes: data.notes || '',
        summary: data.summary || '',
        flowchart: data.flowchart || '',
        flashcards: data.flashcards || [],
        quiz: data.quiz || []
      };

      const defaultTab = normalized.summary ? TABS.SUMMARY
        : normalized.notes ? TABS.NOTES
        : normalized.flowchart ? TABS.FLOWCHART
        : normalized.flashcards.length > 0 ? TABS.FLASHCARDS
        : TABS.QUIZ;

      updateState({
        result: normalized,
        loading: false,
        activeTab: defaultTab
      });

    } catch (err) {
      updateState({
        error: err.response?.data?.error || 'Failed to process your notes. Please try again.',
        loading: false
      });
    }
  }, [state.inputMode, state.textInput, state.file, updateState]);

  const handleReset = useCallback(() => {
    setState({
      inputMode: INPUT_MODES.TEXT,
      textInput: '',
      file: null,
      result: null,
      loading: false,
      activeTab: TABS.SUMMARY,
      error: ''
    });
  }, []);

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      updateState({ file: selectedFile, error: '' });
    }
  }, [updateState]);

  const handleRemoveFile = useCallback(() => {
    updateState({ file: null });
  }, [updateState]);

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-6">
              <AcademicCapIcon className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI Study Coach
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Transform your study materials into structured summaries, interactive flashcards, practice quizzes, and visual flowcharts—powered by AI
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Feature Cards */}
        {!state.result && !state.loading && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Trusted by learners and educators worldwide
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              EduCrew is transforming education with AI-driven learning experiences designed for real academic impact
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={BookOpenIcon}
                title="Smart Notes"
                description="Generate well-organized and structured notes from your study material"
                gradient="bg-gradient-to-br from-blue-500 to-blue-600"
              />
              <FeatureCard
                icon={LightBulbIcon}
                title="Flashcards"
                description="Create interactive Q&A flashcards to memorize key concepts faster"
                gradient="bg-gradient-to-br from-yellow-500 to-orange-600"
              />
              <FeatureCard
                icon={QuestionMarkCircleIcon}
                title="Practice Quizzes"
                description="Test your knowledge with AI-generated questions and instant feedback"
                gradient="bg-gradient-to-br from-purple-500 to-purple-600"
              />
              <FeatureCard
                icon={ChartBarIcon}
                title="Flowcharts"
                description="Understand complex processes with AI-generated visual diagrams"
                gradient="bg-gradient-to-br from-indigo-500 to-indigo-600"
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        {!state.result ? (
          /* INPUT FORM */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10 border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* MODE SELECTION */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Choose Input Method
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <ModeButton
                      active={state.inputMode === INPUT_MODES.TEXT}
                      onClick={() => updateState({ inputMode: INPUT_MODES.TEXT, error: '' })}
                      icon={DocumentTextIcon}
                      label="Paste Text"
                    />
                    <ModeButton
                      active={state.inputMode === INPUT_MODES.FILE}
                      onClick={() => updateState({ inputMode: INPUT_MODES.FILE, error: '' })}
                      icon={CloudArrowUpIcon}
                      label="Upload File"
                    />
                  </div>
                </div>

                {/* TEXT INPUT */}
                {state.inputMode === INPUT_MODES.TEXT ? (
                  <div>
                    <label htmlFor="text-input" className="block text-base font-semibold text-gray-900 mb-3">
                      Your Study Material
                    </label>
                    <textarea
                      id="text-input"
                      className="w-full border-2 border-gray-300 rounded-xl p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-vertical min-h-[200px] max-h-[400px]"
                      placeholder="Paste your lecture notes, textbook content, study guides, or any educational material here..."
                      value={state.textInput}
                      onChange={(e) => updateState({ textInput: e.target.value, error: '' })}
                    />
                    <div className="flex justify-between items-center mt-2 text-sm px-1">
                      <p className="text-gray-600">
                        {state.textInput.length} characters {state.textInput.length >= MIN_TEXT_LENGTH && '✓'}
                      </p>
                      <p className="text-xs text-gray-500">Minimum {MIN_TEXT_LENGTH} characters</p>
                    </div>
                  </div>
                ) : (
                  /* FILE UPLOAD */
                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-3">
                      Upload Document
                    </label>
                    {!state.file ? (
                      <div className="relative">
                        <input 
                          id="file-input" 
                          type="file" 
                          accept=".txt,.pdf" 
                          onChange={handleFileChange} 
                          className="hidden" 
                        />
                        <label
                          htmlFor="file-input"
                          className="flex flex-col items-center justify-center w-full h-64 p-8
                            border-2 border-dashed border-gray-300 rounded-xl cursor-pointer
                            hover:border-blue-500 hover:bg-blue-50 transition-all bg-gray-50"
                        >
                          <CloudArrowUpIcon className="w-16 h-16 text-gray-400 mb-4" />
                          <p className="text-lg font-semibold text-gray-700 mb-2">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-sm text-gray-500">TXT or PDF (Max 10MB)</p>
                        </label>
                      </div>
                    ) : (
                      <FileInfo file={state.file} onRemove={handleRemoveFile} />
                    )}
                  </div>
                )}

                {/* ERROR */}
                {state.error && <ErrorAlert message={state.error} />}

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={state.loading || (!state.textInput.trim() && !state.file)}
                  className={`
                    w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl
                    font-semibold text-lg transition-all
                    ${state.loading || (!state.textInput.trim() && !state.file)
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                    }
                  `}
                >
                  {state.loading ? (
                    <>
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating Study Materials...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-6 h-6" />
                      Generate Study Materials
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* RESULTS SECTION */
          <div className="space-y-8">
            
            {/* Tabs */}
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
                <div className="flex flex-wrap gap-3 justify-center">
                  {Object.entries({
                    [TABS.SUMMARY]: { label: 'Summary', icon: SparklesIcon, show: state.result.summary },
                    [TABS.NOTES]: { label: 'Notes', icon: BookOpenIcon, show: state.result.notes },
                    [TABS.FLASHCARDS]: { label: 'Flashcards', icon: LightBulbIcon, show: state.result.flashcards?.length > 0, count: state.result.flashcards?.length },
                    [TABS.QUIZ]: { label: 'Quiz', icon: QuestionMarkCircleIcon, show: state.result.quiz?.length > 0, count: state.result.quiz?.length },
                    [TABS.FLOWCHART]: { label: 'Flowchart', icon: ChartBarIcon, show: state.result.flowchart }
                  }).map(([key, { label, icon: Icon, show, count }]) =>
                    show && (
                      <TabButton
                        key={key}
                        active={state.activeTab === key}
                        onClick={() => updateState({ activeTab: key })}
                        icon={Icon}
                        label={label}
                        count={count}
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8 lg:p-10 border border-gray-200">
                {state.activeTab === TABS.SUMMARY && <SummarySection summary={state.result.summary} />}
                {state.activeTab === TABS.NOTES && <NotesSection notes={state.result.notes} />}
                {state.activeTab === TABS.FLASHCARDS && <FlashcardsSection flashcards={state.result.flashcards} />}
                {state.activeTab === TABS.QUIZ && <QuizSection quiz={state.result.quiz} />}
                {state.activeTab === TABS.FLOWCHART && <FlowchartSection flowchart={state.result.flowchart} />}
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleReset}
                className="flex items-center gap-3 px-8 py-3 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-semibold transition-all hover:shadow-md border-2 border-gray-300"
              >
                <ArrowPathIcon className="w-5 h-5" />
                Start Over
              </button>
            </div>
          </div>
        )}

        {/* LOADING MODAL */}
        {state.loading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-10 shadow-2xl max-w-md w-full text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-blue-600 flex items-center justify-center">
                <svg className="animate-spin h-10 w-10 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Processing...</h3>
              <p className="text-gray-600 mb-2">AI is generating your study materials</p>
              <p className="text-sm text-blue-600 font-semibold">This may take 30-60 seconds</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyCoach;
