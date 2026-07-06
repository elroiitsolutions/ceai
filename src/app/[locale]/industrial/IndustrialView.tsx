"use client";
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { useTranslations } from 'next-intl';
import StrapiRichText from '@/components/ui/StrapiRichText';

interface IndustrialViewProps {
  data?: any[];
  pageData?: any;
}

const IndustrialView: React.FC<IndustrialViewProps> = ({ data = [], pageData = {} }) => {
  const t = useTranslations('Navigation');
  const tIndustrial = useTranslations('IndustrialPage');
  
  // Base API URL for images
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';

  const title = pageData.title || "Industrial Zones - CEAI";
  const subtitle = pageData.subtitle || "In-depth analysis of key industrial parks, infrastructure, and exclusive Taiwanese clusters.";

  const getHeaderImages = (): string[] => {
    const bgData = pageData?.headerImage;
    if (!bgData) return [];

    if (bgData.data) {
      const items = Array.isArray(bgData.data) ? bgData.data : [bgData.data];
      return items.map((item: any) => {
        const url = item?.attributes?.url || item?.url;
        if (!url) return '';
        return url.startsWith('http') ? url : `${API_URL}${url}`;
      }).filter(Boolean);
    }

    const items = Array.isArray(bgData) ? bgData : [bgData];
    return items.map((item: any) => {
      const url = item?.url;
      if (!url) return '';
      return url.startsWith('http') ? url : `${API_URL}${url}`;
    }).filter(Boolean);
  };

  const headerImages = getHeaderImages();

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title={title} 
        subtitle={subtitle}
        bgImage={headerImages.length > 0 ? headerImages : undefined}
        breadcrumbs={[{ name: t('home'), path: '/' }, { name: t('industrialZones') }]} 
      />
      
      <section className="py-20 max-w-7xl mx-auto px-4">
        {data.length > 0 ? (
          <div className="space-y-24">
            {data.map((zone, idx) => {
              const attrs = zone.attributes || zone;
              const isEven = idx % 2 === 0;
              
              // Process Image URL
              let imageUrl = '';
              const coverMedia = attrs.coverImage?.data?.attributes || attrs.coverImage;
              if (coverMedia?.url) {
                imageUrl = coverMedia.url.startsWith('http') ? coverMedia.url : `${API_URL}${coverMedia.url}`;
              }

              return (
                <div key={zone.id || idx} className={`flex flex-col lg:flex-row gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Image Column */}
                  <div className="w-full lg:w-1/2 relative">
                    {/* Decorative Offset Background */}
                    <div className={`hidden lg:block absolute top-6 ${!isEven ? '-left-6' : '-right-6'} w-full h-full bg-[#fdf3eb] rounded-3xl -z-10`}></div>
                    
                    <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl h-[400px] lg:h-[450px] relative z-10">
                      {imageUrl ? (
                        <img src={imageUrl} alt={attrs.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                      )}
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    {/* Region Tag */}
                    {attrs.region && (
                      <div className="flex items-center gap-2 text-[#d9662f] font-bold uppercase text-xs md:text-sm tracking-wider mb-2 md:mb-2">
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        {attrs.region}
                      </div>
                    )}
                    
                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold font-heading text-seppa-blue mb-4 md:mb-5 leading-snug md:leading-tight">
                      {attrs.title}
                    </h2>

                    {/* Description */}
                    {attrs.content && (
                      <div className="text-gray-500 text-sm md:text-base leading-relaxed mb-4 md:mb-5 prose max-w-none prose-p:text-gray-500 prose-p:text-sm md:prose-p:text-base prose-p:leading-relaxed">
                        <StrapiRichText content={attrs.content} />
                      </div>
                    )}

                    {/* Key Advantages */}
                    {attrs.keyAdvantages && attrs.keyAdvantages.length > 0 && (
                      <div className="mb-6 md:mb-7">
                        <div className="flex items-center gap-2 text-seppa-blue font-bold text-base md:text-lg mb-2 md:mb-2">
                          <svg className="w-5 h-5 md:w-6 md:h-6 text-seppa-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {tIndustrial('keyAdvantages')}
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4 text-gray-500 text-sm md:text-base">
                          {attrs.keyAdvantages.map((item: any, i: number) => (
                            <li key={i} className="flex items-start gap-2 md:gap-2">
                              <span className="text-[#d9662f] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#d9662f] flex-shrink-0"></span>
                              <span className="leading-snug">{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Exclusive Incentives */}
                    {attrs.exclusiveIncentives && attrs.exclusiveIncentives.length > 0 && (
                      <div className="bg-[#fffcf7] border border-[#fce9dc] rounded-2xl p-3 md:p-4 lg:p-5 shadow-sm">
                        <div className="flex items-center gap-2 text-[#d9662f] font-bold text-base md:text-lg mb-3 md:mb-2">
                          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                          </svg>
                          {tIndustrial('exclusiveIncentives')}
                        </div>
                        <ul className="space-y-1 md:space-y-1">
                          {attrs.exclusiveIncentives.map((item: any, i: number) => (
                            <li key={i} className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-gray-500">
                              <svg className="w-4 h-4 md:w-5 md:h-5 text-[#d9662f] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                              </svg>
                              <span className="leading-snug">{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-lg">
            Content is currently being updated.
          </div>
        )}
      </section>
    </div>
  );
};

export default IndustrialView;
