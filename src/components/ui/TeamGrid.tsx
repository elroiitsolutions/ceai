"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import StrapiImage from '@/components/ui/StrapiImage';
import StrapiRichText from '@/components/ui/StrapiRichText';

interface TeamMember {
  id: number;
  attributes?: any;
  name?: string;
  designation?: string;
  department?: string;
  bio?: string;
  country?: string;
  photo?: any;
}

interface TeamGridProps {
  data?: {
    badge?: string;
    title?: string;
    members?: { data: TeamMember[] } | TeamMember[];
  };
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function TeamGrid({ data }: TeamGridProps) {
  const { title, badge } = data || {};
  
  // Handle Strapi v4 vs v5 relation array
  let membersList: TeamMember[] = [];
  if (data?.members) {
    if (Array.isArray(data.members)) {
      membersList = data.members; // v5
    } else if (data.members.data && Array.isArray(data.members.data)) {
      membersList = data.members.data; // v4
    }
  }

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        
        {/* Section Header */}
        {(title || badge) && (
          <div className="text-center mb-16 max-w-3xl mx-auto">
            {badge && (
              <span className="inline-block py-1 px-3 rounded-full bg-seppa-red/10 text-seppa-red text-sm font-bold tracking-wider uppercase mb-4">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-seppa-blue mb-4">
                {title}
              </h2>
            )}
            {title && (
               <div className="h-1 w-16 bg-seppa-red mx-auto rounded-full mb-6"></div>
            )}
          </div>
        )}

        {/* Team Grid */}
        {membersList && membersList.length > 0 && (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {membersList.map((memberWrapper, idx) => {
              // Extract attributes if nested (v4) or use directly (v5)
              const member = memberWrapper.attributes || memberWrapper;
              
              return (
                <motion.div 
                  key={memberWrapper.id || idx}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col sm:flex-row gap-6 items-start"
                >
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-seppa-blue font-heading">
                        {member.name}
                      </h3>
                      {/* Icon */}
                      <div className="text-seppa-red/30">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                    
                    {member.designation && (
                      <p className="text-sm font-bold text-seppa-red uppercase tracking-wide mb-2">
                        {member.designation}
                      </p>
                    )}

                    {member.department && (
                      <p className="text-sm text-slate-500 mb-4">
                        {member.department}
                      </p>
                    )}
                    {member.bio && (
                      <div className="text-slate-600 leading-relaxed font-light text-sm prose prose-sm max-w-none">
                         <StrapiRichText content={member.bio} />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
