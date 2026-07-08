import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import CultureView from './CultureView';
import { fetchAPI } from '@/lib/api';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const seoData = await fetchAPI('/culture', { locale, populate: '*' });
  const seo = seoData?.data?.attributes || seoData?.data;
  
  return {
    title: seo?.seoMeta?.metaTitle ? `Culture - ${seo.seoMeta.metaTitle}` : "Cultural Exchange - CEAI",
    description: seo?.seoMeta?.metaDescription || "CEAI",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const fetched = await fetchAPI('/culture', { locale, populate: '*' });
  const data = fetched?.data;

  return (
    <>
      <CultureView data={data} />
    </>
  );
}


export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}
