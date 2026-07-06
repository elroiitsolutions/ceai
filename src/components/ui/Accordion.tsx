"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

export interface AccordionItemProps {
  question: string;
  answer: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemProps[];
  defaultOpenIndex?: number | null;
}

const Accordion: React.FC<AccordionProps> = ({ items, defaultOpenIndex = 0 }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className="rounded-2xl transition-all duration-300 overflow-hidden bg-white mb-4 shadow-md border border-gray-100 hover:shadow-lg"
          >
            <button
              suppressHydrationWarning
              onClick={() => toggleItem(index)}
              className="w-full text-left px-6 md:px-8 py-5 md:py-6 flex items-center justify-between gap-6"
              aria-expanded={isOpen}
            >
              <span className={`font-heading font-bold text-lg md:text-[20px] leading-tight pr-4 transition-colors ${isOpen ? 'text-seppa-red' : 'text-dark'}`}>
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-white transition-colors duration-300 shadow-sm ${isOpen ? 'bg-seppa-red' : 'bg-seppa-blue'}`}
              >
                <FiChevronDown className="text-xl" />
              </motion.div>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 text-gray-500 leading-relaxed -mt-2">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
