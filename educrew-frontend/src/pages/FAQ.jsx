// import React, { useState } from 'react';
// import { ArrowLeft, Search, HelpCircle, Code, BookOpen, Shield, Zap, Clock, CheckCircle2 } from 'lucide-react';

// const faqs = [
//   {
//     q: "What is EduCrew?",
//     a: "EduCrew is a multi-agent AI platform for college students. Five specialized agents help with research, coding, project planning, quality review, and study coaching.",
//     icon: BookOpen,
//     color: "from-indigo-500 to-purple-600"
//   },
//   {
//     q: "Is the AI accurate?",
//     a: "Our AI agents use state-of-the-art models (Perplexity Pro, OpenAI). Always review outputs for your specific needs. Accuracy improves with clear prompts.",
//     icon: Shield,
//     color: "from-emerald-500 to-teal-600"
//   },
//   {
//     q: "Is it free?",
//     a: "Yes! Free tier includes unlimited basic access. Premium ($9/month) unlocks advanced features, priority support, and higher usage limits.",
//     icon: Zap,
//     color: "from-amber-500 to-orange-600"
//   },
//   {
//     q: "Is my data private?",
//     a: "100% private. We never sell data. Educational content processed only for your session. Account data encrypted at rest.",
//     icon: Shield,
//     color: "from-emerald-500 to-teal-600"
//   },
//   {
//     q: "What languages are supported?",
//     a: "English primary. Agents understand context in Hindi, Spanish, French. Technical content best in English.",
//     icon: HelpCircle,
//     color: "from-purple-500 to-pink-600"
//   },
//   {
//     q: "Can I use it for assignments?",
//     a: "Yes, for learning and understanding. Never submit AI content as your own work. Use as study aid and tutor.",
//     icon: CheckCircle2,
//     color: "from-green-500 to-emerald-600"
//   },
//   {
//     q: "Code Mentor features?",
//     a: "Real-time code execution in Docker sandbox, syntax highlighting, debugging help, interview prep, 50+ languages.",
//     icon: Code,
//     color: "from-blue-500 to-indigo-600"
//   },
//   {
//     q: "How to contact support?",
//     a: "Email support@educCrew.com or use in-app chat. Response within 24 hours. Live chat coming soon.",
//     icon: Clock,
//     color: "from-gray-500 to-gray-600"
//   }
// ];

// const FAQ = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [openIndex, setOpenIndex] = useState(null);

//   const filteredFaqs = faqs.filter(faq => 
//     faq.q.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-4 md:px-8">
//       <div className="max-w-4xl mx-auto">
//         <a href="/" className="inline-flex items-center mb-12 px-6 py-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200">
//           <ArrowLeft className="w-5 h-5 mr-3 text-gray-600" />
//           <span className="font-medium text-gray-800">Back to Home</span>
//         </a>

//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 md:p-16 border border-white/50">
//           <div className="text-center mb-16">
//             <div className="inline-flex p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl mb-6">
//               <HelpCircle className="w-12 h-12 text-white" />
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
//               Frequently Asked Questions
//             </h1>
//             <p className="text-xl text-gray-700 max-w-2xl mx-auto">
//               Everything you need to know about EduCrew
//             </p>
//           </div>

//           {/* Search */}
//           <div className="max-w-md mx-auto mb-12">
//             <div className="relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search FAQs..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-lg"
//               />
//             </div>
//           </div>

//           {/* FAQ Items */}
//           <div className="space-y-4">
//             {filteredFaqs.map((faq, index) => {
//               const Icon = faq.icon;
//               return (
//                 <div
//                   key={index}
//                   className="faq-item group"
//                   onClick={() => setOpenIndex(openIndex === index ? null : index)}
//                 >
//                   <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer ${openIndex === index ? 'ring-4 ring-indigo-100 shadow-2xl' : ''}`}>
//                     <div className="p-8 flex items-center justify-between">
//                       <div className="flex items-center">
//                         <div className={`p-3 rounded-xl ${faq.color} shadow-lg mr-4 flex-shrink-0`}>
//                           <Icon className="w-6 h-6 text-white" />
//                         </div>
//                         <div>
//                           <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{faq.q}</h3>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <span className={`w-3 h-3 rounded-full transition-all ${openIndex === index ? 'bg-indigo-600 scale-110' : 'bg-gray-300 group-hover:bg-indigo-400'}`} />
//                         <div className={`w-2 h-8 border-r-2 border-gray-300 group-hover:border-indigo-500 transition-colors ${openIndex === index ? 'rotate-90 border-indigo-500' : ''}`} />
//                       </div>
//                     </div>
//                     <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100 p-8 pt-0 bg-gradient-to-r from-slate-50 to-indigo-50' : 'max-h-0 opacity-0'}`}>
//                       <p className="text-gray-700 leading-relaxed text-lg">{faq.a}</p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {filteredFaqs.length === 0 && (
//             <div className="text-center py-24">
//               <HelpCircle className="w-24 h-24 text-gray-300 mx-auto mb-8" />
//               <h3 className="text-2xl font-bold text-gray-600 mb-4">No FAQs found</h3>
//               <p className="text-gray-500 mb-8">Try a different search term</p>
//               <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg">
//                 Contact Support
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FAQ;


import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  HelpCircle, 
  Code, 
  BookOpen, 
  Shield, 
  Zap, 
  Clock, 
  CheckCircle2,
  MessageCircle,
  ChevronDown,
  Sparkles,
  Mail
} from 'lucide-react';

const faqs = [
  {
    q: "What is EduCrew?",
    a: "EduCrew is a multi-agent AI platform for college students. Five specialized agents help with research, coding, project planning, quality review, and study coaching.",
    icon: BookOpen,
    color: "indigo"
  },
  {
    q: "Is the AI accurate?",
    a: "Our AI agents use state-of-the-art models (Perplexity Pro, OpenAI). Always review outputs for your specific needs. Accuracy improves with clear prompts.",
    icon: Shield,
    color: "emerald"
  },
  {
    q: "Is it free?",
    a: "Yes! EduCrew is completely free with unlimited access for everyone. All agents and features available - no paid plans or limits.",
    icon: Zap,
    color: "amber"
  },
  {
    q: "Is my data private?",
    a: "100% private. We never sell data. Educational content processed only for your session. Account data encrypted at rest.",
    icon: Shield,
    color: "emerald"
  },
  {
    q: "What languages are supported?",
    a: "English primary. Agents understand context in Hindi, Spanish, French. Technical content best in English.",
    icon: MessageCircle,
    color: "purple"
  },
  {
    q: "Can I use it for assignments?",
    a: "Yes, for learning and understanding. Never submit AI content as your own work. Use as study aid and tutor.",
    icon: CheckCircle2,
    color: "green"
  },
  {
    q: "Code Mentor features?",
    a: "Real-time code execution in Docker sandbox, syntax highlighting, debugging help, interview prep, 50+ languages.",
    icon: Code,
    color: "blue"
  },
  {
    q: "How to contact support?",
    a: "Email support@educrew.com or use in-app chat. Response within 24 hours. Live chat coming soon.",
    icon: Clock,
    color: "slate"
  }
];

const colorMap = {
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', gradient: 'from-indigo-500 to-purple-600' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', gradient: 'from-emerald-500 to-teal-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', gradient: 'from-amber-500 to-orange-600' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', gradient: 'from-purple-500 to-pink-600' },
  green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', gradient: 'from-green-500 to-emerald-600' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-500 to-indigo-600' },
  slate: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', gradient: 'from-slate-500 to-gray-600' }
};

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Decorative Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Navigation */}
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

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl shadow-indigo-200 mb-6">
            <HelpCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about EduCrew. Can't find what you're looking for? Reach out to our team.
          </p>
        </div>

        

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const Icon = faq.icon;
            const colors = colorMap[faq.color];
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'shadow-xl border-indigo-200 ring-4 ring-indigo-50' 
                    : 'shadow-sm border-slate-200 hover:shadow-md hover:border-indigo-200'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${colors.gradient} shadow-lg flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className={`text-lg font-bold transition-colors ${
                      isOpen ? 'text-indigo-600' : 'text-slate-900 group-hover:text-indigo-600'
                    }`}>
                      {faq.q}
                    </h3>
                  </div>
                  <div className={`ml-4 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen ? 'bg-indigo-100 rotate-180' : 'bg-slate-100 group-hover:bg-indigo-50'
                  }`}>
                    <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-indigo-600' : 'text-slate-400'}`} />
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 pt-2">
                    <div className={`pl-[3.25rem] border-l-2 ${colors.border}`}>
                      <p className="text-slate-600 leading-relaxed text-lg pl-6">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No results found</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              We couldn't find any FAQs matching "{searchTerm}". Try a different search term or contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
              >
                Clear Search
              </button>
              <a 
                href="mailto:support@educrew.com"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Contact Support
              </a>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Still have questions?</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Can't find what you're looking for?</h3>
            <p className="text-indigo-100 mb-8 max-w-lg mx-auto">
              Our support team is available Monday through Friday, 9am to 6pm EST to help you with any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@educrew.com"
                className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Email Support
              </a>
              <button className="px-8 py-4 bg-indigo-500/50 hover:bg-indigo-500/70 text-white font-medium rounded-xl border border-white/20 backdrop-blur-sm transition-all">
                View Documentation
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQ;