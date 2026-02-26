// import React from "react";
// import { Link } from "react-router-dom";
// import { 
//   BookOpen, GraduationCap, Code2, ShieldCheck, 
//   Presentation, Mail, Phone, Twitter, Linkedin, Github 
// } from "lucide-react";
// import logo from "../components/logo.jpeg";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="relative w-full bg-[#030712] pt-24 pb-8 overflow-hidden">
//       {/* Wave Shape Divider - Matches the light green curve style but in Slate-900 */}
//       <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
//         <svg 
//           className="relative block w-full h-[80px]" 
//           viewBox="0 0 1200 120" 
//           preserveAspectRatio="none"
//         >
//           <path 
//             d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
//             fill="#0f172a" // This creates the "EduCrew" dark blue wave effect
//           ></path>
//         </svg>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
//           {/* Column 1: Brand (Top Left in Image) */}
//           <div className="space-y-6">
//             <Link to="/" className="flex items-center gap-3 group">
//               <img 
//                 src={logo} 
//                 alt="EduCrew Logo" 
//                 className="h-12 w-12 rounded-xl border border-white/10 shadow-lg group-hover:scale-105 transition-transform" 
//               />
//               <span className="text-2xl font-black text-white tracking-tighter">EduCrew</span>
//             </Link>
//             <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">
//               AI-driven academic intelligence designed for modern students and researchers.
//             </p>
//             <p className="text-xs text-slate-500 font-medium tracking-wide italic">
//               © {currentYear} educrew.ai
//             </p>
//           </div>

//           {/* Column 2: AI Tools (Shop Matcha equivalent) */}
//           <div>
//             <h4 className="text-white font-bold mb-6 text-lg tracking-tight">AI Tools</h4>
//             <ul className="space-y-3">
//               <FooterLink to="/research" icon={<BookOpen size={14}/>}>Research Assistant</FooterLink>
//               <FooterLink to="/study" icon={<GraduationCap size={14}/>}>Study Coach</FooterLink>
//               <FooterLink to="/presentation" icon={<Presentation size={14}/>}>Presentation Pro</FooterLink>
//               <FooterLink to="/code" icon={<Code2 size={14}/>}>Code Mentor</FooterLink>
//               <FooterLink to="/quality" icon={<ShieldCheck size={14}/>}>Quality Review</FooterLink>
//             </ul>
//           </div>

//           {/* Column 3: Contact (Learn equivalent) */}
//           <div>
//             <h4 className="text-white font-bold mb-6 text-lg tracking-tight">Contact Us</h4>
//             <ul className="space-y-4">
//               <li className="flex items-center gap-3 text-sm text-slate-400">
//                 <Mail size={16} className="text-[#3c6fa4]" />
//                 hello@educrew.ai
//               </li>
//               <li className="flex items-center gap-3 text-sm text-slate-400">
//                 <Phone size={16} className="text-[#3c6fa4]" />
//                 +1 (555) EDU-CREW
//               </li>
//               <li className="pt-2">
//                 <Link to="/contact" className="text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-white transition-colors">
//                   Open Support Ticket →
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Column 4: Social (Follow Us equivalent) */}
//           <div className="flex flex-col items-start lg:items-end">
//             <h4 className="text-white font-bold mb-6 text-lg tracking-tight lg:pr-2">Follow us</h4>
//             <div className="flex gap-3">
//               <SocialCircle icon={<Twitter size={18} />} href="https://twitter.com" />
//               <SocialCircle icon={<Linkedin size={18} />} href="https://linkedin.com" />
//               <SocialCircle icon={<Github size={18} />} href="https://github.com" />
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar: Legal (Terms/Privacy) */}
//         <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="flex flex-wrap gap-6 text-[11px] uppercase tracking-[0.2em] font-bold text-slate-600">
//             <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
//             <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
//             <Link to="/refund" className="hover:text-blue-400 transition-colors">Refund Policy</Link>
//             <Link to="/accessibility" className="hover:text-blue-400 transition-colors">Accessibility</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// // Helper component for cleaner list links
// const FooterLink = ({ to, children, icon }) => (
//   <li>
//     <Link to={to} className="text-slate-400 hover:text-white text-sm flex items-center gap-2 transition-colors duration-200">
//       <span className="text-[#3c6fa4]">{icon}</span>
//       {children}
//     </Link>
//   </li>
// );

// // Helper component for the social circles seen in your image
// const SocialCircle = ({ icon, href }) => (
//   <a 
//     href={href} 
//     target="_blank" 
//     rel="noreferrer"
//     className="w-10 h-10 flex items-center justify-center bg-[#0f172a] text-white rounded-full border border-white/10 hover:bg-[#3c6fa4] transition-all duration-300"
//   >
//     {icon}
//   </a>
// );

// export default Footer;



import React from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, GraduationCap, Code2, ShieldCheck, 
  Presentation, Mail, Phone, Twitter, Linkedin, Github 
} from "lucide-react";
import logo from "../components/logo.jpeg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#030712] pt-32 pb-12 overflow-hidden">
      {/* SMOOTH WAVE TRANSITION 
          This SVG creates a seamless, professional organic curve at the top.
      */}
      <div className="absolute top-0 left-0 w-full overflow-hidden line-height-0 transform rotate-180">
        <svg 
          className="relative block w-full h-[100px]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="#0f172a" /* Slightly lighter than background to create depth */
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* BRAND SECTION - 4 Columns wide */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
      <div className="relative">
        <img
          src={logo}
          alt="EduCrew Logo"
          className="h-12 w-12 object-cover rounded-full bg-white/20 backdrop-blur-sm shadow-2xl group-hover:shadow-3xl group-hover:ring-2 group-hover:ring-blue-400/30 transition-all duration-300 border-4 border-white/20 hover:border-white/40"
          loading="lazy"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10 animate-pulse" />
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-white to-blue-300 bg-clip-text text-transparent tracking-tight">
        EduCrew
      </span>
      
    </Link>
    <p className="text-[#3c6fa4] text-[10px] uppercase font-bold tracking-[0.3em]">Learning Intelligence</p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering the next generation of scholars with specialized AI agents for research, coding, and academic excellence.
            </p>
            <p className="text-[11px] text-slate-400 font-medium">
              © {currentYear} educrew.ai • Crafted for Students
            </p>
          </div>

          {/* TOOLS SECTION - 3 Columns wide */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-[0.2em]">AI Ecosystem</h4>
            <ul className="space-y-4">
              <FooterLink to="/research" icon={<BookOpen size={16}/>}>Research Assistant</FooterLink>
              <FooterLink to="/study" icon={<GraduationCap size={16}/>}>Study Coach</FooterLink>
              <FooterLink to="/presentation" icon={<Presentation size={16}/>}>Presentation Pro</FooterLink>
              <FooterLink to="/code" icon={<Code2 size={16}/>}>Code Mentor</FooterLink>
              <FooterLink to="/quality" icon={<ShieldCheck size={16}/>}>Quality Review</FooterLink>
            </ul>
          </div>

          {/* CONTACT SECTION - 3 Columns wide */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-[0.2em]">Support</h4>
            <div className="space-y-5">
              <a href="mailto:hello@educrew.ai" className="flex items-center gap-4 text-sm text-slate-400 hover:text-white transition-colors group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#3c6fa4]/20 transition-all">
                  <Mail size={18} className="text-[#3c6fa4]" />
                </div>
                hello@educrew.ai
              </a>
              <a href="tel:+15553382739" className="flex items-center gap-4 text-sm text-slate-400 hover:text-white transition-colors group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#3c6fa4]/20 transition-all">
                  <Phone size={18} className="text-[#3c6fa4]" />
                </div>
                +1 (555) EDU-CREW
              </a>
              <div className="pt-4">
                <Link to="/contact" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-all group">
                  Open Support Ticket 
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* SOCIAL SECTION - 2 Columns wide */}
          <div className="lg:col-span-2 flex flex-col items-start lg:items-end">
            <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-[0.2em]">Social</h4>
            <div className="flex gap-4">
              <SocialCircle icon={<Twitter size={20} />} href="#" />
              <SocialCircle icon={<Linkedin size={20} />} href="#" />
              <SocialCircle icon={<Github size={20} />} href="#" />
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL BAR */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-300">
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/FAQ" className="hover:text-white transition-colors">FAQ</Link>
            <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Systems Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper components for cleaner code
const FooterLink = ({ to, children, icon }) => (
  <li>
    <Link to={to} className="group text-slate-400 hover:text-white text-sm flex items-center gap-3 transition-all duration-300">
      <span className="text-slate-600 group-hover:text-[#3c6fa4] transition-colors">{icon}</span>
      <span className="group-hover:translate-x-1 transition-transform">{children}</span>
    </Link>
  </li>
);

const SocialCircle = ({ icon, href }) => (
  <a 
    href={href} 
    className="w-11 h-11 flex items-center justify-center bg-white/5 text-slate-400 rounded-xl border border-white/10 hover:border-[#3c6fa4]/50 hover:text-white hover:bg-[#3c6fa4]/10 transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;