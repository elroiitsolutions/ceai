"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StrapiRichText from '@/components/ui/StrapiRichText';
import StrapiIcon from '@/components/ui/StrapiIcon';

interface PolicyAccordionCardProps {
  policy: {
    title: string;
    description: string;
    date?: string;
    tag?: string;
    icon?: string;
  };
  showIcon?: boolean;
}

export default function PolicyAccordionCard({ policy, showIcon = false }: PolicyAccordionCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Split description by double newlines to isolate the first paragraph
  const descriptionBlocks = policy.description ? policy.description.split('\n\n') : [];
  const firstParagraph = descriptionBlocks.length > 0 ? descriptionBlocks[0] : '';
  const remainingParagraphs = descriptionBlocks.length > 1 ? descriptionBlocks.slice(1).join('\n\n') : '';

  return (
    <div 
      className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={`flex ${showIcon ? 'gap-6 items-start' : 'flex-col'}`}>
        
        {/* Left Column Icon (Only for City Pages / when showIcon is true) */}
        {showIcon && policy.icon && (
          <div className="w-12 h-12 rounded-xl bg-orange-50/50 border border-orange-100/30 flex items-center justify-center shrink-0 text-orange-500 mt-1">
            <StrapiIcon name={policy.icon} className="w-6 h-6" />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* Header Tag / Date (Traditional Layout) */}
          {!showIcon && (
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium mb-4">
              {policy.date && (
                <span className="text-gray-500 flex items-center gap-1">
                  <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {policy.date}
                </span>
              )}
              {policy.tag && (
                <span className="text-orange-400 uppercase flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                  {policy.tag}
                </span>
              )}
            </div>
          )}

          {/* Title and Date Row */}
          <div className="flex justify-between items-start gap-4 mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-seppa-blue group-hover:text-seppa-red transition-colors">
              {policy.title}
            </h3>
            
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Date on Right (Mockup Layout) */}
              {showIcon && policy.date && (
                <span className="text-gray-400 text-sm whitespace-nowrap pt-1">
                  {policy.date}
                </span>
              )}
              
              {remainingParagraphs && (
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  className="text-gray-400 group-hover:text-seppa-red transition-colors flex-shrink-0 bg-gray-50 p-2 rounded-full"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </motion.div>
              )}
            </div>
          </div>

          {/* Tag (if showIcon is true, display tag neatly below title) */}
          {showIcon && policy.tag && (
            <div className="mb-3">
              <span className="text-orange-400 text-xs font-bold uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded">
                {policy.tag}
              </span>
            </div>
          )}

          {/* Always show the first paragraph */}
          {firstParagraph && (
            <div className="text-gray-600 leading-relaxed prose max-w-none">
              <StrapiRichText content={firstParagraph} />
            </div>
          )}
          
          {/* Hide the rest until opened */}
          {remainingParagraphs && (
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-2 text-gray-600 leading-relaxed prose max-w-none border-t border-gray-50">
                    <StrapiRichText content={remainingParagraphs} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Read More / Read Less Button */}
          {remainingParagraphs && (
            <div className="mt-4 inline-block">
              <span className="text-orange-500 font-medium text-sm group-hover:text-seppa-red transition-colors flex items-center gap-1">
                {isOpen ? 'Read Less' : 'Read More'} 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
