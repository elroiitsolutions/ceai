import React from 'react';
import { motion, Variants } from 'framer-motion';
import StrapiIcon from '@/components/ui/StrapiIcon';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

interface Props {
  data?: any;
}

const HomeStats: React.FC<Props> = ({ data }) => {
  const stats = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      value: "USD 8.2 B+",
      label: "BILATERAL TRADE"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      ),
      value: "15%+",
      label: "ANNUAL GROWTH"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      value: "250+",
      label: "TAIWANESE FIRMS"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      value: "8+",
      label: "COOPERATIVE ZONES"
    }
  ];

  const statsToRender = data?.stats?.length > 0 ? data.stats : stats;

  return (
    <section className="py-16 bg-white relative z-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Optional Title/Badge */}
        {(data?.title || data?.badge) && (
          <div className="text-center mb-12">
            {data?.badge && (
              <span className="inline-block py-1 px-3 rounded-full bg-seppa-red/10 text-seppa-red text-sm font-bold tracking-wider uppercase mb-4">
                {data.badge}
              </span>
            )}
            {data?.title && (
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-seppa-blue">
                {data.title}
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsToRender.map((stat: any, idx: number) => (
            <div key={idx} className="bg-[#F8F9FA] rounded-2xl p-8 flex flex-col items-start transition-transform hover:-translate-y-1 shadow-sm hover:shadow-md">
              <div className="bg-white p-3 rounded-lg shadow-sm mb-6 text-gold">
                {/* Check if stat has icon from Strapi, otherwise use fallback icon array */}
                {stat.icon ? (
                  <StrapiIcon name={stat.icon} className="h-8 w-8" />
                ) : (
                  stats[idx % stats.length]?.icon
                )}
              </div>
              <h3 className="text-3xl font-heading font-bold text-seppa-blue mb-2">
                {stat.prefix}{stat.value}{stat.suffix}
              </h3>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
