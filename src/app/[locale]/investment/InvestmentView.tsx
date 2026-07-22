"use client";
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { useTranslations } from 'next-intl';
import PolicyAccordionCard from '@/components/shared/PolicyAccordionCard';
import DynamicZoneRenderer from '@/components/ui/DynamicZoneRenderer';

interface InvestmentViewProps {
  data?: any;
}

const InvestmentView: React.FC<InvestmentViewProps> = ({ data }) => {
  const t = useTranslations('Navigation');
  
  const contentBlocks = data?.contentBlocks || [];
  
  const title = data?.title || "Investment Info";
  const subtitle = data?.subtitle || "Stay informed of the latest investment opportunities and guidelines.";
  
  const sectionTitle = data?.sectionTitle || "Investment Guidelines & Analysis";
  const sectionSubtitle = data?.sectionSubtitle || "In-depth analysis of investment landscapes and market entry strategies.";
  
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

  const hasHeroBlock = contentBlocks.some((block: any) => block.__component === 'sections.hero');

  return (
    <div className="bg-gray-50 min-h-screen">
      {!hasHeroBlock && (
        <PageHeader 
          title={title} 
          subtitle={subtitle}
          bgImage={headerImages.length > 0 ? headerImages : undefined}
          breadcrumbs={[
            { name: t('home'), path: '/' },
            { name: t('investmentInfo') }
          ]} 
        />
      )}

      {/* Dynamic Zone Blocks */}
      {contentBlocks.length > 0 && (
        <DynamicZoneRenderer blocks={contentBlocks} />
      )}

      {/* Policies list section */}
      {policies.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-seppa-blue mb-4">{sectionTitle}</h2>
            <p className="text-gray-600">{sectionSubtitle}</p>
          </div>
          <div className="space-y-6">
            {policies.map((policy: any, idx: number) => (
              <PolicyAccordionCard key={idx} policy={policy} />
            ))}
          </div>
        </div>
      )}

      {/* Fallback if page is completely empty */}
      {contentBlocks.length === 0 && policies.length === 0 && (
        <div className="max-w-5xl mx-auto px-4 py-16 text-center py-20 text-gray-500 text-lg">
          Content is currently being updated.
        </div>
      )}
    </div>
  );
};

export default InvestmentView;
