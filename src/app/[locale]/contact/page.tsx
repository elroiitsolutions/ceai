import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import ContactView from './ContactView';
import { fetchAPI } from '@/lib/api';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const seoData = await fetchAPI('/seo', { locale, populate: '*' });
  
  return {
    title: seoData?.data?.attributes?.metaTitle || "Contact - CEAI",
    description: seoData?.data?.attributes?.metaDescription || "CEAI",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const fetched = await fetchAPI('/contact', { locale, populate: '*' });
  const data = fetched?.data?.attributes;

  return (
    <>
      <ContactView data={data} />
    </>
  );
}


export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}
