"use client";
import React from 'react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { StrapiGlobalData } from '@/types/strapi';

interface TopBarProps {
  globalData?: StrapiGlobalData | null;
}

const TopBar: React.FC<TopBarProps> = ({ globalData }) => {
  const locale = useLocale();
  const isZh = locale === 'zh';
  const logoUrl = globalData?.headerLogo?.url || null;

  return (
    <div className="fixed top-0 inset-x-0 w-full h-[64px] lg:h-[76px] bg-white border-b border-gray-100 px-4 lg:px-8 z-[60] flex items-center justify-between shadow-sm transition-all duration-300">
      <div className="flex items-center gap-3 lg:gap-4 max-w-[1700px] mx-auto w-full">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img src="/LOGOFINAL.png" alt={globalData?.siteName || "CEAI Logo"} className="h-10 lg:h-12 w-auto object-contain" />
        </Link>
        
        {/* Texts */}
        <div className="flex flex-col justify-center">
          <h1 className="text-seppa-blue font-bold text-sm md:text-base lg:text-lg leading-tight md:leading-tight">
            {isZh ? 'CEAI 印度台灣商務交流協會' : 'CEAI - Commercial Exchange Association of India'}
          </h1>
          <p className="text-orange-500 font-medium text-[10px] md:text-xs lg:text-sm leading-tight md:leading-tight mt-0.5">
            {isZh ? 'COMMERCIAL EXCHANGE ASSOCIATION OF INDIA | 印度商业交换协会' : 'The Official Business Bridge Promoting Trade and Cultural Exchange'}
          </p>
        </div>

        {/* Language Switcher */}
        <div className="ml-auto flex-shrink-0 hidden md:block">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
