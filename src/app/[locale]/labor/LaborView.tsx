"use client";
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { useTranslations } from 'next-intl';
import PolicyAccordionCard from '@/components/shared/PolicyAccordionCard';

interface LaborViewProps {
  data?: any;
}

const LaborView: React.FC<LaborViewProps> = ({ data }) => {
  const t = useTranslations('Navigation');
  
  const title = data?.title || "Labor Laws";
  const subtitle = data?.subtitle || "Stay informed of the latest labor regulations, employment practices, and compliance guidelines.";
  
  const sectionTitle = data?.sectionTitle || "Labor Regulations & Guidelines";
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
        return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'}${url}`;
      }).filter(Boolean);
    }

    const items = Array.isArray(bgData) ? bgData : [bgData];
    return items.map((item: any) => {
      const url = item?.url;
      if (!url) return '';
      return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'}${url}`;
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
          { name: t('laborLaw') }
        ]} 
      />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold font-heading text-seppa-blue mb-4 md:mb-5 leading-tight">{sectionTitle}</h2>
          <p className="text-sm md:text-base text-gray-500">{sectionSubtitle}</p>
        </div>

        {policies.length > 0 ? (
          <div className="space-y-6">
            {policies.map((policy: any, idx: number) => (
              <PolicyAccordionCard key={idx} policy={policy} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-lg">
            Content is currently being updated.
          </div>
        )}
      </div>
    </div>
  );
};

export default LaborView;
