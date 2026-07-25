"use client";
import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { useTranslations } from 'next-intl';
import PolicyAccordionCard from '@/components/shared/PolicyAccordionCard';
import { motion, AnimatePresence } from 'framer-motion';

interface PolicyViewProps {
  data?: any;
  cityPages?: any[];
}

const RegionAccordionCard = ({ city }: { city: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const policies = city?.latestPolicies || city?.attributes?.latestPolicies || [];
  const cityName = city?.cityName || city?.attributes?.cityName || "";
  const subtitle = city?.subtitle || city?.attributes?.subtitle || "";

  return (
    <div 
      className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-wider bg-orange-50 px-2.5 py-1 rounded mb-3 inline-block">
            Regional Hub
          </span>
          <h3 className="text-2xl font-bold text-seppa-blue group-hover:text-seppa-red transition-colors">
            {cityName}
          </h3>
          <p className="text-gray-500 mt-2 text-sm md:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-gray-400 group-hover:text-seppa-red transition-colors flex-shrink-0 bg-gray-50 p-2 rounded-full mt-1"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 mt-6 border-t border-gray-100 space-y-6" onClick={(e) => e.stopPropagation()}>
              <h4 className="text-lg font-bold text-seppa-blue border-b border-gray-50 pb-2">
                Latest Policies & Regulations
              </h4>
              {policies.length > 0 ? (
                <div className="space-y-4">
                  {policies.map((policy: any, idx: number) => (
                    <PolicyAccordionCard key={idx} policy={policy} showIcon={true} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No policies defined for this region.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isOpen && (
        <div className="mt-4 inline-block">
          <span className="text-orange-500 font-medium text-sm group-hover:text-seppa-red transition-colors flex items-center gap-1">
            Read More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </span>
        </div>
      )}
    </div>
  );
};

const PolicyView: React.FC<PolicyViewProps> = ({ data, cityPages = [] }) => {
  const t = useTranslations('Navigation');
  
  const title = data?.title || "Government Policies";
  const subtitle = data?.subtitle || "Stay informed of the latest bilateral economic policies and subsidy schemes.";
  
  const sectionTitle = data?.sectionTitle || "Policy Interpretations & Guidelines";
  const sectionSubtitle = data?.sectionSubtitle || "In-depth analysis of key industries and trade promotion strategies.";
  
  const policies = data?.policies || [];

  const getHeaderImages = (): string[] => {
    const bgData = data?.headerImage;
    if (!bgData) return [];

    if (bgData.data) {
      const items = Array.isArray(bgData.data) ? bgData.data : [bgData.data];
      return items.map((item: any) => {
        const url = item?.attributes?.url || item?.url;
        if (!url) return '';
        return url;
      }).filter(Boolean);
    }

    const items = Array.isArray(bgData) ? bgData : [bgData];
    return items.map((item: any) => {
      const url = item?.url;
      if (!url) return '';
      return url;
    }).filter(Boolean);
  };

  const headerImages = getHeaderImages();

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHeader 
        title={title} 
        subtitle={subtitle}
        bgImage={headerImages.length > 0 ? headerImages : undefined}
        breadcrumbs={[
          { name: t('home'), path: '/' },
          { name: t('governmentPolicy') }
        ]} 
      />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
        
        {/* National/Bilateral Policies */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-seppa-blue mb-4">{sectionTitle}</h2>
            <p className="text-gray-600">{sectionSubtitle}</p>
          </div>

          {policies.length > 0 ? (
            <div className="space-y-6">
              {policies.map((policy: any, idx: number) => (
                <PolicyAccordionCard key={idx} policy={policy} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500 text-lg">
              Bilateral content is currently being updated.
            </div>
          )}
        </div>

        {/* Regional Policies Section (Chennai, Andhra Pradesh, New Delhi) */}
        {cityPages.length > 0 && (
          <div className="pt-8 border-t border-gray-200">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-seppa-blue mb-4">Regional Policies & Hubs</h2>
              <p className="text-gray-600">Specific investment guidelines, local incentives, and policies in key Indian states and cities.</p>
            </div>

            <div className="space-y-6">
              {cityPages.map((city: any, idx: number) => (
                <RegionAccordionCard key={idx} city={city} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PolicyView;
