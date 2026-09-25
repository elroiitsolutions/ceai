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
    <div className="fixed top-0 inset-x-0 w-full h-[68px] lg:h-[82px] bg-white border-b border-gray-100 px-4 lg:px-8 z-[60] flex items-center justify-between shadow-sm transition-all duration-300">
      <div className="flex items-center gap-3 lg:gap-4 max-w-[1700px] mx-auto w-full">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <img src="/fceacfinal.png" alt={globalData?.siteName || "FCEAC Logo"} className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-full object-cover" />
        </Link>
        
        {/* Texts */}
        <div className="flex flex-col justify-center">
          <h1 className="text-seppa-blue font-bold text-sm md:text-base lg:text-lg leading-tight md:leading-tight">
            {isZh ? 'FCEAC 印度台灣文化交流協會' : 'FCEAC - Formosa Culture & Exchange Association Chennai'}
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
