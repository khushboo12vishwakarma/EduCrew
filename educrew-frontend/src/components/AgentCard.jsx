// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight } from 'lucide-react';

// const AgentCard = ({ title, description, icon, link }) => {
//   return (
//     <Link
//       to={link}
//       className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
//     >
//       <div className="text-5xl mb-4">{icon}</div>
//       <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-500 transition-colors">
//         {title}
//       </h3>
//       <p className="text-gray-600 mb-4">{description}</p>
//       <div className="flex items-center text-primary-500 font-medium">
//         <span>Explore</span>
//         <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
//       </div>
//     </Link>
//   );
// };

// export default AgentCard;



import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AgentCard = ({ Icon, title, description, link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 transition-colors group-hover:bg-blue-100">
        <Icon className="h-6 w-6 text-[#3c6fa4]" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">
        {title}
      </h3>

      <p className="text-slate-600 leading-relaxed">
        {description}
      </p>

      <Link
        to={link}
        className="inline-flex items-center mt-6 font-bold text-[#3c6fa4] hover:text-[#2f5e8e]"
      >
        Explore
        <span className="ml-1 transition-transform group-hover:translate-x-1">
          →
        </span>
      </Link>
    </motion.div>
  );
};

export default AgentCard;
