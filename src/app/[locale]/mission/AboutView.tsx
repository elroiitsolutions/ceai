"use client";
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import StrapiRichText from '@/components/ui/StrapiRichText';
import StrapiImage from '@/components/ui/StrapiImage';
import banner1 from '@/assets/website_banners/Mission/01_visionary_leadership.png';
import banner2 from '@/assets/website_banners/Mission/02_teamwork.png';
import banner3 from '@/assets/website_banners/Mission/03_global_horizons.png';
import DynamicZoneRenderer from '@/components/ui/DynamicZoneRenderer';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

interface AboutUsPageProps {
  data?: any;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ data }) => {
  const t = useTranslations('Navigation');
  
  const contentBlocks = data?.contentBlocks || [];
  
  // Fallback data mapping
  const title = data?.title || "Our Mission";
  const description = data?.description;
  const mainImage = data?.mainImage?.data?.attributes || data?.mainImage;

  return (
    <>
      {contentBlocks.length > 0 ? (
        <DynamicZoneRenderer blocks={contentBlocks} />
      ) : (
        <div className="overflow-hidden bg-slate-50 min-h-screen pb-20">
          <PageHeader
            title={t('ourMission')}
            bgImage={[banner1.src, banner2.src, banner3.src]}
            breadcrumbs={[
              { name: t('home'), path: '/' },
              { name: t('ourMission') }
            ]}
          />

          <section className="py-20 lg:py-28">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={staggerContainer}
                  className="space-y-12"
                >
                  <motion.div variants={fadeInUp}>
                    <h2 className="text-3xl font-bold text-blue-950 font-serif mb-4">{title}</h2>
                    <div className="h-1 w-16 bg-amber-600 rounded-full mb-6"></div>
                    {description ? (
                      <div className="text-lg text-slate-600 leading-relaxed font-light prose max-w-none">
                        <StrapiRichText content={description} />
                      </div>
                    ) : (
                      <p className="text-lg text-slate-600 leading-relaxed font-light">Content is being updated.</p>
                    )}
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl bg-white"
                >
                  {mainImage ? (
                    <StrapiImage 
                      media={mainImage} 
                      className="w-full h-auto object-cover aspect-[4/3]"
                    />
                  ) : (
                    <div className="w-full h-auto aspect-[4/3] bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default AboutUsPage;
