"use client";
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { useTranslations } from 'next-intl';
import PolicyAccordionCard from '@/components/shared/PolicyAccordionCard';

interface EventsViewProps {
  data?: any;
}

const EventsView: React.FC<EventsViewProps> = ({ data }) => {
  const t = useTranslations('Navigation');
  
  const title = data?.title || "Event Sharing";
  const subtitle = data?.subtitle || "Stay informed of the latest bilateral events, seminars, and exhibitions.";
  
  const sectionTitle = data?.sectionTitle || "Upcoming & Past Events";
  const sectionSubtitle = data?.sectionSubtitle || "A curated list of important networking and trade events.";
  
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
          { name: t('eventSharing') }
        ]} 
      />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
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
          <div className="text-center py-20 text-gray-500 text-lg">
            Content is currently being updated.
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsView;
