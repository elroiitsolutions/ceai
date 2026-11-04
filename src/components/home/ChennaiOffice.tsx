import React from 'react';
import { Link } from '@/i18n/routing';
import { FiMapPin, FiUsers, FiAward } from 'react-icons/fi';

interface Props {
  data?: any;
}

const ChennaiOffice: React.FC<Props> = ({ data }) => {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header: 2-Column layout (Text Start + Image End) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 mb-16">
          {/* Start / Left Column: Heading & Paragraphs justified to the start */}
          <div className="w-full lg:w-7/12 text-left flex flex-col items-start">
            <span className="inline-block py-1.5 px-4 rounded-full bg-seppa-red/10 text-seppa-red text-xs sm:text-sm font-bold tracking-wider uppercase mb-4 shadow-sm">
              主要辦事處
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-seppa-blue mb-4 leading-tight">
              Chennai Office - FCIEAC Chennai Hub
            </h2>
            <div className="h-1.5 w-20 bg-seppa-red rounded-full mb-6"></div>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
              As FCIEAC's primary office in South India, the Chennai office is dedicated to promoting business cooperation,
              investment consulting, and cultural exchange between Taiwan and India. We provide comprehensive market entry
              support and business expansion services for Taiwanese and Indian enterprises.
            </p>
          </div>

          {/* End / Right Column: India-Taiwan Commercial Exchange Association Building */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <img
                src="/images/chennai-office-building.jpg"
                alt="India - Taiwan Commercial Exchange Association Chennai Hub"
                className="w-full h-72 sm:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-seppa-red/10 text-seppa-red flex items-center justify-center mb-6 text-xl">
              <FiMapPin />
            </div>
            <h3 className="text-xl font-bold text-seppa-blue font-heading mb-4">Strategic Location</h3>
            <p className="text-slate-600 leading-relaxed font-light text-sm md:text-base">
              Chennai is a major business hub in South India, close to key industrial zones and ports, facilitating import-export and logistics operations.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-seppa-red/10 text-seppa-red flex items-center justify-center mb-6 text-xl">
              <FiUsers />
            </div>
            <h3 className="text-xl font-bold text-seppa-blue font-heading mb-4">Professional Team</h3>
            <p className="text-slate-600 leading-relaxed font-light text-sm md:text-base">
              Our experienced business consultants and translation team provide comprehensive market consulting and business matching services.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-seppa-red/10 text-seppa-red flex items-center justify-center mb-6 text-xl">
              <FiAward />
            </div>
            <h3 className="text-xl font-bold text-seppa-blue font-heading mb-4">Rich Experience</h3>
            <p className="text-slate-600 leading-relaxed font-light text-sm md:text-base">
              Over the years, we have successfully helped hundreds of Taiwanese and Indian enterprises establish business partnerships and expand into new markets.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChennaiOffice;
