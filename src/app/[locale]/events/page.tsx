import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import EventsView from './EventsView';
import { fetchAPI } from '@/lib/api';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const seoData = await fetchAPI('/seo', { locale, populate: '*' });
  const seo = seoData?.data?.attributes || seoData?.data;
  
  return {
    title: seo?.metaTitle ? `Events - ${seo.metaTitle}` : "Event Sharing - CEAI",
    description: seo?.metaDescription || "CEAI",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const fetched = await fetchAPI('/event', { locale, populate: '*' });
  const data = fetched?.data;

  return (
    <>
      <EventsView data={data} />
    </>
  );
}


export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}
