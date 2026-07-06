"use client";

import DynamicZoneRenderer from '@/components/ui/DynamicZoneRenderer';
// Fallback imports in case Strapi is empty (Corrected for CEA)
import HomeHero from '@/components/home/HomeHero';
import WhatWeOffer from '@/components/home/WhatWeOffer';
import HomeStats from '@/components/home/HomeStats';
import ChennaiOffice from '@/components/home/ChennaiOffice';
// We will need a CTA component, maybe there is one like HomeCTA or similar?
// Let's check what exists. If not, we'll build it.

export default function HomeView({ data }: { data?: any }) {
  const contentBlocks = data?.contentBlocks || [];

  return (
    <>
      {contentBlocks.length > 0 ? (
        <DynamicZoneRenderer blocks={contentBlocks} />
      ) : (
        <>
          {/* Fallback layout if Strapi contentBlocks are empty (CEA specific) */}
          <HomeHero data={data} />
          <WhatWeOffer data={data} />
          <HomeStats data={data} />
          <ChennaiOffice data={data} />
          {/* Missing CTA Section, to be added */}
        </>
      )}
    </>
  );
}
