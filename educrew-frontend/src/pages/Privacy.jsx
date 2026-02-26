// import React from 'react';
// import { ArrowLeft, ShieldCheck, Lock, Users, Download, AlertTriangle } from 'lucide-react';

// const Privacy = () => (
//   <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-4 md:px-8">
//     <div className="max-w-4xl mx-auto">
//       <a href="/" className="inline-flex items-center mb-12 px-6 py-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200">
//         <ArrowLeft className="w-5 h-5 mr-3 text-gray-600" />
//         <span className="font-medium text-gray-800">Back to Home</span>
//       </a>

//       <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 md:p-16 border border-white/50">
//         <div className="flex items-start mb-12 md:mb-16">
//           <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg mr-6 flex-shrink-0">
//             <ShieldCheck className="w-10 h-10 text-white" />
//           </div>
//           <div>
//             <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
//               Privacy Policy
//             </h1>
//             <div className="flex items-center text-gray-600">
//               <Lock className="w-5 h-5 mr-2" />
//               <span>Last updated: February 16, 2026</span>
//             </div>
//           </div>
//         </div>

//         <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-8">
//           <section>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//               <Lock className="w-8 h-8 mr-3 text-emerald-600" />1. Information We Collect
//             </h2>
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
//                 <h3 className="font-semibold mb-3">Account Data</h3>
//                 <ul className="space-y-1 text-sm">
//                   <li>• Email address</li>
//                   <li>• Username</li>
//                   <li>• Academic institution (optional)</li>
//                 </ul>
//               </div>
//               <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
//                 <h3 className="font-semibold mb-3">Usage Data</h3>
//                 <ul className="space-y-1 text-sm">
//                   <li>• Pages visited</li>
//                   <li>• Agent usage patterns</li>
//                   <li>• Session duration (anonymized)</li>
//                 </ul>
//               </div>
//             </div>
//           </section>

//           <section>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">2. How We Use Your Data</h2>
//             <div className="grid md:grid-cols-3 gap-6 mt-6">
//               <div className="bg-teal-50 p-6 rounded-xl text-center">
//                 <Users className="w-12 h-12 mx-auto mb-4 text-teal-600" />
//                 <h3 className="font-semibold mb-2">Service Delivery</h3>
//                 <p className="text-sm text-gray-700">Provide personalized AI assistance</p>
//               </div>
//               <div className="bg-purple-50 p-6 rounded-xl text-center">
//                 <Download className="w-12 h-12 mx-auto mb-4 text-purple-600" />
//                 <h3 className="font-semibold mb-2">Improvement</h3>
//                 <p className="text-sm text-gray-700">Train and improve AI models</p>
//               </div>
//               <div className="bg-indigo-50 p-6 rounded-xl text-center">
//                 <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
//                 <h3 className="font-semibold mb-2">Security</h3>
//                 <p className="text-sm text-gray-700">Protect against abuse</p>
//               </div>
//             </div>
//           </section>

//           <section>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//               <AlertTriangle className="w-8 h-8 mr-3 text-orange-500" />3. Data Sharing
//             </h2>
//             <p className="text-lg mb-6">
//               We <strong>never</strong> sell your data. Limited sharing occurs only with:
//             </p>
//             <ul className="grid md:grid-cols-2 gap-4 text-lg">
//               <li>• AI providers (Perplexity/OpenAI) for service delivery</li>
//               <li>• Legal authorities with proper court orders</li>
//               <li>• Business transfers (with notice)</li>
//             </ul>
//           </section>

//           <section>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Your Rights</h2>
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="bg-white p-6 rounded-xl shadow-sm border">
//                 <h3 className="font-semibold mb-3">Access & Download</h3>
//                 <p>Export your data anytime from Account Settings</p>
//               </div>
//               <div className="bg-white p-6 rounded-xl shadow-sm border">
//                 <h3 className="font-semibold mb-3">Delete Account</h3>
//                 <p>Permanent deletion within 30 days of request</p>
//               </div>
//             </div>
//           </section>

//           <section className="pt-12 mt-12 border-t-2 border-gray-200">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Data Security</h2>
//             <p>
//               We use industry-standard encryption (AES-256), secure hosting, and regular security audits. 
//               However, no online service is 100% secure.
//             </p>
//           </section>

//           <div className="mt-16 pt-12 border-t-2 border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-2xl">
//             <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
//               <Lock className="w-8 h-8 mr-3 text-emerald-600" />Contact Us
//             </h3>
//             <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-emerald-500">
//               <p className="font-mono text-2xl font-bold text-emerald-800 mb-2">privacy@educCrew.com</p>
//               <p className="text-gray-600">We're committed to your privacy</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default Privacy;



import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  Users, 
  Download, 
  AlertTriangle,
  Eye,
  Server,
  Trash2,
  FileKey,
  ChevronRight,
  Mail,
  CheckCircle2
} from 'lucide-react';

const Privacy = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { id: 1, title: "Information We Collect", icon: <Eye className="w-5 h-5" /> },
    { id: 2, title: "How We Use Your Data", icon: <Server className="w-5 h-5" /> },
    { id: 3, title: "Data Sharing", icon: <Users className="w-5 h-5" /> },
    { id: 4, title: "Your Rights", icon: <FileKey className="w-5 h-5" /> },
    { id: 5, title: "Data Security", icon: <Lock className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Navigation / Back Button */}
        <nav className="mb-12">
          <a 
            href="/" 
            className="group inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 mr-3 group-hover:border-blue-700 group-hover:shadow-md transition-all">
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
                          document.getElementById(`privacy-${section.id}`).scrollIntoView({ behavior: 'smooth' });
                          setActiveSection(section.id);
                        }}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          activeSection === section.id 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span className={`mr-3 ${activeSection === section.id ? 'text-emerald-500' : 'text-slate-400'}`}>
                          {section.icon}
                        </span>
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust Badge Card */}
              <div className="bg-gradient-to-br from-blue-600 to-teal-700 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-200" />
                    <span className="font-bold text-lg">GDPR Ready</span>
                  </div>
                  <p className="text-emerald-100 text-sm mb-4 leading-relaxed">
                    Your data belongs to you. We comply with global privacy standards.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-200 bg-white/10 w-fit px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ISO 27001 Certified
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            
            {/* Header Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8">
              <div className="h-2 bg-gradient-to-r from-blue-600 via-teal-5+700 to-cyan-700" />
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-900">
                      <ShieldCheck className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                      Privacy Policy
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm md:text-base">
                      <span className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full">
                        <Lock className="w-4 h-4" />
                        Last updated: February 16, 2026
                      </span>
                      <span className="flex items-center gap-2 text-emerald-600 font-medium">
                        <CheckCircle2 className="w-4 h-4" />
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
                
                {/* Section 1: Information We Collect */}
                <section id="privacy-1" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                      <Eye className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">1. Information We Collect</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-300">
                      <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 text-emerald-600 group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-3">Account Data</h3>
                      <ul className="space-y-2 text-slate-600 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Email address
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Username
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Academic institution (optional)
                        </li>
                      </ul>
                    </div>

                    <div className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-teal-200 transition-all duration-300">
                      <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4 text-teal-600 group-hover:scale-110 transition-transform">
                        <Server className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-3">Usage Data</h3>
                      <ul className="space-y-2 text-slate-600 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                          Pages visited
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                          Agent usage patterns
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                          Session duration (anonymized)
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 2: How We Use Your Data */}
                <section id="privacy-2" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-teal-50 text-teal-600">
                      <Server className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">2. How We Use Your Data</h2>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        icon: <Users className="w-6 h-6" />,
                        title: "Service Delivery",
                        desc: "Provide personalized AI assistance and educational support",
                        color: "emerald"
                      },
                      {
                        icon: <Download className="w-6 h-6" />,
                        title: "Improvement",
                        desc: "Train and refine AI models for better accuracy",
                        color: "teal"
                      },
                      {
                        icon: <ShieldCheck className="w-6 h-6" />,
                        title: "Security",
                        desc: "Protect against abuse and unauthorized access",
                        color: "cyan"
                      }
                    ].map((item, idx) => (
                      <div key={idx} className={`bg-${item.color}-50/50 rounded-2xl p-6 border border-${item.color}-100 hover:shadow-md transition-shadow`}>
                        <div className={`w-12 h-12 bg-${item.color}-100 rounded-xl flex items-center justify-center mb-4 text-${item.color}-600`}>
                          {item.icon}
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 3: Data Sharing */}
                <section id="privacy-3" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">3. Data Sharing</h2>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200 mb-6">
                    <p className="text-lg text-slate-700 mb-6">
                      We <span className="font-bold text-slate-900 underline decoration-orange-400 decoration-2 underline-offset-4">never</span> sell your personal data. Limited sharing occurs only with:
                    </p>
                    
                    <div className="space-y-4">
                      {[
                        { title: "AI Providers", desc: "Perplexity/OpenAI for service delivery only", icon: <Server className="w-5 h-5" /> },
                        { title: "Legal Authorities", desc: "Only with proper court orders and legal obligations", icon: <Lock className="w-5 h-5" /> },
                        { title: "Business Transfers", desc: "With prior notice during mergers or acquisitions", icon: <Users className="w-5 h-5" /> }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                          <div className="p-2 bg-orange-50 rounded-lg text-orange-600 flex-shrink-0">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900">{item.title}</h4>
                            <p className="text-sm text-slate-600">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 4: Your Rights */}
                <section id="privacy-4" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                      <FileKey className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">4. Your Rights</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 transition-colors group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Download className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">GDPR Art. 15</span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2">Access & Download</h3>
                      <p className="text-sm text-slate-600 mb-4">Export your data anytime from Account Settings in JSON or CSV format.</p>
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                        Request Data <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-rose-300 transition-colors group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-rose-50 rounded-xl text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                          <Trash2 className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">GDPR Art. 17</span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2">Delete Account</h3>
                      <p className="text-sm text-slate-600 mb-4">Permanent deletion within 30 days of request. No questions asked.</p>
                      <button className="text-sm font-medium text-rose-600 hover:text-rose-700 flex items-center gap-1">
                        Delete Account <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 5: Data Security */}
                <section id="privacy-5" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-slate-100 text-slate-700">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">5. Data Security</h2>
                  </div>
                  
                  <div className="prose prose-slate max-w-none text-slate-600">
                    <p className="text-lg leading-relaxed">
                      We implement industry-standard security measures to protect your data:
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4 mt-6 not-prose">
                      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-medium text-slate-700">AES-256 Encryption</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-medium text-slate-700">SOC 2 Type II Hosting</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-medium text-slate-700">Regular Penetration Testing</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-medium text-slate-700">Zero-Knowledge Architecture</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-8 rounded-r-lg">
                      <p className="text-amber-800 text-sm m-0 font-medium flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>Disclaimer: While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security. No method of transmission over the Internet is 100% secure.</span>
                      </p>
                    </div>
                  </div>
                </section>

              </div>

              {/* Footer Contact Section */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-t border-emerald-100 p-8 md:p-12">
                <div className="max-w-2xl mx-auto text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-emerald-600">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Privacy Concerns?</h3>
                  <p className="text-slate-600 mb-8">
                    Our Data Protection Officer is available to answer any questions regarding your privacy rights.
                  </p>
                  <a 
                    href="mailto:privacy@educrew.com" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Contact DPO
                    <ChevronRight className="w-4 h-4 ml-2 opacity-70" />
                  </a>
                  <p className="mt-4 text-sm text-slate-500 font-mono">privacy@educrew.com</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;