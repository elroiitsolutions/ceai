import React from 'react';
import { Link } from '@/i18n/routing';

interface Props {
  data?: any;
}

const ChennaiOffice: React.FC<Props> = ({ data }) => {
  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="mb-12">
          <h4 className="text-[#E36C2F] font-bold tracking-wider text-sm mb-2">主要辦事處</h4>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#003B73] mb-6">Chennai Office - CEA Indonesia Hub</h2>
          <p className="text-gray-500 max-w-4xl text-lg leading-relaxed">
            As CEA's primary office in South India, the Chennai office is dedicated to promoting business cooperation,
            investment consulting, and cultural exchange between Taiwan and India. We provide comprehensive market entry
            support and business expansion services for Indonesian enterprises.
          </p>
        </div>
        
        {/* Placeholder for the cards that are barely visible at the bottom of the screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="h-40 rounded-2xl border border-gray-200 bg-white"></div>
           <div className="h-40 rounded-2xl border border-gray-200 bg-white"></div>
           <div className="h-40 rounded-2xl border border-gray-200 bg-white"></div>
        </div>
      </div>
    </section>
  );
};

export default ChennaiOffice;
