"use client";
import React, { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Link, usePathname } from '@/i18n/routing';
import { FiCheckCircle, FiPlay } from 'react-icons/fi';
import StrapiImage from '@/components/ui/StrapiImage';

// Demo banners for Mission Page
import missionBanner1 from '@/assets/website_banners/Mission/01_visionary_leadership.png';
import missionBanner2 from '@/assets/website_banners/Mission/02_teamwork.png';
import missionBanner3 from '@/assets/website_banners/Mission/03_global_horizons.png';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export const BackgroundSlideshow = ({ images, className = "absolute inset-0" }: { images: string[]; className?: string }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // cycle every 6 seconds
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className={`${className} overflow-hidden z-0`}>
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0 bg-[length:100%_100%] bg-no-repeat bg-center"
          style={{ backgroundImage: `url('${images[index]}')` }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.0, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </div>
  );
};
 
interface HomeHeroProps {
  data?: any;
}

const HomeHero: React.FC<HomeHeroProps> = ({ data }) => {
  const pathname = usePathname();
  
  const title = data?.title ?? "Connecting New Business Opportunities";
  const subtitle = data?.subtitle ?? "We are committed to providing policy interpretation, regulatory consultation, industrial zone matchmaking, and investment alignment to co-create a prosperous future.";
  const badge = data?.badge ?? "★ PREMIER PLATFORM FOR INDIA-TAIWAN EXCHANGE";
  
  // Extract all background images as an array of URLs
  const getBackgroundImages = (): string[] => {
    const bgData = data?.backgroundImage;
    if (!bgData) return [];

    // Case 1: Strapi v4 nested structure: { data: [ { attributes: { url: ... } } ] }
    if (bgData.data) {
      const items = Array.isArray(bgData.data) ? bgData.data : [bgData.data];
      return items.map((item: any) => {
        const url = item?.attributes?.url || item?.url;
        if (!url) return '';
        return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'}${url}`;
      }).filter(Boolean);
    }

    // Case 2: Strapi v5 flat structure or array of media: [ { url: ... } ]
    const items = Array.isArray(bgData) ? bgData : [bgData];
    return items.map((item: any) => {
      const url = item?.url;
      if (!url) return '';
      return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'}${url}`;
    }).filter(Boolean);
  };

  const backgroundImages = getBackgroundImages();
  
  // Custom fallback list of beautiful corporate/exchange-related background images
  const fallbackImages = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1920&q=80"
  ];
  
  let slideshowImages = backgroundImages.length > 0 ? backgroundImages : fallbackImages;

  // TEMPORARY DEMO OVERRIDE: Force mission page to use the newly generated banners
  if (pathname.includes('/mission')) {
    slideshowImages = [missionBanner1.src, missionBanner2.src, missionBanner3.src];
  }

  // Handle background video
  const bannerMedia = data?.backgroundVideo?.data?.attributes || data?.backgroundVideo || null;
  const bannerUrl = bannerMedia?.url
    ? (bannerMedia.url.startsWith('http') ? bannerMedia.url : `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'}${bannerMedia.url}`)
    : null;

  // Checklist removed to match reference design

  const primaryBtnLabel = data?.primaryButton?.label || "Explore Zones";
  const primaryBtnHref = data?.primaryButton?.href || "/industrial";
  const secondaryBtnLabel = data?.secondaryButton?.label || "Investment Opportunities";
  const secondaryBtnHref = data?.secondaryButton?.href || "/investment";
  
  // Only use simple page-header mode on pages OTHER than the home page
  const isHomePage = pathname === '/' || pathname === '';
  const isSimpleMode = !isHomePage;

  if (isSimpleMode) {
    return (
      <section className="pt-32 lg:pt-52 pb-16 lg:pb-28 min-h-[400px] lg:min-h-[550px] relative overflow-hidden w-full bg-gradient-to-br from-seppa-blue to-[#0a3a7a] flex flex-col justify-center">
        {/* Background Slideshow with Animation */}
        <BackgroundSlideshow images={slideshowImages} className="absolute top-[64px] md:top-[112px] lg:top-[132px] bottom-0 left-0 right-0" />
        {/* Dark overlay */}
        <div className="absolute top-[64px] md:top-[112px] lg:top-[132px] bottom-0 left-0 right-0 bg-dark/40 z-0"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-left">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-start w-full"
          >
            <motion.div variants={fadeInUp} className="mb-2 relative inline-block">
              <h1 className="text-2xl md:text-2xl lg:text-4xl font-heading font-bold text-white text-left tracking-tight drop-shadow-md">
                {title}
              </h1>
            </motion.div>
            
            {/* Breadcrumbs (Hardcoded to Home / [Title] for now as per design) */}
            <motion.nav variants={fadeInUp} className="flex items-center justify-start space-x-2 text-white font-medium text-lg mb-6">
              <Link href="/" className="hover:text-gold transition duration-300">
                Home
              </Link>
              <span className="text-white mx-1">/</span>
              <span className="text-white">{title}</span>
            </motion.nav>

            {subtitle && (
              <motion.div variants={fadeInUp}>
                <p className="text-lg md:text-xl text-slate-200 font-light leading-relaxed drop-shadow max-w-3xl">
                  {subtitle}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden flex flex-col pt-32 lg:pt-52 pb-0 bg-gradient-to-br from-seppa-blue to-[#0a3a7a]">
      {/* Background Media */}
      <div className="hero-video-wrapper absolute top-[64px] md:top-[112px] lg:top-[132px] bottom-0 left-0 right-0 z-0 pointer-events-none">
        <div className="relative w-full h-full bg-dark overflow-hidden pointer-events-auto hero-video-inner">
          {bannerMedia?.mime?.startsWith('video') ? (
            <>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={bannerUrl!} type={bannerMedia.mime} />
              </video>
              <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.65), rgba(0,0,0,0.35))' }}></div>
            </>
          ) : (
            <>
              <BackgroundSlideshow images={slideshowImages} />
              <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.65), rgba(0,0,0,0.35))' }}></div>
            </>
          )}

          <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
            {[15, 35, 55, 75, 95].map((pos, idx) => (
              <div
                key={idx}
                style={{ left: `${pos}%` }}
                className="absolute top-[-50%] bottom-[-50%] w-px bg-white/10 rotate-[20deg] hidden md:block"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto 2xl:max-w-screen-2xl px-6 md:px-12 lg:px-24 relative z-10 flex-1 flex flex-col justify-center pb-8 lg:pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-start text-left w-full max-w-[700px]"
        >
          <motion.div variants={fadeInUp} className="flex flex-row items-center justify-start gap-3 md:gap-4 mb-4">
            <span className="text-orange-500 font-semibold text-xs md:text-sm tracking-widest bg-orange-500/10 border border-orange-500/30 px-4 py-1.5 rounded-full flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              {badge.replace('★', '').trim()}
            </span>
          </motion.div>
          
          <motion.h1
            variants={fadeInUp}
            className="font-heading font-bold text-white"
            style={{ fontSize: 'clamp(32px, 3.5vw, 60px)', lineHeight: '1.1' }}
          >
            {title}
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-base md:text-lg 2xl:text-xl text-gray-300 leading-relaxed max-w-[650px] mt-4 lg:mt-6">
            {subtitle}
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-start md:items-center mt-8 lg:mt-12 gap-4 lg:gap-6">
            <Link href={primaryBtnHref} className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-orange-600 transition duration-300">
              {primaryBtnLabel}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            
            <Link 
              href={secondaryBtnHref} 
              className="inline-flex items-center justify-center border border-white/40 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              {secondaryBtnLabel}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHero;
