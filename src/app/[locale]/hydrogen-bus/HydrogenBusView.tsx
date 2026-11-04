"use client";

import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { useLocale } from 'next-intl';

export default function HydrogenBusView() {
  const locale = useLocale();
  const isZh = locale === 'zh';

  return (
    <div className="w-full pt-[116px] lg:pt-[138px] p-0 m-0 overflow-x-hidden bg-white">
      {/* 100% Full Width Edge-to-Edge Image Presentation (No side background, no borders, no padding) */}
      <a
        href="/pdf/HYDROGEN VALLEY POWER_202608-ED.pdf"
        download="HYDROGEN VALLEY POWER_202608-ED.pdf"
        className="group relative block w-full m-0 p-0 cursor-pointer select-none"
        title={isZh ? '點擊下載完整簡報 (PDF)' : 'Click to download full brochure (PDF)'}
      >
        <img
          src="/images/hydrogen-valley-bus.jpg"
          alt="Hydrogen Valley Power Co., Ltd. - Green Mobility for Zero-Carbon Cities"
          className="w-full h-auto block select-none m-0 p-0"
        />

        {/* Floating Download Badge in the Corner */}
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 pointer-events-none z-10">
          <div className="bg-emerald-600/95 group-hover:bg-emerald-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full flex items-center gap-2.5 shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-105">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-emerald-600 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
              <FiDownload />
            </span>
            <span className="text-xs sm:text-sm font-bold">
              {isZh ? '點擊下載手冊 (PDF)' : 'Click to download brochure (PDF)'}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
