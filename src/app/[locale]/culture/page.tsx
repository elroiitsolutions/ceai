import React from 'react';
import CultureView from './CultureView';
import { fetchAPI } from '@/lib/api';
import { getLocale } from 'next-intl/server';

export async function generateMetadata() {
  const locale = await getLocale();
  const seoData = await fetchAPI('/culture', { locale, populate: '*' });
  const seo = seoData?.data?.attributes || seoData?.data;
  
  return {
    title: seo?.seoMeta?.metaTitle ? `Culture - ${seo.seoMeta.metaTitle}` : "Cultural Exchange - CEAI",
    description: seo?.seoMeta?.metaDescription || "CEAI",
  };
}

export default async function Page() {
  const locale = await getLocale();
  const fetched = await fetchAPI('/culture', { locale, populate: '*' });
  const data = fetched?.data;

  return (
    <>
      <CultureView data={data} />
    </>
  );
}
