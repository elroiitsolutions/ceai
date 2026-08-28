"use client";
import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { useTranslations, useLocale } from 'next-intl';
import PolicyAccordionCard from '@/components/shared/PolicyAccordionCard';
import { FiBriefcase, FiFileText, FiMapPin } from 'react-icons/fi';

interface LaborViewProps {
  data?: any;
}

const LaborView: React.FC<LaborViewProps> = ({ data }) => {
  const tNav = useTranslations('Navigation');
  const tLabor = useTranslations('LaborPage');
  const locale = useLocale();
  const isZh = locale === 'zh';
  
  const [activeTab, setActiveTab] = useState(0);

  const title = data?.title || "Investment Guide";
  const subtitle = data?.subtitle || "Stay informed of the latest labor regulations, employment practices, and compliance guidelines.";
  
  const sectionTitle = data?.sectionTitle || "Investment Guide";
  const sectionSubtitle = data?.sectionSubtitle || "In-depth analysis of employment standards and legal frameworks.";
  
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

  // Distribute policies to tabs:
  // Tab 1: First 3 policies
  // Tab 2: Next 3 policies
  // Tab 3: Remaining policies
  const tabs = [
    {
      id: 0,
      title: tLabor('tab1Title'),
      heading: tLabor('tab1Heading'),
      description: tLabor('tab1Desc'),
      icon: 'briefcase',
      policies: policies.slice(0, 3).map((p: any) => ({ ...p, icon: p.icon || 'briefcase' }))
    },
    {
      id: 1,
      title: tLabor('tab2Title'),
      heading: tLabor('tab2Heading'),
      description: tLabor('tab2Desc'),
      icon: 'file-text',
      policies: policies.slice(3, 6).map((p: any) => ({ ...p, icon: p.icon || 'file-text' }))
    },
    {
      id: 2,
      title: tLabor('tab3Title'),
      heading: tLabor('tab3Heading'),
      description: tLabor('tab3Desc'),
      icon: 'map-pin',
      policies: policies.slice(6).map((p: any) => ({ ...p, icon: p.icon || 'map-pin' }))
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHeader 
        title={title} 
        subtitle={subtitle}
        bgImage={headerImages.length > 0 ? headerImages : undefined}
        breadcrumbs={[
          { name: tNav('home'), path: '/' },
          { name: tNav('laborLaw') }
        ]} 
      />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-seppa-blue mb-4 md:mb-5 leading-tight">{sectionTitle}</h2>
          <p className="text-sm md:text-base text-gray-500">{sectionSubtitle}</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm md:text-base transition-all duration-300 shadow-sm cursor-pointer ${
                  isActive 
                    ? 'bg-seppa-blue text-white shadow-md scale-105' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {tab.id === 0 && <FiBriefcase className={isActive ? 'text-white' : 'text-orange-500'} />}
                {tab.id === 1 && <FiFileText className={isActive ? 'text-white' : 'text-orange-500'} />}
                {tab.id === 2 && <FiMapPin className={isActive ? 'text-white' : 'text-orange-500'} />}
                {tab.title}
              </button>
            );
          })}
        </div>

        {/* Active Tab Header Card */}
        <div className="bg-orange-50/30 border border-orange-100/60 rounded-3xl p-6 md:p-8 mb-10 shadow-xs">
          <div className="flex gap-4 md:gap-5 items-start">
            <div className="p-3.5 bg-white rounded-2xl shadow-sm text-orange-500 shrink-0">
              {activeTab === 0 && <FiBriefcase className="w-6 h-6 md:w-7 md:h-7" />}
              {activeTab === 1 && <FiFileText className="w-6 h-6 md:w-7 md:h-7" />}
              {activeTab === 2 && <FiMapPin className="w-6 h-6 md:w-7 md:h-7" />}
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold font-heading text-seppa-blue mb-2.5">
                {tabs[activeTab].heading}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {tabs[activeTab].description}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Policies Content */}
        {tabs[activeTab].policies.length > 0 ? (
          <div className="space-y-6">
            {tabs[activeTab].policies.map((policy: any, idx: number) => (
              <PolicyAccordionCard key={idx} policy={policy} showIcon={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl shadow-sm text-gray-400">
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            <p className="text-base font-medium">{isZh ? "內容正在更新中..." : "Content is currently being updated for this section."}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaborView;
