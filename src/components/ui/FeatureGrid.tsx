"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from '@/i18n/routing';
import StrapiImage from '@/components/ui/StrapiImage';
import { useTranslations } from 'next-intl';
import StrapiIcon from '@/components/ui/StrapiIcon';

interface FeatureCard {
  id: number;
  icon?: string;
  title: string;
  description?: string;
  link?: string;
  image?: any;
}

interface FeatureGridProps {
  data?: {
    badge?: string;
    title?: string;
    description?: string;
    columns?: "2" | "3" | "4";
    cards?: FeatureCard[];
  };
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
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

const renderIcon = (iconName?: string) => {
  return (
    <div className="w-12 h-12 rounded-full bg-seppa-red/10 text-seppa-red flex items-center justify-center mb-6">
      <StrapiIcon name={iconName} className="w-6 h-6" />
    </div>
  );
};

export default function FeatureGrid({ data }: FeatureGridProps) {
  const t = useTranslations('Navigation');
  const { title, badge, description, columns = "3", cards = [] } = data || {};

  // Determine grid columns class based on the selected prop
  let gridColsClass = "grid-cols-1 md:grid-cols-3";
  if (columns === "2") {
    gridColsClass = "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";
  } else if (columns === "4") {
    gridColsClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  }

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        
        {/* Section Header */}
        {(title || badge || description) && (
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
            {description && (
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Grid Cards */}
        {cards && cards.length > 0 && (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className={`grid gap-8 ${gridColsClass}`}
          >
            {cards.map((card, idx) => (
              <motion.div 
                key={card.id || idx}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col h-full"
              >
                {card.image && (
                  <div className="w-full h-40 mb-6 relative rounded-lg overflow-hidden shrink-0">
                    <StrapiImage 
                      media={card.image?.data?.attributes || card.image} 
                      alt={card.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                    />
                  </div>
                )}
                {!card.image && card.icon && renderIcon(card.icon)}
                
                <div className="flex items-center gap-3 mb-4">
                  {card.image && card.icon && (
                    <div className="text-seppa-red shrink-0">
                      <StrapiIcon name={card.icon} className="w-6 h-6" />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-seppa-blue font-heading">
                    {card.title}
                  </h3>
                </div>
                
                {card.description && (
                  <p className="text-slate-600 leading-relaxed font-light text-sm md:text-base mb-6 flex-grow">
                    {card.description}
                  </p>
                )}

                {card.link && (
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <Link href={card.link} className="inline-flex items-center text-seppa-red hover:text-seppa-red/80 font-medium transition-colors text-sm">
                      {t('learnMore')}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
