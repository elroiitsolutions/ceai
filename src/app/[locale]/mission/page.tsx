import React from 'react';
import AboutView from './AboutView';
import { fetchAPI } from '@/lib/api';
import { getLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const locale = await getLocale();
  const seoData = await fetchAPI('/seo', { locale, populate: '*' });
  
  return {
    title: seoData?.data?.attributes?.metaTitle || "Our Mission - CEAI",
    description: seoData?.data?.attributes?.metaDescription || "CEAI",
  };
}

export default async function Page() {
  const locale = await getLocale();
  const aboutData = await fetchAPI('/mission', { locale, populate: 'deep' });

  return (
    <>
      <AboutView data={aboutData?.data || aboutData?.data?.attributes} />
    </>
  );
}
