import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import EsgView from './EsgView';
import { fetchAPI } from '@/lib/api';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const seoData = await fetchAPI('/seo', { locale, populate: '*' });
  const seo = seoData?.data?.attributes || seoData?.data;
  
  return {
    title: seo?.metaTitle ? `ESG - ${seo.metaTitle}` : "ESG (Environmental, Social, Governance) - CEAI",
    description: seo?.metaDescription || "CEAI ESG Page",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  let data = null;
  try {
    const fetched = await fetchAPI('/esg', { locale, populate: '*' });
    data = fetched?.data;
  } catch (error) {
    console.error("Error fetching ESG page from CMS, using defaults:", error);
  }

  return (
    <>
      <EsgView data={data} locale={locale} />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}
