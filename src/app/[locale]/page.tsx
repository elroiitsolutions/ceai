import React from 'react';
import HomeView from './HomeView';
import { fetchAPI } from '@/lib/api';
import { getLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const locale = await getLocale();
  const seoData = await fetchAPI('/seo', { locale, populate: '*' });
  const seo = seoData?.data?.attributes || seoData?.data;

  return {
    title: seo?.metaTitle || "CEAI - Commercial Exchange Association of India",
    description: seo?.metaDescription || "Connecting India and Taiwan",
  };
}

export default async function Page() {
  const locale = await getLocale();
  const homeData = await fetchAPI('/home', { locale, populate: 'deep' });

  // Strapi v5 returns data directly on `data`, v4 nests under `data.attributes`
  const data = homeData?.data?.attributes || homeData?.data;

  return (
    <>
      <HomeView data={data} />
    </>
  );
}
