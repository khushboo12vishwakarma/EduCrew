// import React from 'react';
// import { ArrowLeft, Eye, Globe, Volume2, Keyboard, Palette } from 'lucide-react';

// const Accessibility = () => (
//   <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-4 md:px-8">
//     <div className="max-w-4xl mx-auto">
//       <a href="/" className="inline-flex items-center mb-12 px-6 py-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200">
//         <ArrowLeft className="w-5 h-5 mr-3 text-gray-600" />
//         <span className="font-medium text-gray-800">Back to Home</span>
//       </a>

//       <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 md:p-16 border border-white/50">
//         <div className="flex items-start mb-12 md:mb-16">
//           <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl mr-6 flex-shrink-0">
//             <Eye className="w-12 h-12 text-white" />
//           </div>
//           <div>
//             <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-tight">
//               Accessibility Statement
//             </h1>
//             <p className="text-xl text-gray-700 max-w-2xl">
//               Committed to digital inclusion for all learners
//             </p>
//           </div>
//         </div>

//         <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-12">
//           <section>
//             <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
//               Our Commitment
//             </h2>
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border-l-8 border-green-500">
//               <p className="text-xl leading-relaxed">
//                 EduCrew is committed to ensuring digital accessibility for people with disabilities. 
//                 We follow <strong>WCAG 2.1 Level AA</strong> guidelines and continuously work to improve 
//                 our services for the entire community.
//               </p>
//             </div>
//           </section>

//           <section>
//             <h2 className="text-3xl font-bold text-gray-900 mb-8">Features Implemented</h2>
//             <div className="grid md:grid-cols-2 gap-8">
//               <div className="feature-card group">
//                 <div className="flex items-start space-x-4 mb-6">
//                   <div className="p-3 bg-green-500 rounded-xl shadow-lg group-hover:scale-105 transition-transform">
//                     <Keyboard className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">Keyboard Navigation</h3>
//                   </div>
//                 </div>
//                 <p>Fully navigable using keyboard only. Tab order follows logical reading sequence.</p>
//               </div>

//               <div className="feature-card group">
//                 <div className="flex items-start space-x-4 mb-6">
//                   <div className="p-3 bg-emerald-500 rounded-xl shadow-lg group-hover:scale-105 transition-transform">
//                     <Volume2 className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">Screen Reader</h3>
//                   </div>
//                 </div>
//                 <p>Compatible with NVDA, JAWS, VoiceOver. ARIA labels on all interactive elements.</p>
//               </div>

//               <div className="feature-card group">
//                 <div className="flex items-start space-x-4 mb-6">
//                   <div className="p-3 bg-teal-500 rounded-xl shadow-lg group-hover:scale-105 transition-transform">
//                     <Eye className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">Contrast</h3>
//                   </div>
//                 </div>
//                 <p>Minimum 4.5:1 contrast ratio. High contrast mode available in settings.</p>
//               </div>

//               <div className="feature-card group">
//                 <div className="flex items-start space-x-4 mb-6">
//                   <div className="p-3 bg-cyan-500 rounded-xl shadow-lg group-hover:scale-105 transition-transform">
//                     <Palette className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">Resizable Text</h3>
//                   </div>
//                 </div>
//                 <p>Text resizes up to 200% without loss of functionality or content.</p>
//               </div>
//             </div>
//           </section>

//           <section>
//             <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Process</h2>
//             <div className="grid md:grid-cols-3 gap-6 bg-gradient-to-r from-slate-50 to-indigo-50 p-8 rounded-2xl">
//               <div className="text-center">
//                 <div className="w-20 h-20 bg-white rounded-2xl shadow-lg mx-auto mb-4 flex items-center justify-center">
//                   <span className="font-bold text-2xl text-indigo-600">1</span>
//                 </div>
//                 <h3 className="font-bold mb-2">Automated Testing</h3>
//                 <p className="text-gray-700">WAVE, axe, Lighthouse accessibility audits</p>
//               </div>
//               <div className="text-center">
//                 <div className="w-20 h-20 bg-white rounded-2xl shadow-lg mx-auto mb-4 flex items-center justify-center">
//                   <span className="font-bold text-2xl text-emerald-600">2</span>
//                 </div>
//                 <h3 className="font-bold mb-2">Manual Audits</h3>
//                 <p className="text-gray-700">Screen readers, keyboard testing, color contrast</p>
//               </div>
//               <div className="text-center">
//                 <div className="w-20 h-20 bg-white rounded-2xl shadow-lg mx-auto mb-4 flex items-center justify-center">
//                   <span className="font-bold text-2xl text-purple-600">3</span>
//                 </div>
//                 <h3 className="font-bold mb-2">Continuous Monitoring</h3>
//                 <p className="text-gray-700">Real user monitoring and regular audits</p>
//               </div>
//             </div>
//           </section>

//           <section className="pt-16 mt-16 border-t-4 border-gray-200">
//             <h2 className="text-3xl font-bold text-gray-900 mb-8">Feedback Welcome</h2>
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-12 rounded-3xl shadow-xl border-l-8 border-green-500 text-center">
//               <Globe className="w-20 h-20 text-green-600 mx-auto mb-8" />
//               <h3 className="text-2xl font-bold text-gray-900 mb-6">Encounter an accessibility barrier?</h3>
//               <div className="bg-white max-w-md mx-auto p-8 rounded-2xl shadow-lg">
//                 <p className="font-mono text-xl font-bold text-green-800 mb-4">accessibility@educCrew.com</p>
//                 <p className="text-gray-600 text-sm">We respond within 48 hours</p>
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default Accessibility;




import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Eye, 
  Globe, 
  Volume2, 
  Keyboard, 
  Palette,
  CheckCircle2,
  AlertCircle,
  Mail,
  ChevronRight,
  Monitor,
  Smartphone,
  Accessibility
} from 'lucide-react';

const features = [
  {
    icon: Keyboard,
    title: "Keyboard Navigation",
    description: "Fully navigable using keyboard only. Tab order follows logical reading sequence with visible focus indicators.",
    color: "emerald"
  },
  {
    icon: Volume2,
    title: "Screen Reader Support",
    description: "Compatible with NVDA, JAWS, and VoiceOver. Comprehensive ARIA labels on all interactive elements.",
    color: "teal"
  },
  {
    icon: Eye,
    title: "Visual Contrast",
    description: "Minimum 4.5:1 contrast ratio maintained throughout. High contrast mode available in user settings.",
    color: "cyan"
  },
  {
    icon: Palette,
    title: "Resizable Text",
    description: "Text resizes up to 200% without loss of functionality, content overlap, or horizontal scrolling.",
    color: "green"
  }
];

const processSteps = [
  {
    number: "01",
    title: "Automated Testing",
    description: "Continuous integration with WAVE, axe-core, and Lighthouse accessibility audits on every deployment.",
    icon: Monitor
  },
  {
    number: "02",
    title: "Manual Audits",
    description: "Bi-weekly testing with screen readers, keyboard-only navigation, and color contrast analyzers.",
    icon: Accessibility
  },
  {
    number: "03",
    title: "User Validation",
    description: "Real user testing with assistive technologies and feedback integration from our accessibility community.",
    icon: Smartphone
  }
];

const colorMap = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', icon: 'bg-emerald-500' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', icon: 'bg-teal-500' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', icon: 'bg-cyan-500' },
  green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', icon: 'bg-green-500' }
};

const AccessibilityPage = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Decorative Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-green-200/30 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Navigation */}
        <nav className="mb-12">
          <a 
            href="/" 
            className="group inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 mr-3 group-hover:border-emerald-200 group-hover:shadow-md transition-all">
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
                  {['Our Commitment', 'Features', 'Our Process', 'Feedback'].map((item, idx) => (
                    <li key={idx}>
                      <a
                        href={`#section-${idx + 1}`}
                        className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-3" />
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WCAG Badge */}
              <div className="bg-gradient-to-br from-blue-600 to-pink-900 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-200" />
                    <span className="font-bold text-lg">WCAG 2.1</span>
                  </div>
                  <p className="text-emerald-100 text-sm mb-4">
                    Level AA Compliant
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-200 bg-white/10 w-fit px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Certified Accessible
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            
            {/* Header Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8">
              <div className="h-2 bg-gradient-to-r from-blue-500 via-teal-500 to-pink-900" />
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                      <Eye className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                      Accessibility{' '}
                      <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
                        Statement
                      </span>
                    </h1>
                    <p className="text-lg text-slate-600">
                      Committed to digital inclusion for all learners
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className="p-8 md:p-12 space-y-16">
                
                {/* Section 1: Our Commitment */}
                <section id="section-1" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Our Commitment</h2>
                  </div>
                  
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/30 rounded-full blur-2xl -mr-16 -mt-16" />
                    <div className="relative z-10">
                      <p className="text-lg text-slate-700 leading-relaxed mb-6">
                        EduCrew is committed to ensuring digital accessibility for people with disabilities. 
                        We believe the web should be accessible to everyone, regardless of ability or technology.
                      </p>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-medium text-slate-700">WCAG 2.1 Level AA</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-medium text-slate-700">Section 508</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-medium text-slate-700">ADA Compliant</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 2: Features Implemented */}
                <section id="section-2" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-teal-50 text-teal-600">
                      <Palette className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Features Implemented</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, idx) => {
                      const Icon = feature.icon;
                      const colors = colorMap[feature.color];
                      
                      return (
                        <div 
                          key={idx}
                          className={`group relative bg-white border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${
                            activeFeature === idx ? `border-${feature.color}-400 shadow-md` : 'border-slate-200 hover:border-emerald-200'
                          }`}
                          onMouseEnter={() => setActiveFeature(idx)}
                          onMouseLeave={() => setActiveFeature(null)}
                        >
                          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colors.icon} to-transparent rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                          
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${colors.icon} shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-900 mb-2 text-lg">{feature.title}</h3>
                              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 3: Our Process */}
                <section id="section-3" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-cyan-50 text-cyan-600">
                      <Globe className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Our Process</h2>
                  </div>

                  <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-emerald-200 via-teal-200 to-cyan-200 hidden md:block" />
                    
                    <div className="space-y-8">
                      {processSteps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                          <div key={idx} className="relative flex gap-6 md:gap-8">
                            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white shadow-lg border border-slate-200 flex items-center justify-center relative z-10">
                              <span className="text-2xl font-bold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                {step.number}
                              </span>
                            </div>
                            <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                              <div className="flex items-center gap-3 mb-3">
                                <Icon className="w-5 h-5 text-emerald-600" />
                                <h3 className="font-bold text-slate-900 text-lg">{step.title}</h3>
                              </div>
                              <p className="text-slate-600 leading-relaxed">{step.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 4: Feedback */}
                <section id="section-4" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-green-50 text-green-600">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Feedback Welcome</h2>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 md:p-12 border border-emerald-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-200/30 rounded-full blur-3xl -ml-32 -mb-32" />
                    
                    <div className="relative z-10 text-center">
                      <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6">
                        <Globe className="w-10 h-10 text-emerald-600" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">
                        Encounter an accessibility barrier?
                      </h3>
                      <p className="text-slate-600 max-w-lg mx-auto mb-8">
                        We welcome your feedback on the accessibility of EduCrew. Please let us know if you encounter accessibility barriers.
                      </p>
                      
                      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto border border-emerald-100">
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <Mail className="w-5 h-5 text-emerald-600" />
                          <span className="font-mono text-lg font-bold text-emerald-800">accessibility@educrew.com</span>
                        </div>
                        <p className="text-sm text-slate-500 mb-6">We respond within 48 hours</p>
                        <a 
                          href="mailto:accessibility@educrew.com"
                          className="inline-flex items-center justify-center w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg"
                        >
                          Contact Accessibility Team
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </a>
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPage;