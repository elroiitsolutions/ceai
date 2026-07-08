import React from 'react';
import { Link } from '@/i18n/routing';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import StrapiIcon from '@/components/ui/StrapiIcon';

interface WhatWeOfferProps {
  data?: any;
}

const WhatWeOffer: React.FC<WhatWeOfferProps> = ({ data }) => {
  const t = useTranslations('Navigation');
  // Use Strapi data if available, otherwise fallback to static data
  const title = data?.title || "What We Offer";
  const badge = data?.badge || "核心服務";
  const description = data?.description || "Comprehensive business support, investment consulting, and cultural exchange to help bilateral enterprises expand markets.";
  
  // Use data.cards if available; otherwise use default static cards
  const cards = data?.cards && data.cards.length > 0 ? data.cards.map((c: any, idx: number) => {
    // Handle Strapi v4/v5 media
    const media = c.image?.data?.attributes || c.image || null;
    const imageUrl = media?.url
      ? (media.url)
      : "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"; // fallback
      
    // Assign generic colors/icons based on index if icon data isn't provided
    const colors = ["text-[#E36C2F]", "text-[#27AE60]", "text-[#EB5757]", "text-[#003B73]"];
    const color = colors[idx % colors.length];

    return {
      title: c.title,
      description: c.description,
      image: imageUrl,
      link: c.link || "/",
      iconColor: color,
      iconName: c.icon
    };
  }) : [
    // Static fallback cards if none configured
    {
      title: t('investmentInfo'),
      description: "獲取最新的印台投資項目、激勵政策和行業對接機會，幫助企業進行戰略布局。",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/investment",
      iconColor: "text-[#E36C2F]",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: t('industrialZones'),
      description: "對主要工業園區、基礎設施和台灣專屬集群的深入分析。",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/industrial",
      iconColor: "text-[#27AE60]",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: t('eventSharing'),
      description: "回顧和預覽印度-台灣商務論壇、研討會和企業訪問，以保持了解最新動態。",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/events",
      iconColor: "text-[#EB5757]",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: t('culturalExchange'),
      description: "探索印度和台灣的文化、節日和商務禮儀，搭建雙邊友誼和相互理解的橋樑。",
      image: "https://images.unsplash.com/photo-1526894198609-10b3cdf45c52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/culture",
      iconColor: "text-[#003B73]",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-[#F6F5ED] m-3 rounded-2xl">
      <div className="container mx-auto px-4 max-w-[1500px]">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E36C2F] animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#003B73]">{badge}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#003B73] leading-tight mb-6">
            {title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card: any, idx: number) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden shrink-0">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-8 h-8 flex items-center justify-center shrink-0 ${card.iconColor}`}>
                    {card.iconName ? (
                      <StrapiIcon name={card.iconName} className="h-8 w-8" />
                    ) : (
                      card.icon
                    )}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[#003B73]">{card.title}</h3>
                </div>
                <p className="text-gray-500 mb-6 flex-1 line-clamp-3">
                  {card.description}
                </p>
                {card.link && (
                  <Link href={card.link} className="flex items-center text-[#E36C2F] font-bold hover:text-[#003B73] transition-colors mt-auto">
                    {t('learnMore')} <FiArrowRight className="ml-2" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;

