import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import PolicyView from './PolicyView';
import { fetchAPI } from '@/lib/api';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const seoData = await fetchAPI('/seo', { locale, populate: '*' });
  const seo = seoData?.data?.attributes || seoData?.data;
  
  return {
    title: seo?.metaTitle ? `Policy - ${seo.metaTitle}` : "Government Policy - FCIEA",
    description: seo?.metaDescription || "FCIEA",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const [policyFetched, cityPagesFetched] = await Promise.all([
    fetchAPI('/policy', { locale, populate: '*' }),
    fetchAPI('/city-pages', { locale, populate: '*' })
  ]);
  
  const data = policyFetched?.data;
  const cityPages = cityPagesFetched?.data || [];

  return (
    <>
      <PolicyView data={data} cityPages={cityPages} />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}
