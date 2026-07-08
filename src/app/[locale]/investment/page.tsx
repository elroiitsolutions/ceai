import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import InvestmentView from './InvestmentView';
import { fetchAPI } from '@/lib/api';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const seoData = await fetchAPI('/investment', { locale, populate: '*' });
  const seo = seoData?.data?.attributes || seoData?.data;
  
  return {
    title: seo?.seoMeta?.metaTitle ? `Investment - ${seo.seoMeta.metaTitle}` : "Investment Info - CEAI",
    description: seo?.seoMeta?.metaDescription || "CEAI",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const fetched = await fetchAPI('/investment', { locale, populate: '*' });
  const data = fetched?.data;

  return (
    <>
      <InvestmentView data={data} />
    </>
  );
}


export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}
