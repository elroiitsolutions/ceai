"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import StrapiRichText from '@/components/ui/StrapiRichText';

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description?: string;
  image?: any;
}

interface TimelineProps {
  data?: {
    title?: string;
    direction?: "vertical" | "horizontal";
    items?: TimelineItem[];
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

export default function Timeline({ data }: TimelineProps) {
  const { title, items = [] } = data || {};

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        
        {title && (
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-seppa-blue mb-4">
              {title}
            </h2>
            <div className="h-1 w-16 bg-seppa-red mx-auto rounded-full mb-6"></div>
          </div>
        )}

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-seppa-red/30 transform md:-translate-x-1/2 hidden md:block"></div>
          {/* Mobile Vertical Line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-seppa-red/30 block md:hidden"></div>

          {items && items.length > 0 && items.map((item, index) => {
            // Alternate left and right on desktop
            const isLeft = index % 2 !== 0;

            return (
              <div key={item.id || index} className={`relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Mobile Dot */}
                <div className="absolute left-4 top-6 transform -translate-x-1/2 w-8 h-8 rounded-full bg-seppa-red border-4 border-white flex items-center justify-center shadow flex md:hidden z-10">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>

                {/* Content Box - Desktop Alternates, Mobile always right */}
                <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-100"
                  >
                    <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'md:justify-end' : 'justify-start'}`}>
                      <span className="font-bold text-seppa-red font-heading text-lg tracking-wider">{item.year}</span>
                      <svg className="w-5 h-5 text-seppa-red/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-seppa-blue mb-4 font-heading">
                      {item.title}
                    </h3>
                    
                    {item.description && (
                      <div className="text-slate-600 leading-relaxed font-light text-sm md:text-base prose prose-sm max-w-none">
                         <StrapiRichText content={item.description} />
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Desktop Center Dot */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-seppa-red border-4 border-white items-center justify-center shadow-md z-10">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                
                {/* Empty Space for the other side */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
