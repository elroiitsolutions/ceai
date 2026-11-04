import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import HydrogenBusView from './HydrogenBusView';

export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isZh = locale === 'zh';
  return {
    title: isZh 
      ? "氫谷動能 - 氫能燃料電池公車 | FCIEAC"
      : "Hydrogen Valley Power - Green Mobility Bus | FCIEAC",
    description: isZh
      ? "氫谷動能股份有限公司 - 零碳城市的氫能綠色出行，點擊下載簡報手冊"
      : "Hydrogen Valley Power Co., Ltd. - Green Mobility for Zero-Carbon Cities. Click image to download brochure.",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HydrogenBusView />;
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

