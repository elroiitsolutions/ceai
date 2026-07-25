"use client";
import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { useTranslations } from 'next-intl';
import StrapiRichText from '@/components/ui/StrapiRichText';

interface EsgViewProps {
  data?: any;
  locale: string;
}

const ImageGallery = ({ urls, alt }: { urls: string[], alt: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (urls.length === 0) return null;
  if (urls.length === 1) {
    return <img src={urls[0]} alt={alt} className="w-full h-full object-cover" />;
  }

  return (
    <div className="relative w-full h-full group overflow-hidden bg-gray-100">
      {/* Active Image */}
      <img 
        src={urls[currentIndex]} 
        alt={`${alt} ${currentIndex + 1}`} 
        className="w-full h-full object-cover transition-all duration-500 ease-in-out" 
      />

      {/* Navigation Arrows */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setCurrentIndex((prev) => (prev === 0 ? urls.length - 1 : prev - 1));
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setCurrentIndex((prev) => (prev === urls.length - 1 ? 0 : prev + 1));
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/20 px-3 py-1.5 rounded-full">
        {urls.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function EsgView({ data, locale }: EsgViewProps) {
  const t = useTranslations('Navigation');
  const isZh = locale === 'zh';

  // Fallback default content if CMS doesn't have it
  const defaultTitle = isZh ? "ESG 永續發展與承諾" : "ESG Commitment & Responsibility";
  const defaultSubtitle = isZh 
    ? "推動印台經貿合作中的環境保護、社會責任與誠信治理，共同開創繁榮與永續的未來。" 
    : "Promoting environmental protection, social responsibility, and robust governance in India-Taiwan partnerships.";

  const defaultEnvironmentalText = isZh
    ? "印度正加速向綠色經濟與低碳社會轉型，為台商投資帶來全新機遇。我們積極協助企業實踐環境保護與綠色低碳運營：\n\n* **綠色供應鏈**：輔導台商在工業園區中建立資源循環、節能減排的綠色生產基地。\n* **潔淨與再生能源**：推動工業園區採用太陽能、風能等低碳能源，降低企業碳足跡。\n* **資源與永續利用**：引導企業導入高效能廢水處理與廢棄物回收再利用系統，符合印度在地環保法規。"
    : "India is rapidly transitioning towards a green economy, presenting new opportunities for sustainable investments. We guide Taiwanese businesses in implementing environmental sustainability and carbon reduction:\n\n* **Green Supply Chains**: Helping manufacturers establish eco-friendly supply chains and resource-circulating factories.\n* **Renewable Energy Adoption**: Supporting solar and wind power integration inside industrial parks to reduce corporate carbon footprints.\n* **Resource Conservation**: Advisory on advanced industrial wastewater treatment and waste recycling to fully comply with local environmental regulations.";

  const defaultSocialText = isZh
    ? "企業社會責任（CSR）在印度具有法定約束力。我們協助台商落實企業承諾，回饋在地社區，建立包容與和諧的勞動環境：\n\n* **在地人才培育**：推動建教合作、技能訓練，為在地青年提供優質的就業機會與生涯發展。\n* **公平勞動條件**：提供符合《2020年勞工法典》之合規指南，維護員工權益，促進健康安全的勞動關係。\n* **社區賦能與公益**：規劃教育、公共衛生及鄉村發展等CSR專案，提升在地居民福祉，树立良好企业形象。"
    : "Corporate Social Responsibility (CSR) is legally mandated in India. We assist Taiwanese companies in designing impactful social programs, nurturing local talent, and fostering deep community relationships:\n\n* **Local Talent Development**: Sponsoring vocational training programs and university collaborations to create jobs for local youth.\n* **Fair Labor Standards**: Providing compliance guides aligned with the Labor Codes 2026 to protect workers and promote safety.\n* **Community Empowerment**: Designing corporate CSR projects focusing on education, public health, and rural development.";

  const defaultGovernanceText = isZh
    ? "誠信經營與透明治理是企業在印度穩健發展的基石。我們致力於保障商業運營的透明度與道德操守：\n\n* **合規經營指導**：協助企業熟悉印度公司法、稅務體制與財務報告標準，降低法律與稅務風險。\n* **合規透明程序**：健全內部稽核與倫理準則，預防商業舞弊，建立誠實互信的台印合作範式。\n* **風險評估與控管**：提供即時的政策解順與法律合規諮詢，確保企業經營長治久安。"
    : "Operating with transparency, ethical standards, and robust governance is the foundation of long-term success. We assist businesses in maintaining the highest levels of corporate integrity:\n\n* **Regulatory Compliance**: Helping firms navigate complex corporate laws, tax regulations, and accounting standards.\n* **Ethical Standards**: Establishing internal control mechanisms and code of ethics to prevent corruption and build mutual trust.\n* **Risk Management**: Providing timely policy interpretations and legal consultations to ensure secure and sustainable operations.";

  const defaultResponsibleList = isZh ? [
    { text: "R - Respect for local cultures and regulatory standards (尊重在地文化與法規)" },
    { text: "E - Environmental excellence and green energy adoption (環境卓越與綠色能源)" },
    { text: "S - Social responsibility and community empowerment (社會責任與社區賦能)" },
    { text: "P - Partnerships built on trust and shared value (互信互惠的夥伴關係)" },
    { text: "O - Open communication and absolute transparency (開放溝通與誠信透明)" },
    { text: "N - Nurturing local talents and human resources (培育在地卓越人才)" },
    { text: "S - Sustainable supply chain integration (整合永續綠色供應鏈)" },
    { text: "I - Integrity in all business dealings and operations (在所有營運中堅守誠信)" },
    { text: "B - Bilateral economic cooperation advocacy (倡導印台雙邊經貿互惠)" },
    { text: "L - Lawful operations and strict compliance (恪守法規以實現合規經營)" },
    { text: "E - Ethical governance and corporate citizenship (實踐道德治理與企業公民責任)" }
  ] : [
    { text: "R - Respect for local cultures and regulatory standards" },
    { text: "E - Environmental excellence and green energy adoption" },
    { text: "S - Social responsibility and community empowerment" },
    { text: "P - Partnerships built on trust and shared value" },
    { text: "O - Open communication and absolute transparency" },
    { text: "N - Nurturing local talents and human resources" },
    { text: "S - Sustainable supply chain integration" },
    { text: "I - Integrity in all business dealings and operations" },
    { text: "B - Bilateral economic cooperation advocacy" },
    { text: "L - Lawful operations and strict compliance" },
    { text: "E - Ethical governance and corporate citizenship" }
  ];

  const title = data?.title || defaultTitle;
  const subtitle = data?.subtitle || defaultSubtitle;
  
  const environmentalText = data?.environmentalText || defaultEnvironmentalText;
  const socialText = data?.socialText || defaultSocialText;
  const governanceText = data?.governanceText || defaultGovernanceText;
  
  const responsibleItems = data?.responsibleList || defaultResponsibleList;

  // Format absolute or proxied Strapi Media URLs
  const formatImageUrl = (url: string): string => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/uploads/')) {
      return url;
    }
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://13.234.18.254:1337';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return `${cleanBase}${cleanPath}`;
  };

  const getImageUrls = (imgData: any): string[] => {
    if (!imgData) return [];
    if (imgData.data && Array.isArray(imgData.data)) {
      return imgData.data.map((item: any) => formatImageUrl(item?.attributes?.url || item?.url)).filter(Boolean);
    }
    if (imgData.data) {
      const url = imgData.data.attributes?.url || imgData.data.url;
      return url ? [formatImageUrl(url)] : [];
    }
    if (Array.isArray(imgData)) {
      return imgData.map((item: any) => formatImageUrl(item?.attributes?.url || item?.url || (typeof item === 'string' ? item : ''))).filter(Boolean);
    }
    const singleUrl = imgData?.url || (typeof imgData === 'string' ? imgData : '');
    return singleUrl ? [formatImageUrl(singleUrl)] : [];
  };

  const envImgs = getImageUrls(data?.environmentalImage).length > 0 
    ? getImageUrls(data?.environmentalImage) 
    : ["/uploads/es1_e426f16a13.jpeg"];

  const socImgs = getImageUrls(data?.socialImage).length > 0 
    ? getImageUrls(data?.socialImage) 
    : ["/uploads/es2_38fc0be4bf.jpeg"];

  const govImgs = getImageUrls(data?.governanceImage).length > 0 
    ? getImageUrls(data?.governanceImage) 
    : ["/uploads/es3_5c99a4a259.jpeg"];

  const getHeaderImages = (): string[] => {
    const bgData = data?.headerImage;
    if (!bgData) return ["/uploads/banner_3_bc41aaa230.jpg"];
    let images: string[] = [];
    if (bgData.data) {
      const items = Array.isArray(bgData.data) ? bgData.data : [bgData.data];
      images = items.map((item: any) => formatImageUrl(item?.attributes?.url || item?.url)).filter(Boolean);
    } else {
      const items = Array.isArray(bgData) ? bgData : [bgData];
      images = items.map((item: any) => formatImageUrl(item?.url)).filter(Boolean);
    }
    return images.length > 0 ? images : ["/uploads/banner_3_bc41aaa230.jpg"];
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
          { name: t('esg') }
        ]} 
      />

      {/* Main Sections (Environmental, Social, Governance) */}
      <div className="max-w-6xl mx-auto px-4 py-20 space-y-28">
        
        {/* Environmental (E) */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="text-[#1b8c4c] font-bold text-xs uppercase tracking-wider bg-green-50 px-3 py-1 rounded">
              E - Environmental
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-seppa-blue leading-tight">
              {isZh ? "環境保護與綠色永續" : "Environmental Sustainability"}
            </h2>
            <div className="text-gray-600 leading-relaxed text-sm md:text-base prose max-w-none prose-p:leading-relaxed prose-li:my-1">
              <StrapiRichText content={environmentalText} />
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute top-6 -left-6 w-full h-full bg-[#ebf9f0] rounded-3xl -z-10"></div>
            <div className="rounded-3xl overflow-hidden shadow-lg h-[350px] lg:h-[400px] bg-white border border-gray-100 flex items-center justify-center">
              {envImgs.length > 0 ? (
                <ImageGallery urls={envImgs} alt="Environmental" />
              ) : (
                <div className="text-center p-8 space-y-4">
                  <div className="w-16 h-16 bg-[#ebf9f0] rounded-full flex items-center justify-center mx-auto text-[#1b8c4c]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-400 font-medium text-sm">{isZh ? "綠色能源與永續製造" : "Green Energy & Clean Tech"}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Social (S) */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="text-orange-500 font-bold text-xs uppercase tracking-wider bg-orange-50 px-3 py-1 rounded">
              S - Social
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-seppa-blue leading-tight">
              {isZh ? "社會責任與社區共好" : "Social Responsibility"}
            </h2>
            <div className="text-gray-600 leading-relaxed text-sm md:text-base prose max-w-none prose-p:leading-relaxed prose-li:my-1">
              <StrapiRichText content={socialText} />
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute top-6 -right-6 w-full h-full bg-[#fdf3eb] rounded-3xl -z-10"></div>
            <div className="rounded-3xl overflow-hidden shadow-lg h-[350px] lg:h-[400px] bg-white border border-gray-100 flex items-center justify-center">
              {socImgs.length > 0 ? (
                <ImageGallery urls={socImgs} alt="Social" />
              ) : (
                <div className="text-center p-8 space-y-4">
                  <div className="w-16 h-16 bg-[#fdf3eb] rounded-full flex items-center justify-center mx-auto text-orange-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-400 font-medium text-sm">{isZh ? "人才培育與在地發展" : "Talent Growth & Community CSR"}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Governance (G) */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="text-[#0d3b66] font-bold text-xs uppercase tracking-wider bg-blue-50 px-3 py-1 rounded">
              G - Governance
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-seppa-blue leading-tight">
              {isZh ? "誠信公司治理與合規" : "Corporate Governance"}
            </h2>
            <div className="text-gray-600 leading-relaxed text-sm md:text-base prose max-w-none prose-p:leading-relaxed prose-li:my-1">
              <StrapiRichText content={governanceText} />
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute top-6 -left-6 w-full h-full bg-blue-50 rounded-3xl -z-10"></div>
            <div className="rounded-3xl overflow-hidden shadow-lg h-[350px] lg:h-[400px] bg-white border border-gray-100 flex items-center justify-center">
              {govImgs.length > 0 ? (
                <ImageGallery urls={govImgs} alt="Governance" />
              ) : (
                <div className="text-center p-8 space-y-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-[#0d3b66]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-400 font-medium text-sm">{isZh ? "法規合規與誠信道德" : "Transparency & Legal Compliance"}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Association Responsible Commitment (R-E-S-P-O-N-S-I-B-L-E) */}
        <div className="pt-20 border-t border-gray-200">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-seppa-blue">
              {isZh ? "商業責任與合作承諾" : "Association Responsible Commitment"}
            </h2>
            <p className="text-gray-500">
              {isZh 
                ? "我們在印台雙邊經貿與文化交流中，始終秉持以下核心責任與準則：" 
                : "Our core principles guiding sustainable growth and ethical partnerships:"}
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm max-w-4xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {responsibleItems.map((item: any, idx: number) => {
                const textStr = item.text || "";
                
                // Spelling layout spelling out "RESPONSIBLE" based on index
                const responsibleWord = "RESPONSIBLE";
                const letter = responsibleWord[idx] || "";
                let desc = textStr;
                
                // Clean up prefixes if they already exist in the textStr, e.g., "R - Respect..." or "R-Respect..."
                const prefixPattern = new RegExp(`^${letter}\\s*-\\s*`, 'i');
                if (prefixPattern.test(textStr)) {
                  desc = textStr.replace(prefixPattern, '');
                }

                return (
                  <div key={idx} className="flex gap-4 items-start p-3 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                      {letter}
                    </div>
                    <div className="pt-1">
                      <p className="text-gray-700 font-medium text-[15px] leading-snug">
                        {desc || textStr}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
