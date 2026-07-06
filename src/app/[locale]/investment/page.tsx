import React from 'react';
import InvestmentView from './InvestmentView';
import { fetchAPI } from '@/lib/api';
import { getLocale } from 'next-intl/server';

export async function generateMetadata() {
  const locale = await getLocale();
  const seoData = await fetchAPI('/investment', { locale, populate: '*' });
  const seo = seoData?.data?.attributes || seoData?.data;
  
  return {
    title: seo?.seoMeta?.metaTitle ? `Investment - ${seo.seoMeta.metaTitle}` : "Investment Info - CEAI",
    description: seo?.seoMeta?.metaDescription || "CEAI",
  };
}

export default async function Page() {
  const locale = await getLocale();
  const fetched = await fetchAPI('/investment', { locale, populate: '*' });
  const data = fetched?.data;

  return (
    <>
      <InvestmentView data={data} />
    </>
  );
}
