// // import React, { useState } from 'react';
// // import { presentationAPI } from '../services/api';
// // import Loading from '../components/Loading';
// // import { Presentation, FileText, Download } from 'lucide-react';

// // const PresentationGenerator = () => {
// //   const [mode, setMode] = useState('topic');
// //   const [formData, setFormData] = useState({
// //     topic: '',
// //     content: '',
// //     num_slides: 8,
// //     presenter_name: '',
// //     subject: '',
// //     date: 'Academic Year 2024-25',
// //     use_ai_images: true,
// //   });
// //   const [result, setResult] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: type === 'checkbox' ? checked : value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!formData.topic.trim()) {
// //       setError('Please enter a topic');
// //       return;
// //     }

// //     setLoading(true);
// //     setError('');
// //     try {
// //       const apiCall = mode === 'topic' 
// //         ? presentationAPI.generateFromTopic
// //         : presentationAPI.generateFromContent;
      
// //       const response = await apiCall(formData);
// //       setResult(response.data);
// //     } catch (err) {
// //   console.log("===== PRESENTATION ERROR DEBUG =====");
// //   console.log("STATUS:", err.response?.status);
// //   console.log("DATA:", err.response?.data);
// //   console.log("URL:", err.config?.url);
// //   console.log("HEADERS:", err.config?.headers);

// //   alert(
// //     err.response?.data?.detail ||
// //     err.response?.data?.error ||
// //     JSON.stringify(err.response?.data) ||
// //     "Failed to generate presentation"
// //   );
// // }

// //   };

// //   return (
// //     <div className="max-w-5xl mx-auto px-4 py-8">
// //       <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[600px]">
// //         <h1 className="text-4xl font-bold text-primary-500 mb-2 flex items-center">
// //           <span className="mr-3">📊</span>
// //           Presentation Generator
// //         </h1>
// //         <p className="text-gray-600 mb-8">
// //           Create professional PowerPoint presentations with AI-generated images
// //         </p>

// //         {/* Mode Selector */}
// //         <div className="flex gap-4 mb-6 border-b-2 border-gray-200">
// //           <button
// //             onClick={() => setMode('topic')}
// //             className={`flex items-center px-6 py-3 font-semibold transition-all ${
// //               mode === 'topic'
// //                 ? 'text-primary-500 border-b-4 border-primary-500 -mb-0.5'
// //                 : 'text-gray-500 hover:text-primary-400'
// //             }`}
// //           >
// //             <Presentation className="mr-2" size={20} />
// //             From Topic
// //           </button>
// //           <button
// //             onClick={() => setMode('content')}
// //             className={`flex items-center px-6 py-3 font-semibold transition-all ${
// //               mode === 'content'
// //                 ? 'text-primary-500 border-b-4 border-primary-500 -mb-0.5'
// //                 : 'text-gray-500 hover:text-primary-400'
// //             }`}
// //           >
// //             <FileText className="mr-2" size={20} />
// //             From Content
// //           </button>
// //         </div>

// //         {/* Form */}
// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           <div>
// //             <label className="block text-gray-700 font-semibold mb-2">
// //               Topic *
// //             </label>
// //             <input
// //               type="text"
// //               name="topic"
// //               placeholder="e.g., Machine Learning"
// //               value={formData.topic}
// //               onChange={handleChange}
// //               className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
// //             />
// //           </div>

// //           {mode === 'content' && (
// //             <div>
// //               <label className="block text-gray-700 font-semibold mb-2">
// //                 Custom Content
// //               </label>
// //               <textarea
// //                 name="content"
// //                 placeholder="Provide detailed content for the presentation..."
// //                 value={formData.content}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 min-h-[150px] transition-colors"
// //                 rows={6}
// //               />
// //             </div>
// //           )}

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-gray-700 font-semibold mb-2">
// //                 Number of Slides
// //               </label>
// //               <input
// //                 type="number"
// //                 name="num_slides"
// //                 min="3"
// //                 max="20"
// //                 value={formData.num_slides}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-gray-700 font-semibold mb-2">
// //                 Presenter Name
// //               </label>
// //               <input
// //                 type="text"
// //                 name="presenter_name"
// //                 placeholder="Your name"
// //                 value={formData.presenter_name}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
// //               />
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-gray-700 font-semibold mb-2">
// //                 Subject
// //               </label>
// //               <input
// //                 type="text"
// //                 name="subject"
// //                 placeholder="Subject name"
// //                 value={formData.subject}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-gray-700 font-semibold mb-2">
// //                 Date
// //               </label>
// //               <input
// //                 type="text"
// //                 name="date"
// //                 value={formData.date}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
// //               />
// //             </div>
// //           </div>

// //           <div className="flex items-center">
// //             <input
// //               type="checkbox"
// //               name="use_ai_images"
// //               checked={formData.use_ai_images}
// //               onChange={handleChange}
// //               className="w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
// //             />
// //             <label className="ml-3 text-gray-700 font-medium">
// //               Generate AI Images for slides
// //             </label>
// //           </div>

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
// //           >
// //             {loading ? 'Generating Presentation...' : 'Generate Presentation'}
// //           </button>
// //         </form>

// //         {/* Error */}
// //         {error && (
// //           <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
// //             <p className="text-red-700">{error}</p>
// //           </div>
// //         )}

// //         {/* Loading */}
// //         {loading && (
// //           <div className="mt-8">
// //             <Loading message="Generating your presentation... This may take a minute." />
// //           </div>
// //         )}

// //         {/* Success Result */}
// //         {result && (
// //           <div className="mt-8 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 animate-slide-in">
// //             <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
// //               <span className="mr-2">✅</span>
// //               Presentation Generated Successfully!
// //             </h2>
// //             <div className="bg-white rounded-lg p-4 mb-4 space-y-2">
// //               <p className="text-gray-700">
// //                 <strong>Title:</strong> {result.title}
// //               </p>
// //               <p className="text-gray-700">
// //                 <strong>Total Slides:</strong> {result.total_slides}
// //               </p>
// //               <p className="text-gray-700">
// //                 <strong>Images Generated:</strong> {result.images_count || 0}
// //               </p>
// //             </div>
// //             <a
// //               href={result.file_url}
// //               download
// //               className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
// //             >
// //               <Download className="mr-2" size={20} />
// //               Download Presentation
// //             </a>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default PresentationGenerator;





// import React, { useState } from "react";
// import { presentationAPI } from "../services/api";
// import Loading from "../components/Loading";
// import { Presentation, FileText, Download } from "lucide-react";

// const BASE_URL = "http://127.0.0.1:8000"; // backend base

// const PresentationGenerator = () => {
//   const [mode, setMode] = useState("topic");
//   const [formData, setFormData] = useState({
//     topic: "",
//     content: "",
//     num_slides: 8,
//     presenter_name: "",
//     subject: "",
//     date: "Academic Year 2024-25",
//     use_ai_images: true,
//   });

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.topic.trim()) {
//       setError("Please enter a topic");
//       return;
//     }

//     if (mode === "content" && !formData.content.trim()) {
//       setError("Please provide custom content");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setResult(null);

//     try {
//       const apiCall =
//         mode === "topic"
//           ? presentationAPI.generateFromTopic
//           : presentationAPI.generateFromContent;

//       // Backend requires authentication
//       const token = localStorage.getItem("access_token");

//       const payload =
//         mode === "topic"
//           ? {
//               topic: formData.topic,
//               num_slides: formData.num_slides,
//               presenter_name: formData.presenter_name,
//               subject: formData.subject,
//               date: formData.date,
//               use_ai_images: formData.use_ai_images,
//             }
//           : {
//               topic: formData.topic,
//               content: formData.content,
//               num_slides: formData.num_slides,
//               presenter_name: formData.presenter_name,
//               subject: formData.subject,
//               date: formData.date,
//               use_ai_images: formData.use_ai_images,
//             };

//       const response = await apiCall(payload, token);

//       setResult(response.data);
//     } catch (err) {
//       console.log("===== PRESENTATION ERROR DEBUG =====");
//       console.log("STATUS:", err.response?.status);
//       console.log("DATA:", err.response?.data);
//       console.log("URL:", err.config?.url);

//       const backendError =
//         err.response?.data?.error ||
//         err.response?.data?.detail ||
//         "Failed to generate presentation";

//       setError(backendError);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">
//       <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[600px]">
//         <h1 className="text-4xl font-bold text-primary-500 mb-2 flex items-center">
//           <span className="mr-3">📊</span>
//           Presentation Generator
//         </h1>
//         <p className="text-gray-600 mb-8">
//           Create professional PowerPoint presentations with AI-generated images
//         </p>

//         {/* Mode Selector */}
//         <div className="flex gap-4 mb-6 border-b-2 border-gray-200">
//           <button
//             type="button"
//             onClick={() => setMode("topic")}
//             className={`flex items-center px-6 py-3 font-semibold transition-all ${
//               mode === "topic"
//                 ? "text-primary-500 border-b-4 border-primary-500 -mb-0.5"
//                 : "text-gray-500 hover:text-primary-400"
//             }`}
//           >
//             <Presentation className="mr-2" size={20} />
//             From Topic
//           </button>

//           <button
//             type="button"
//             onClick={() => setMode("content")}
//             className={`flex items-center px-6 py-3 font-semibold transition-all ${
//               mode === "content"
//                 ? "text-primary-500 border-b-4 border-primary-500 -mb-0.5"
//                 : "text-gray-500 hover:text-primary-400"
//             }`}
//           >
//             <FileText className="mr-2" size={20} />
//             From Content
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Topic *
//             </label>
//             <input
//               type="text"
//               name="topic"
//               value={formData.topic}
//               onChange={handleChange}
//               placeholder="e.g., Machine Learning"
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
//             />
//           </div>

//           {mode === "content" && (
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">
//                 Custom Content *
//               </label>
//               <textarea
//                 name="content"
//                 value={formData.content}
//                 onChange={handleChange}
//                 placeholder="Provide detailed content for the presentation..."
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 min-h-[150px] transition-colors"
//                 rows={6}
//               />
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">
//                 Number of Slides
//               </label>
//               <input
//                 type="number"
//                 name="num_slides"
//                 min="3"
//                 max="20"
//                 value={formData.num_slides}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">
//                 Presenter Name
//               </label>
//               <input
//                 type="text"
//                 name="presenter_name"
//                 value={formData.presenter_name}
//                 onChange={handleChange}
//                 placeholder="Your name"
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">
//                 Subject
//               </label>
//               <input
//                 type="text"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 placeholder="Subject name"
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">
//                 Date
//               </label>
//               <input
//                 type="text"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
//               />
//             </div>
//           </div>

//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               name="use_ai_images"
//               checked={formData.use_ai_images}
//               onChange={handleChange}
//               className="w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
//             />
//             <label className="ml-3 text-gray-700 font-medium">
//               Generate AI Images for slides
//             </label>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//           >
//             {loading ? "Generating Presentation..." : "Generate Presentation"}
//           </button>
//         </form>

//         {/* Error */}
//         {error && (
//           <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
//             <p className="text-red-700">{error}</p>
//           </div>
//         )}

//         {/* Loading */}
//         {loading && (
//           <div className="mt-8">
//             <Loading message="Generating your presentation... This may take a minute." />
//           </div>
//         )}

//         {/* Success */}
//         {result && (
//           <div className="mt-8 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 animate-slide-in">
//             <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
//               <span className="mr-2">✅</span>
//               Presentation Generated Successfully!
//             </h2>

//             <div className="bg-white rounded-lg p-4 mb-4 space-y-2">
//               <p>
//                 <strong>Title:</strong> {result.title}
//               </p>
//               <p>
//                 <strong>Total Slides:</strong> {result.total_slides}
//               </p>
//               <p>
//                 <strong>Images Generated:</strong> {result.images_count || 0}
//               </p>
//             </div>

//             <a
//               href={`${BASE_URL}${result.file_url}`}
//               className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
//             >
//               <Download className="mr-2" size={20} />
//               Download Presentation
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PresentationGenerator;




import React, { useState } from "react";
import { presentationAPI } from "../services/api";
import Loading from "../components/Loading";
import { 
  Presentation, 
  FileText, 
  Download, 
  Sparkles, 
  User, 
  Calendar, 
  BookOpen, 
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2,
  FileDown,
  Loader2,
  ArrowRight,
  Zap,
  Palette,
  Clock,
  LayoutGrid, CheckIcon,Plus, Minus, Settings2,  // Use this instead of Settings
  ShieldCheck,
  Award
} from "lucide-react";

const BASE_URL = "http://127.0.0.1:8000";

const PresentationGenerator = () => {
  const [mode, setMode] = useState("topic");
  const [formData, setFormData] = useState({
    topic: "",
    content: "",
    num_slides: 8,
    presenter_name: "",
    subject: "",
    date: "Academic Year 2024-25",
    use_ai_images: true,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.topic.trim()) {
    setError("Please enter a topic");
    return;
  }

  if (mode === "content" && !formData.content.trim()) {
    setError("Please provide custom content");
    return;
  }

  // Additional validation for content mode
  if (mode === "content" && formData.content.trim().length < 50) {
    setError("Content must be at least 50 characters for AI to process effectively");
    return;
  }

  setLoading(true);
  setError("");
  setResult(null);

  try {
    const apiCall =
      mode === "topic"
        ? presentationAPI.generateFromTopic
        : presentationAPI.generateFromContent;

    const token = localStorage.getItem("access_token");

    // Clean and format payload
    const payload =
      mode === "topic"
        ? {
            topic: formData.topic.trim(),
            num_slides: parseInt(formData.num_slides),
            presenter_name: formData.presenter_name.trim(),
            subject: formData.subject.trim(),
            date: formData.date.trim(),
            use_ai_images: Boolean(formData.use_ai_images),
          }
        : {
            topic: formData.topic.trim(),
            content: formData.content.trim().replace(/\n{3,}/g, '\n\n'), // Normalize excessive newlines
            num_slides: parseInt(formData.num_slides),
            presenter_name: formData.presenter_name.trim(),
            subject: formData.subject.trim(),
            date: formData.date.trim(),
            use_ai_images: Boolean(formData.use_ai_images),
          };

    const response = await apiCall(payload, token);
    setResult(response.data);
  } catch (err) {
    console.error("API Error:", err);
    const backendError =
      err.response?.data?.error ||
      err.response?.data?.detail ||
      "Failed to generate presentation. Please try again with different content or switch to AI Generate mode.";
    setError(backendError);
  } finally {
    setLoading(false);
  }
};

  const scrollToForm = () => {
    document.getElementById('generator-form').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ==================== HERO SECTION ==================== */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        
        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-semibold text-white/90 tracking-wider uppercase">AI Presentation Maker</span>
          </div>

          {/* Main Heading */}
         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
             A faster way to create
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              professional presentations
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Transform ideas into structured slides. AI generates the draft, while Smart Slides ensure clarity and consistency.
          </p>

          {/* CTA Button */}
          <button 
            onClick={scrollToForm}
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-white text-slate-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50"
          >
            Create Presentation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Stats */}
          {/* <div className="mt-16 flex items-center justify-center gap-0">
            <div className="px-12 text-center">
              <p className="text-3xl font-bold text-white">10x</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Faster Creation</p>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="px-12 text-center">
              <p className="text-3xl font-bold text-white">AI</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Powered Content</p>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="px-12 text-center">
              <p className="text-3xl font-bold text-white">PPTX</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Export Format</p>
            </div>
          </div> */}
        </div>

        {/* Bottom Wave - Curves Upward */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24 sm:h-32" preserveAspectRatio="none">
            <path d="M0 120L48 112C96 104 192 88 288 82C384 76 480 80 576 88C672 96 768 108 864 110C960 112 1056 104 1152 96C1248 88 1344 80 1392 76L1440 72V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </div>

      {/* ==================== FORM SECTION ==================== */}
    {/* ==================== FORM SECTION ==================== */}
<div id="generator-form" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
  {/* Animated Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]"></div>
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite_reverse]"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200/10 rounded-full blur-3xl animate-[pulse_15s_ease-in-out_infinite]"></div>
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
      backgroundSize: '40px 40px'
    }}></div>
  </div>

  <div className="relative max-w-4xl mx-auto">
    <div className="text-center mb-12">
      <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-indigo-600 text-sm font-semibold rounded-full shadow-sm border border-indigo-100 mb-4">
        <Sparkles className="w-4 h-4" />
        Start Creating
      </span>
      <h2 className="text-4xl font-bold text-gray-900 mb-3">Build Your Presentation</h2>
      <p className="text-lg text-gray-600 max-w-lg mx-auto">
        Fill in the details below and watch AI craft your perfect slides
      </p>
    </div>

    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-500/10 border border-white/50 overflow-hidden">
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-b from-gray-50/50 to-transparent">
        <button
          type="button"
          onClick={() => {
            setMode("topic");
            setError("");
            setResult(null);
          }}
          className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-500 hover:scale-[1.02] ${
            mode === "topic"
              ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg shadow-indigo-500/20"
              : "border-gray-200 bg-white/60 hover:border-indigo-300 hover:bg-white"
          }`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
            mode === "topic" 
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110" 
              : "bg-gray-100 text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
          }`}>
            <Sparkles className={`w-7 h-7 transition-transform duration-500 ${mode === "topic" ? "rotate-12" : ""}`} />
          </div>
          <h3 className={`font-bold text-lg mb-2 transition-colors ${mode === "topic" ? "text-indigo-900" : "text-gray-900"}`}>
            AI Generate
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Enter a topic and let our AI create everything from scratch
          </p>
          {mode === "topic" && (
            <div className="absolute top-4 right-4 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center animate-[bounceIn_0.5s_ease-out]">
              <CheckIcon className="w-5 h-5 text-white" />
            </div>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode("content");
            setError("");
            setResult(null);
          }}
          className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-500 hover:scale-[1.02] ${
            mode === "content"
              ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg shadow-indigo-500/20"
              : "border-gray-200 bg-white/60 hover:border-indigo-300 hover:bg-white"
          }`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
            mode === "content" 
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110" 
              : "bg-gray-100 text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
          }`}>
            <FileText className={`w-7 h-7 transition-transform duration-500 ${mode === "content" ? "rotate-12" : ""}`} />
          </div>
          <h3 className={`font-bold text-lg mb-2 transition-colors ${mode === "content" ? "text-indigo-900" : "text-gray-900"}`}>
            My Content
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Convert your existing notes or content into slides
          </p>
          {mode === "content" && (
            <div className="absolute top-4 right-4 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center animate-[bounceIn_0.5s_ease-out]">
              <CheckIcon className="w-5 h-5 text-white" />
            </div>
          )}
        </button>
      </div>

      <div className="p-8 space-y-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-indigo-600 transition-colors">
                Presentation Topic <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="e.g., The Future of Artificial Intelligence in Healthcare"
                  className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 text-gray-700 placeholder:text-gray-400 hover:border-gray-300"
                />
                <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-indigo-500 transition-colors" />
              </div>
            </div>

            {mode === "content" && (
              <div className="animate-[slideDown_0.4s_ease-out]">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Content <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Enter your content here. Use clear sections with headers. Example:

Introduction:
- Point 1
- Point 2

Main Content:
- Detail A
- Detail B

Conclusion:
- Summary point"
                    className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 min-h-[200px] resize-y text-gray-700 placeholder:text-gray-400 font-mono text-sm leading-relaxed"
                    rows={8}
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white px-2 py-1 rounded-md border">
                    {formData.content.length} chars
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Use structured format with clear headings and bullet points for best results
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-gray-50/80 to-indigo-50/30 rounded-2xl border border-gray-100 space-y-5">
            <div className="flex items-center gap-2 mb-4">
              <Settings2 className="w-5 h-5 text-indigo-600" />
              <h4 className="font-bold text-gray-900">Presentation Settings</h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Number of Slides
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, num_slides: Math.max(3, prev.num_slides - 1) }))}
                    className="w-10 h-10 rounded-xl bg-white border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 flex items-center justify-center text-gray-600 font-bold transition-all active:scale-95"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 relative">
                    <LayoutGrid className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      name="num_slides"
                      value={formData.num_slides}
                      onChange={handleChange}
                      min="3"
                      max="20"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-center font-bold text-gray-900 focus:outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, num_slides: Math.min(20, prev.num_slides + 1) }))}
                    className="w-10 h-10 rounded-xl bg-white border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 flex items-center justify-center text-gray-600 font-bold transition-all active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Presenter Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="presenter_name"
                    value={formData.presenter_name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-all text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Subject / Course
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-all text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Date / Academic Year
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    placeholder="Academic Year 2024-25"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-all text-gray-700"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">AI-Generated Images</h4>
                    <p className="text-sm text-gray-500">Beautiful visuals for every slide</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="use_ai_images"
                    checked={formData.use_ai_images}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                </label>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-start gap-3 animate-[shake_0.5s_ease-in-out]">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-700 text-sm font-medium">{error}</p>
                {mode === "content" && (
                  <p className="text-red-600 text-xs mt-1">
                    Try simplifying your content structure or switching to "AI Generate" mode
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-2xl shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <span className="relative flex items-center gap-3">
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Creating Your Presentation...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                    Generate Presentation
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
            </button>
            <p className="text-center text-sm text-gray-400 mt-4 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Takes approximately 1-2 minutes
            </p>
          </div>
        </form>

        {loading && (
          <div className="mt-8 p-8 bg-indigo-50/80 backdrop-blur-sm rounded-2xl border border-indigo-100 text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
              <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Crafting Your Slides</h3>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden max-w-xs mx-auto">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-[loading_2s_ease-in-out_infinite] w-1/3"></div>
            </div>
            <p className="text-sm text-gray-500 mt-3">AI is generating content and images...</p>
          </div>
        )}

        {result && (
          <div className="mt-8 animate-[bounceIn_0.6s_ease-out]">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-1 shadow-xl shadow-emerald-500/20">
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center animate-pulse">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Ready to Download!</h3>
                    <p className="text-emerald-600 font-medium">{result.total_slides} slides • {result.images_count || 0} AI images</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">{result.total_slides}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Slides</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">{result.images_count || 0}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Images</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">PPTX</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Format</p>
                  </div>
                </div>

                <a
                  href={`${BASE_URL}${result.file_url}`}
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5" />
                  Download Presentation
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>No credit card required</span>
      </div>
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-amber-500" />
        <span>Free forever</span>
      </div>
      <div className="flex items-center gap-2">
        <Award className="w-4 h-4 text-purple-500" />
        <span>Professional quality</span>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default PresentationGenerator;