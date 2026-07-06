import React from 'react';
import LaborView from './LaborView';
import { fetchAPI } from '@/lib/api';
import { getLocale } from 'next-intl/server';

export async function generateMetadata() {
  const locale = await getLocale();
  const seoData = await fetchAPI('/seo', { locale, populate: '*' });
  
  return {
    title: seoData?.data?.attributes?.metaTitle || "Labor Law - CEAI",
    description: seoData?.data?.attributes?.metaDescription || "CEAI",
  };
}

export default async function Page() {
  const locale = await getLocale();
  const fetched = await fetchAPI('/labor', { locale, populate: '*' });
  const data = fetched?.data;

  return (
    <>
      <LaborView data={data} />
    </>
  );
}
