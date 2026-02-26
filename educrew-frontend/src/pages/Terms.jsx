// import React from 'react';
// import { ArrowLeft, FileText, Shield, Clock, AlertCircle, CheckCircle } from 'lucide-react';

// const Terms = () => (
//   <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-4 md:px-8">
//     <div className="max-w-4xl mx-auto">
//       {/* Back Button */}
//       <a href="/" className="inline-flex items-center mb-12 px-6 py-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200">
//         <ArrowLeft className="w-5 h-5 mr-3 text-gray-600" />
//         <span className="font-medium text-gray-800">Back to Home</span>
//       </a>

//       {/* Main Content */}
//       <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 md:p-16 border border-white/50">
//         <div className="flex items-start mb-12 md:mb-16">
//           <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg mr-6 flex-shrink-0">
//             <FileText className="w-10 h-10 text-white" />
//           </div>
//           <div>
//             <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 leading-tight">
//               Terms of Service
//             </h1>
//             <div className="flex items-center text-gray-600">
//               <Clock className="w-5 h-5 mr-2" />
//               <span>Last updated: February 16, 2026</span>
//             </div>
//           </div>
//         </div>

//         <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-8">
//           <section>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//               <Shield className="w-8 h-8 mr-3 text-indigo-600" />1. Acceptance of Terms
//             </h2>
//             <p className="text-lg leading-relaxed">
//               By accessing or using EduCrew (the "Service"), you agree to be bound by these Terms of Service. 
//               EduCrew provides AI-powered educational agents designed exclusively for legitimate academic purposes.
//             </p>
//           </section>

//           <section>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Description of Service</h2>
//             <p>
//               EduCrew offers specialized AI agents including Research Librarian, Code Mentor, Project Planner, 
//               Quality Reviewer, and Study Coach. These tools assist with academic research, coding practice, 
//               project management, content review, and study planning.
//             </p>
//           </section>

//           <section>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//               <AlertCircle className="w-8 h-8 mr-3 text-orange-500" />3. User Responsibilities
//             </h2>
//             <div className="grid md:grid-cols-2 gap-6 mt-6">
//               <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500">
//                 <h3 className="font-semibold text-lg mb-3 flex items-center">
//                   <CheckCircle className="w-5 h-5 mr-2 text-indigo-600" />Legitimate Use
//                 </h3>
//                 <p>Use only for personal educational improvement, not cheating or academic dishonesty.</p>
//               </div>
//               <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
//                 <h3 className="font-semibold text-lg mb-3 flex items-center">
//                   <CheckCircle className="w-5 h-5 mr-2 text-purple-600" />Content Review
//                 </h3>
//                 <p>Always review and validate AI-generated content before submission or publication.</p>
//               </div>
//             </div>
//           </section>

//           <section>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Prohibited Activities</h2>
//             <ul className="space-y-3 text-lg">
//               <li>• Submitting plagiarized or copyrighted material</li>
//               <li>• Using for commercial gain without permission</li>
//               <li>• Attempting to reverse engineer AI models</li>
//               <li>• Automated access via scraping or bots</li>
//             </ul>
//           </section>

//           <section>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Limitation of Liability</h2>
//             <p className="text-lg">
//               EduCrew provides AI assistance "as is" without warranties. We are not responsible for the accuracy 
//               of AI outputs or any consequences from their use. Users must exercise professional judgment.
//             </p>
//           </section>

//           <section className="pt-12 mt-12 border-t-2 border-gray-200">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Changes to Terms</h2>
//             <p>
//               We may update these Terms at any time. Continued use after changes constitutes acceptance.
//               Check this page periodically for updates.
//             </p>
//           </section>

//           <div className="mt-16 pt-12 border-t-2 border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl">
//             <h3 className="text-xl font-bold text-gray-900 mb-4">Questions?</h3>
//             <p className="text-lg text-gray-700 mb-6">
//               If you have questions about these Terms, please contact us at:
//             </p>
//             <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-500">
//               <p className="font-mono text-indigo-800 text-lg">support@educCrew.com</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default Terms;



import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Shield, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Scale, 
  Ban, 
  RefreshCw,
  Mail,
  ChevronRight
} from 'lucide-react';

const Terms = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { id: 1, title: "Acceptance of Terms", icon: <Shield className="w-5 h-5" /> },
    { id: 2, title: "Description of Service", icon: <FileText className="w-5 h-5" /> },
    { id: 3, title: "User Responsibilities", icon: <CheckCircle className="w-5 h-5" /> },
    { id: 4, title: "Prohibited Activities", icon: <Ban className="w-5 h-5" /> },
    { id: 5, title: "Limitation of Liability", icon: <Scale className="w-5 h-5" /> },
    { id: 6, title: "Changes to Terms", icon: <RefreshCw className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Navigation / Back Button */}
        <nav className="mb-12">
          <a 
            href="/" 
            className="group inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 mr-3 group-hover:border-indigo-200 group-hover:shadow-md transition-all">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </span>
            Back to Home
          </a>
        </nav>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          
          {/* Sidebar Navigation (Desktop) */}
          <div className="hidden lg:block lg:col-span-3 relative">
            <div className="sticky top-12 space-y-8">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 p-6">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">On this page</h3>
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => {
                          document.getElementById(`section-${section.id}`).scrollIntoView({ behavior: 'smooth' });
                          setActiveSection(section.id);
                        }}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          activeSection === section.id 
                            ? 'bg-indigo-50 text-indigo-700' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span className={`mr-3 ${activeSection === section.id ? 'text-indigo-500' : 'text-slate-400'}`}>
                          {section.icon}
                        </span>
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mini CTA Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white">
                <h4 className="font-bold text-lg mb-2">Need Help?</h4>
                <p className="text-indigo-100 text-sm mb-4">Have questions about these terms? Our support team is here to help.</p>
                <button className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            
            {/* Header Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8">
              <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-900" />
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-900 flex items-center justify-center shadow-lg shadow-indigo-800">
                      <FileText className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                      Terms of Service
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm md:text-base">
                      <span className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full">
                        <Clock className="w-4 h-4" />
                        Last updated: February 16, 2026
                      </span>
                      <span className="flex items-center gap-2 text-indigo-600 font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Version 2.0
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className="p-8 md:p-12 space-y-16">
                
                {/* Section 1 */}
                <section id="section-1" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">1. Acceptance of Terms</h2>
                  </div>
                  <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed pl-1">
                    <p>
                      By accessing or using EduCrew (the "Service"), you agree to be bound by these Terms of Service. 
                      If you do not agree to these terms, please do not use our Service.
                    </p>
                    <p>
                      EduCrew provides AI-powered educational agents designed exclusively for legitimate academic purposes. 
                      These tools are intended to supplement, not replace, traditional learning methods.
                    </p>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 2 */}
                <section id="section-2" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">2. Description of Service</h2>
                  </div>
                  <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                    <p>
                      EduCrew offers specialized AI agents including:
                    </p>
                    <ul className="space-y-3 mt-4 not-prose">
                      {['Research Librarian', 'Code Mentor', 'Project Planner', 'Quality Reviewer', 'Study Coach'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <div className="w-2 h-2 rounded-full bg-purple-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6">
                      These tools assist with academic research, coding practice, project management, content review, and study planning.
                    </p>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 3 */}
                <section id="section-3" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">3. User Responsibilities</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 text-indigo-600 group-hover:scale-110 transition-transform">
                        <Shield className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2">Legitimate Use</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Use only for personal educational improvement. Strictly prohibited for cheating or academic dishonesty.
                      </p>
                    </div>

                    <div className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-purple-200 transition-all duration-300">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform">
                        <AlertCircle className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2">Content Review</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Always review and validate AI-generated content before submission or publication.
                      </p>
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 4 */}
                <section id="section-4" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-rose-50 text-rose-600">
                      <Ban className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">4. Prohibited Activities</h2>
                  </div>
                  <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-6 md:p-8">
                    <ul className="space-y-4">
                      {[
                        'Submitting plagiarized or copyrighted material as your own',
                        'Using the Service for commercial gain without explicit permission',
                        'Attempting to reverse engineer or extract AI model weights',
                        'Automated access via scraping, bots, or unauthorized scripts'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-700">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-xs font-bold mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-slate-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 5 */}
                <section id="section-5" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                      <Scale className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">5. Limitation of Liability</h2>
                  </div>
                  <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                    <p>
                      EduCrew provides AI assistance "as is" without warranties of any kind. We are not responsible for the accuracy 
                      of AI outputs or any consequences from their use. Users must exercise professional judgment at all times.
                    </p>
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg">
                      <p className="text-amber-800 text-sm m-0 font-medium">
                        Disclaimer: AI generated content may contain errors. Always verify critical information with authoritative sources.
                      </p>
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 6 */}
                <section id="section-6" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                      <RefreshCw className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">6. Changes to Terms</h2>
                  </div>
                  <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                    <p>
                      We may update these Terms at any time to reflect changes in our practices or for legal reasons. 
                      Continued use of the Service after changes constitutes acceptance of the new Terms.
                    </p>
                    <p>
                      We encourage you to check this page periodically for updates. Significant changes will be notified via email.
                    </p>
                  </div>
                </section>

              </div>

              {/* Footer Contact Section */}
              <div className="bg-slate-50 border-t border-slate-200 p-8 md:p-12">
                <div className="max-w-2xl mx-auto text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Questions or Concerns?</h3>
                  <p className="text-slate-600 mb-8">
                    If you have any questions about these Terms, please don't hesitate to reach out to our support team.
                  </p>
                  <a 
                    href="mailto:support@educrew.com" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Support
                    <ChevronRight className="w-4 h-4 ml-2 opacity-50" />
                  </a>
                  <p className="mt-4 text-sm text-slate-400 font-mono">support@educrew.com</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;