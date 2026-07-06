"use client";
import React from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';
import { BackgroundSlideshow } from '@/components/home/HomeHero';

interface PageHeaderProps {
  title: string;
  breadcrumbs: { name: string; path?: string }[];
  bgImage?: string | string[];
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs, bgImage, subtitle }) => {
  const isDefaultBg = !bgImage || bgImage === "https://demo.awaikenthemes.com/yarnex/wp-content/uploads/2026/02/page-header-bg.jpg";
  
  const finalImages = isDefaultBg
    ? [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1920&q=80"
      ]
    : Array.isArray(bgImage)
    ? bgImage
    : [bgImage];
  
  return (
    <section className="pt-32 lg:pt-52 pb-16 lg:pb-28 min-h-[400px] lg:min-h-[550px] relative overflow-hidden bg-gradient-to-br from-seppa-blue to-[#0a3a7a] flex flex-col justify-center">
      {/* Background Slideshow with Animation */}
      <BackgroundSlideshow images={finalImages} className="absolute top-[64px] md:top-[112px] lg:top-[132px] bottom-0 left-0 right-0" />
      
      {/* Dark overlay */}
      <div className="absolute top-[64px] md:top-[112px] lg:top-[132px] bottom-0 left-0 right-0 bg-dark/40 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-left">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 relative inline-block"
        >
          <h1 className="text-3xl md:text-2xl lg:text-3xl font-heading font-bold text-white text-left leading-tight md:leading-snug">
            {title}
          </h1>
        </motion.div>
        
        <motion.nav 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-start space-x-2 text-white font-medium text-lg"
        >
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-white mx-2">/</span>}
              {crumb.path ? (
                <Link href={crumb.path} className="hover:text-gold transition duration-300">
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-white">{crumb.name}</span>
              )}
            </React.Fragment>
          ))}
        </motion.nav>

        {subtitle && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6"
          >
            <p className="text-lg md:text-xl text-slate-200 font-light leading-relaxed drop-shadow max-w-3xl">
              {subtitle}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
