"use client";

import React from 'react';
import HomeHero from '@/components/home/HomeHero';
import HomeStats from '@/components/home/HomeStats';
import FeatureGrid from '@/components/ui/FeatureGrid';
import Timeline from '@/components/ui/Timeline';
import TeamGrid from '@/components/ui/TeamGrid';

// Default fallback component for unknown blocks
const UnknownBlock = ({ componentName }: { componentName: string }) => (
  <div className="p-8 border-2 border-red-500 border-dashed text-red-500 my-4 text-center">
    <strong>Unknown Component:</strong> {componentName}
  </div>
);

// Map Strapi __component keys to React components
const componentMap: Record<string, React.FC<any>> = {
  'sections.hero': HomeHero,
  'sections.statistics': HomeStats,
  'sections.feature-grid': FeatureGrid,
  'sections.timeline': Timeline,
  'sections.team-grid': TeamGrid,
};

interface DynamicZoneRendererProps {
  blocks: any[];
}

export default function DynamicZoneRenderer({ blocks }: DynamicZoneRendererProps) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        const Component = componentMap[block.__component];
        if (!Component) {
          return <UnknownBlock key={index} componentName={block.__component} />;
        }
        return <Component key={`${block.__component}-${index}`} data={block} />;
      })}
    </>
  );
}
