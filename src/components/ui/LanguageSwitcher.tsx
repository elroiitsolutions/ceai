"use client";
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import React, { useTransition } from 'react';
import { HiLanguage } from 'react-icons/hi2';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'zh' : 'en';
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button 
      onClick={toggleLocale} 
      disabled={isPending}
      className="flex items-center gap-2 px-3 py-1 text-sm font-medium transition-colors hover:text-blue-600 focus:outline-none"
    >
      <HiLanguage className="text-xl" />
      <span>{locale === 'en' ? 'EN' : '中文'}</span>
    </button>
  );
}
