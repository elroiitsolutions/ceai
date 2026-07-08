import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import HomeView from './HomeView';
import { fetchAPI } from '@/lib/api';

export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const seoData = await fetchAPI('/seo', { locale, populate: '*' });
  const seo = seoData?.data?.attributes || seoData?.data;

  return {
    title: seo?.metaTitle || "CEAI - Commercial Exchange Association of India",
    description: seo?.metaDescription || "Connecting India and Taiwan",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const homeData = await fetchAPI('/home', { locale, populate: 'deep' });

  // Strapi v5 returns data directly on `data`, v4 nests under `data.attributes`
  const data = homeData?.data?.attributes || homeData?.data;

  return (
    <>
      <HomeView data={data} />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}
