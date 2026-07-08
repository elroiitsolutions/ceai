import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import LaborView from './LaborView';
import { fetchAPI } from '@/lib/api';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const seoData = await fetchAPI('/seo', { locale, populate: '*' });
  
  return {
    title: seoData?.data?.attributes?.metaTitle || "Labor Law - CEAI",
    description: seoData?.data?.attributes?.metaDescription || "CEAI",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const fetched = await fetchAPI('/labor', { locale, populate: '*' });
  const data = fetched?.data;

  return (
    <>
      <LaborView data={data} />
    </>
  );
}


export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}
