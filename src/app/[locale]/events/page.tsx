import React from 'react';
import EventsView from './EventsView';
import { fetchAPI } from '@/lib/api';
import { getLocale } from 'next-intl/server';

export async function generateMetadata() {
  const locale = await getLocale();
  const seoData = await fetchAPI('/seo', { locale, populate: '*' });
  const seo = seoData?.data?.attributes || seoData?.data;
  
  return {
    title: seo?.metaTitle ? `Events - ${seo.metaTitle}` : "Event Sharing - CEAI",
    description: seo?.metaDescription || "CEAI",
  };
}

export default async function Page() {
  const locale = await getLocale();
  const fetched = await fetchAPI('/event', { locale, populate: '*' });
  const data = fetched?.data;

  return (
    <>
      <EventsView data={data} />
    </>
  );
}
