"use client";
import React, { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import { StrapiGlobalData, StrapiNavigationData, StrapiFooterData } from '@/types/strapi';

interface MainLayoutProps {
  children: ReactNode;
  globalData?: StrapiGlobalData | null;
  navigationData?: StrapiNavigationData | null;
  footerData?: StrapiFooterData | null;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, globalData, navigationData, footerData }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-[100vw] overflow-x-hidden" style={{ minHeight: '100dvh' }}>
      <div className="flex flex-col flex-grow">
        <Header globalData={globalData} navigationData={navigationData} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer globalData={globalData} footerData={footerData} />
      </div>
    </div>
  );
};

export default MainLayout;
