import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import AboutView from './AboutView';
import { fetchAPI } from '@/lib/api';

export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const seoData = await fetchAPI('/seo', { locale, populate: '*' });
  
  return {
    title: seoData?.data?.attributes?.metaTitle || "Our Mission - CEAI",
    description: seoData?.data?.attributes?.metaDescription || "CEAI",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const aboutData = await fetchAPI('/mission', { locale, populate: 'deep' });

  return (
    <>
      <AboutView data={aboutData?.data || aboutData?.data?.attributes} />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}
