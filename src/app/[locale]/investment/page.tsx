import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import InvestmentView from './InvestmentView';
import { fetchAPI } from '@/lib/api';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const seoData = await fetchAPI('/investment', { 
    locale, 
    populate: ['seoMeta'] 
  });
  const seo = seoData?.data?.attributes || seoData?.data;
  
  return {
    title: seo?.seoMeta?.metaTitle ? `Investment - ${seo.seoMeta.metaTitle}` : "Investment Info - CEAI",
    description: seo?.seoMeta?.metaDescription || "CEAI",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const fetched = await fetchAPI('/investment', { 
    locale, 
    populate: [
      'seoMeta',
      'policies',
      'contentBlocks',
      'contentBlocks.primaryButton',
      'contentBlocks.secondaryButton',
      'contentBlocks.cards',
      'contentBlocks.cards.image',
      'contentBlocks.stats',
      'contentBlocks.items',
      'contentBlocks.items.image',
      'contentBlocks.members',
      'contentBlocks.members.photo',
      'contentBlocks.image',
      'contentBlocks.background',
      'contentBlocks.backgroundImage',
      'contentBlocks.backgroundVideo'
    ] 
  });
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
