// // // // import React, { useState } from 'react';
// // // // import { researchLibrarianAPI } from '../services/api';
// // // // import Loading from '../components/Loading';
// // // // import { Search, ExternalLink, Download, Copy } from 'lucide-react';

// // // // const ResearchLibrarian = () => {
// // // //   const [topic, setTopic] = useState('');
// // // //   const [sortBy, setSortBy] = useState('recent');
// // // //   const [papers, setPapers] = useState([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState('');

// // // //   const handleSearch = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!topic.trim()) {
// // // //       setError('Please enter a topic');
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     setError('');
// // // //     try {
// // // //       const response = await researchLibrarianAPI.searchPapers({ topic, sort_by: sortBy });
// // // //       setPapers(response.data.papers || []);
// // // //     } catch (err) {
// // // //       setError(err.response?.data?.error || 'Failed to fetch papers');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const copyCitation = (citation) => {
// // // //     navigator.clipboard.writeText(citation);
// // // //     alert('Citation copied to clipboard!');
// // // //   };

// // // //   return (
// // // //     <div className="max-w-7xl mx-auto px-4 py-8">
// // // //       <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[600px]">
// // // //         <h1 className="text-4xl font-bold text-primary-500 mb-2 flex items-center">
// // // //           <span className="mr-3">📚</span>
// // // //           Research Librarian
// // // //         </h1>
// // // //         <p className="text-gray-600 mb-8">
// // // //           Find top research papers with APA citations
// // // //         </p>

// // // //         {/* Search Form */}
// // // //         <form onSubmit={handleSearch} className="space-y-4 mb-8">
// // // //           <div className="flex flex-col md:flex-row gap-4">
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Enter research topic (e.g., Machine Learning)"
// // // //               value={topic}
// // // //               onChange={(e) => setTopic(e.target.value)}
// // // //               className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
// // // //             />
// // // //             <select
// // // //               value={sortBy}
// // // //               onChange={(e) => setSortBy(e.target.value)}
// // // //               className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 bg-white cursor-pointer"
// // // //             >
// // // //               <option value="recent">Most Recent</option>
// // // //               <option value="cited">Most Cited</option>
// // // //               <option value="relevant">Most Relevant</option>
// // // //             </select>
// // // //             <button
// // // //               type="submit"
// // // //               disabled={loading}
// // // //               className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
// // // //             >
// // // //               <Search className="mr-2" size={20} />
// // // //               Search Papers
// // // //             </button>
// // // //           </div>
// // // //         </form>

// // // //         {/* Error Message */}
// // // //         {error && (
// // // //           <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
// // // //             <p className="text-red-700">{error}</p>
// // // //           </div>
// // // //         )}

// // // //         {/* Loading */}
// // // //         {loading && <Loading message="Searching for papers..." />}

// // // //         {/* Papers List */}
// // // //         {papers.length > 0 && (
// // // //           <div className="space-y-6">
// // // //             {papers.map((paper) => (
// // // //               <div
// // // //                 key={paper.id}
// // // //                 className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-l-4 border-primary-500 hover:shadow-lg transition-shadow"
// // // //               >
// // // //                 <h3 className="text-xl font-bold text-primary-600 mb-2">
// // // //                   {paper.title}
// // // //                 </h3>
// // // //                 <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
// // // //                   <p><strong>Authors:</strong> {paper.authors}</p>
// // // //                   <p><strong>Year:</strong> {paper.year}</p>
// // // //                 </div>
// // // //                 <p className="text-gray-700 mb-4 leading-relaxed">
// // // //                   {paper.summary}
// // // //                 </p>

// // // //                 {/* Key Points */}
// // // //                 {paper.key_points && paper.key_points.length > 0 && (
// // // //                   <div className="bg-white rounded-lg p-4 mb-4">
// // // //                     <strong className="text-gray-800 block mb-2">Key Points:</strong>
// // // //                     <ul className="space-y-2">
// // // //                       {paper.key_points.map((point, idx) => (
// // // //                         <li key={idx} className="flex items-start">
// // // //                           <span className="text-primary-500 mr-2">•</span>
// // // //                           <span className="text-gray-700">{point}</span>
// // // //                         </li>
// // // //                       ))}
// // // //                     </ul>
// // // //                   </div>
// // // //                 )}

// // // //                 {/* Action Buttons */}
// // // //                 <div className="flex flex-wrap gap-3 mb-4">
// // // //                   {paper.website_url && (
// // // //                     <a
// // // //                       href={paper.website_url}
// // // //                       target="_blank"
// // // //                       rel="noopener noreferrer"
// // // //                       className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
// // // //                     >
// // // //                       <ExternalLink size={16} className="mr-2" />
// // // //                       View Article
// // // //                     </a>
// // // //                   )}
// // // //                   {paper.pdf_url && (
// // // //                     <a
// // // //                       href={paper.pdf_url}
// // // //                       target="_blank"
// // // //                       rel="noopener noreferrer"
// // // //                       className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
// // // //                     >
// // // //                       <Download size={16} className="mr-2" />
// // // //                       Download PDF
// // // //                     </a>
// // // //                   )}
// // // //                 </div>

// // // //                 {/* Citation */}
// // // //                 <div className="bg-white rounded-lg p-4">
// // // //                   <div className="flex items-center justify-between mb-2">
// // // //                     <strong className="text-gray-800">APA Citation:</strong>
// // // //                     <button
// // // //                       onClick={() => copyCitation(paper.apa_citation)}
// // // //                       className="flex items-center text-primary-500 hover:text-primary-600 text-sm"
// // // //                     >
// // // //                       <Copy size={16} className="mr-1" />
// // // //                       Copy
// // // //                     </button>
// // // //                   </div>
// // // //                   <p className="text-gray-600 italic text-sm">
// // // //                     {paper.apa_citation}
// // // //                   </p>
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ResearchLibrarian;





// import React, { useState } from 'react';
// import { researchLibrarianAPI } from '../services/api';
// import Loading from '../components/Loading';
// import { Search, ExternalLink, Download, Copy, BookOpen, TrendingUp, Target } from 'lucide-react';
// // Import your image
// import  heroImage from "../components/R_global.png";// Update the path to where you save the image

// const ResearchLibrarian = () => {
//   const [topic, setTopic] = useState('');
//   const [sortBy, setSortBy] = useState('recent');
//   const [papers, setPapers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [hasSearched, setHasSearched] = useState(false);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!topic.trim()) {
//       setError('Please enter a topic');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setHasSearched(true);
//     try {
//       const response = await researchLibrarianAPI.searchPapers({ topic, sort_by: sortBy });
//       setPapers(response.data.papers || []);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to fetch papers');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyCitation = (citation) => {
//     navigator.clipboard.writeText(citation);
//     alert('Citation copied to clipboard!');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Hero Section */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             {/* Left Content */}
//             <div>
//               <div className="flex items-center gap-2 mb-6">
//                 <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
//                   <BookOpen className="text-white" size={28} />
//                 </div>
//                 <span className="text-2xl font-bold text-gray-800">RESEARCH LIBRARIAN</span>
//               </div>
              
//               <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
//                 Discover the world's top research <br/> papers instantly
//               </h1>
              
//               <p className="text-lg text-gray-600 mb-8">
//                 Search millions of research papers from around the world with AI-powered insights and APA citations
//               </p>

//               {/* Search Form */}
//               <form onSubmit={handleSearch} className="space-y-4">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search research papers from around the world"
//                     value={topic}
//                     onChange={(e) => setTopic(e.target.value)}
//                     className="w-full px-5 py-4 pr-32 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors text-gray-700 placeholder-gray-400"
//                   />
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="absolute right-2 top-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 bg-white cursor-pointer text-sm"
//                   >
//                     <option value="recent">Recent</option>
//                     <option value="cited">Most Cited</option>
//                     <option value="relevant">Relevant</option>
//                   </select>
//                 </div>
                
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
//                 >
//                   <Search className="mr-2" size={20} />
//                   SEARCH
//                 </button>
//               </form>
//             </div>

//             {/* Right Content - Your Uploaded Image */}
//             <div className="hidden md:block">
//               <img 
//                 src={heroImage} 
//                 alt="Research Network Illustration"
//                 className="w-full h-auto object-contain"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       {!hasSearched && (
//         <div className="max-w-7xl mx-auto px-4 py-16">
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                 <BookOpen className="text-orange-600" size={32} />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">Comprehensive coverage</h3>
//               <p className="text-gray-600">Access millions of research papers with full metadata and citations</p>
//             </div>
            
//             <div className="text-center">
//               <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                 <Target className="text-orange-600" size={32} />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">AI-powered insights</h3>
//               <p className="text-gray-600">Get intelligent summaries and key points from research papers</p>
//             </div>
            
//             <div className="text-center">
//               <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                 <TrendingUp className="text-orange-600" size={32} />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">Smart sorting</h3>
//               <p className="text-gray-600">Sort by relevance, citations, or publication date</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Results Section */}
//       {hasSearched && (
//         <div className="max-w-7xl mx-auto px-4 py-12">
//           {/* Error Message */}
//           {error && (
//             <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
//               <p className="text-red-700">{error}</p>
//             </div>
//           )}

//           {/* Loading */}
//           {loading && <Loading message="Searching for papers..." />}

//           {/* Papers List */}
//           {!loading && papers.length > 0 && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Found {papers.length} research papers
//               </h2>
              
//               {papers.map((paper) => (
//                 <div
//                   key={paper.id}
//                   className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
//                 >
//                   <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-orange-600 transition-colors">
//                     {paper.title}
//                   </h3>
                  
//                   <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
//                     <p><strong>Authors:</strong> {paper.authors}</p>
//                     <p><strong>Year:</strong> {paper.year}</p>
//                   </div>
                  
//                   <p className="text-gray-700 mb-4 leading-relaxed">
//                     {paper.summary}
//                   </p>

//                   {/* Key Points */}
//                   {paper.key_points && paper.key_points.length > 0 && (
//                     <div className="bg-orange-50 rounded-lg p-4 mb-4 border-l-4 border-orange-500">
//                       <strong className="text-gray-900 block mb-2">Key Points:</strong>
//                       <ul className="space-y-2">
//                         {paper.key_points.map((point, idx) => (
//                           <li key={idx} className="flex items-start">
//                             <span className="text-orange-500 mr-2 font-bold">•</span>
//                             <span className="text-gray-700">{point}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}

//                   {/* Action Buttons */}
//                   <div className="flex flex-wrap gap-3 mb-4">
//                     {paper.website_url && (
//                       <a
//                         href={paper.website_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//                       >
//                         <ExternalLink size={16} className="mr-2" />
//                         View Article
//                       </a>
//                     )}
//                     {paper.pdf_url && (
//                       <a
//                         href={paper.pdf_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//                       >
//                         <Download size={16} className="mr-2" />
//                         Download PDF
//                       </a>
//                     )}
//                   </div>

//                   {/* Citation */}
//                   <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                     <div className="flex items-center justify-between mb-2">
//                       <strong className="text-gray-900">APA Citation:</strong>
//                       <button
//                         onClick={() => copyCitation(paper.apa_citation)}
//                         className="flex items-center text-orange-500 hover:text-orange-600 text-sm font-medium"
//                       >
//                         <Copy size={16} className="mr-1" />
//                         Copy
//                       </button>
//                     </div>
//                     <p className="text-gray-600 italic text-sm">
//                       {paper.apa_citation}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* No Results */}
//           {!loading && papers.length === 0 && !error && (
//             <div className="text-center py-12">
//               <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">No papers found</h3>
//               <p className="text-gray-500">Try searching with different keywords</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResearchLibrarian;








import React, { useState } from 'react';
import { researchLibrarianAPI } from '../services/api';
import Loading from '../components/Loading';
import {
  Search,
  ExternalLink,
  Download,
  Copy,
  BookOpen,
  TrendingUp,
  Target,
} from 'lucide-react';
import heroImage from '../components/R_global.png';

const ResearchLibrarian = () => {
  const [topic, setTopic] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedId, setCopiedId] = useState(null);


  const handleSearch = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const response = await researchLibrarianAPI.searchPapers({
        topic,
        sort_by: sortBy,
      });
      setPapers(response.data.papers || []);
    } catch {
      setError('Failed to fetch research papers');
    } finally {
      setLoading(false);
    }
  };

  const copyCitation = (citation, paperId) => {
  navigator.clipboard.writeText(citation).then(() => {
    setCopiedId(paperId);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  });
};


  return (
    <div className="min-h-screen bg-white">

      {/* HERO SECTION */}
      <section className="py-10 sm:py-10 md:py-0 lg:py-0 bg-white">

        <div className="max-w-7xl mx-auto px-6 py-10 md:py-20 grid md:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-md bg-blue-900 flex items-center justify-center">
                <BookOpen className="text-white" />
              </div>
              <span className="text-sm tracking-widest font-semibold text-blue-900">
                RESEARCH LIBRARIAN
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-snug mb-6">
              Discover the world's top
              <br />
              research papers 
              <br/>
              instantly
            </h1>

            <p className="text-gray-600 max-w-xl mb-10">
              Search millions of research papers from around the world with AI-powered insights and APA citations
            </p>

            {/* SEARCH */}
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Find top research papers"
                  className="w-full rounded-md border border-gray-300 px-5 py-4 pr-36
                             focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="absolute right-2 top-2 h-10 px-3 text-sm border border-gray-300 rounded-md bg-white"
                >
                  <option value="recent">Recent</option>
                  <option value="cited">Most Cited</option>
                  <option value="relevant">Relevant</option>
                </select>
              </div>

              <button
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3
                           bg-blue-900 text-white rounded-md font-medium
                           hover:bg-blue-800 disabled:opacity-60"
              >
                <Search size={18} />
                Search papers
              </button>
            </form>
          </div>

          {/* RIGHT IMAGE - Updated for Responsiveness */}
          <div className="relative mt-8 block"> 
            <div className="relative z-4 flex justify-center items-center">
              <img
                src={heroImage}
                alt="Global research network"
                className="w-full max-w-[900px] h-auto object-contain drop-shadow-1xl"
                style={{
                  WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 100%)',
                  maskImage: 'radial-gradient(circle at center, black 50%, transparent 100%)',
                }}
              />
            </div>
          </div>

        </div>
      </section>




  {/* RESULTS */}
{hasSearched && (
  <section className="bg-gradient-to-b from-slate-50 to-white py-16">
    <div className="max-w-7xl mx-auto px-6">

      {/* Error */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md">
          <p className="text-sm text-red-700 font-medium flex items-center gap-2">
            <span className="text-red-500">⚠</span>
            {error}
          </p>
        </div>
      )}

      {loading && <Loading message="Searching research papers..." />}

      {!loading && papers.length > 0 && (
        <div>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Research Results</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Found <span className="font-semibold text-blue-900">{papers.length}</span> papers · Searching for <span className="italic">"{topic}"</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-6 pb-4 border-b-2 border-slate-200">
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 shadow-sm">
                <Target className="w-4 h-4 text-blue-900" />
                <span className="text-slate-500">Sort:</span>
                <span className="font-semibold capitalize text-slate-900">{sortBy}</span>
              </div>
            </div>
          </div>

          {/* Papers List */}
          <div className="space-y-8">
            {papers.map((paper, index) => (
              <article
                key={paper.id}
                className="bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >

                {/* Paper Header */}
                <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-start gap-6">

                    {/* Rank Badge */}
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-xl flex flex-col items-center justify-center font-bold shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
                      <span className="text-xs text-blue-200 uppercase tracking-wider">Top</span>
                      <span className="text-lg">#{index + 1}</span>
                    </div>

                    {/* Title & Meta */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-slate-900 leading-tight hover:text-blue-900 cursor-pointer transition-colors group-hover:text-blue-800">
                        {paper.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 font-medium rounded-full">
                          <span className="w-2 h-2 bg-blue-900 rounded-full"></span>
                          {paper.authors}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 font-medium rounded-full">
                          📅 {paper.year}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                      {paper.website_url && (
                        <a
                          href={paper.website_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-900 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-all shadow-md hover:shadow-lg"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Article
                        </a>
                      )}

                      {paper.pdf_url && (
                        <a
                          href={paper.pdf_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-slate-300 text-slate-800 text-sm font-semibold rounded-lg hover:bg-slate-50 hover:border-blue-900 transition-all"
                        >
                          {/* <Download className="w-4 h-4" /> */}
                          Get PDF
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Summary & Key Findings */}
                <div className="p-8 grid lg:grid-cols-2 gap-8">

                  {/* Summary */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-blue-900 rounded-full"></div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                        Summary
                      </h4>
                    </div>

                    <div className="bg-slate-50 border-l-4 border-blue-900 rounded-r-lg p-5 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                      <p className="text-sm text-slate-800 leading-relaxed">
                        {paper.summary}
                      </p>
                    </div>
                  </div>

                  {/* Key Findings */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-emerald-600 rounded-full"></div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                        Key Findings
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-semibold">
                          {paper.key_points?.length || 0}
                        </span>
                      </h4>
                    </div>

                    <div className="bg-white border-l-4 border-emerald-600 rounded-r-lg p-5 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                      {paper.key_points && paper.key_points.length > 0 ? (
                        <ul className="space-y-3 text-sm text-slate-700">
                          {paper.key_points.map((point, idx) => (
                            <li key={idx} className="flex gap-3 items-start">
                              <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-xs">
                                {idx + 1}
                              </span>
                              <span className="leading-relaxed pt-0.5">{point}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm italic text-slate-400 flex items-center gap-2">
                          <span>ℹ️</span>
                          Key points not available for this paper.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Citation Footer */}
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-t-2 border-slate-200 p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    
                    {/* Citation Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-4 h-4 text-blue-900" />
                        <span className="text-xs uppercase tracking-wider text-slate-600 font-bold">
                          APA Citation
                        </span>
                      </div>
                      <div className="bg-white border border-slate-300 rounded-lg p-4 font-mono text-xs leading-relaxed break-words text-slate-700 shadow-sm">
                        {paper.apa_citation}
                      </div>
                    </div>

                    {/* Copy Button */}
                    <button
                      onClick={() => copyCitation(paper.apa_citation, paper.id)}
                      className={`flex-shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all shadow-md hover:shadow-lg
                        ${
                          copiedId === paper.id
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-900 text-white hover:bg-slate-800"
                        }`}
                    >
                      {copiedId === paper.id ? (
                        <>
                          <span className="text-lg">✓</span>
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Citation</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </article>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && papers.length === 0 && !error && (
        <div className="text-center py-32 bg-white rounded-2xl border-2 border-dashed border-slate-300">
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            No Results Found
          </h3>
          <p className="text-base text-slate-600 max-w-md mx-auto">
            We couldn't find any papers matching your search. Try using different keywords or broader terms.
          </p>
        </div>
      )}
    </div>
  </section>
)}




    
    </div>
  );
};

export default ResearchLibrarian;