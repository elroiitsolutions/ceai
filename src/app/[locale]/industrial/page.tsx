import React from 'react';
import IndustrialView from './IndustrialView';
import { fetchAPI } from '@/lib/api';
import { getLocale } from 'next-intl/server';

export async function generateMetadata() {
  const locale = await getLocale();
  const seoData = await fetchAPI('/industrial-page', { locale, populate: '*' });
  
  const attributes = seoData?.data?.attributes;
  return {
    title: attributes?.seoMeta?.metaTitle || attributes?.title || "Industrial Zones - CEAI",
    description: attributes?.seoMeta?.metaDescription || attributes?.subtitle || "In-depth analysis of key industrial parks.",
  };
}

export default async function Page() {
  const locale = await getLocale();
  
  const pageFetched = await fetchAPI('/industrial-page', { locale, populate: '*' });
  const pageData = pageFetched?.data?.attributes || {};

  const fetched = await fetchAPI('/industrials', { 
    locale, 
    populate: {
      coverImage: { populate: '*' },
      keyAdvantages: { populate: '*' },
      exclusiveIncentives: { populate: '*' }
    }
  });
  const data = fetched?.data || [];

  return (
    <>
      <IndustrialView data={data} pageData={pageData} />
    </>
  );
}
