import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from "next";
import "../globals.css";
import MainLayout from "../../layouts/MainLayout";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { fetchAPI } from '@/lib/api';

export const metadata: Metadata = {
  title: "FCIEAC - Formosa Cultural & Information Exchange Association Chennai",
  description: "FCIEAC",
  icons: {
    icon: "/fcieac.png",
    shortcut: "/fcieac.png",
    apple: "/fcieac.png",
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  // Fetch global CMS data
  const [globalRes, navRes, footerRes] = await Promise.all([
    fetchAPI('/global', { locale, populate: '*' }),
    fetchAPI('/navigation', { locale, populate: 'deep' }),
    fetchAPI('/footer', { locale, populate: 'deep' })
  ]);

  const globalData = globalRes?.data?.attributes || null;
  const navigationData = navRes?.data?.attributes || null;
  const footerData = footerRes?.data?.attributes || null;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/fcieac.png?v=3" type="image/png" />
        <link rel="shortcut icon" href="/fcieac.png?v=3" type="image/png" />
        <link rel="apple-touch-icon" href="/fcieac.png?v=3" />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <MainLayout 
            globalData={globalData} 
            navigationData={navigationData} 
            footerData={footerData}
          >
            {children}
          </MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
