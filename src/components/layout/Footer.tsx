"use client";
import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { FiFacebook, FiInstagram, FiArrowUpRight } from 'react-icons/fi';
import { FaYoutube } from 'react-icons/fa';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import Image from 'next/image';

import bgPattern from '@/assets/bg/black-line-1.png';
import logoImg from '@/assets/LOGOFINAL.png';
import { StrapiGlobalData, StrapiFooterData } from '@/types/strapi';

interface FooterProps {
  globalData?: StrapiGlobalData | null;
  footerData?: StrapiFooterData | null;
}

const Footer: React.FC<FooterProps> = ({ globalData, footerData }) => {
  const t = useTranslations('Navigation');
  const tFooter = useTranslations('Footer');

  // const logoUrl = globalData?.footerLogo?.url || globalData?.headerLogo?.url || logoImg.src;
  const siteName = globalData?.siteName || "CEAI";
  
  const headline = footerData?.headline || "CEAI (Commercial Exchange Association of India) is dedicated to promoting bilateral trade, investment, cultural, and technological cooperation. We are your most trusted partner in expanding into India-Taiwan markets.";
  
  const column1Title = footerData?.column1Title || "QUICK LINKS";
  const column1Links = footerData?.column1Links || [
    { id: 1, label: t('ourMission'), href: '/mission', isExternal: false },
    { id: 2, label: t('governmentPolicy'), href: '/policy', isExternal: false },
    { id: 3, label: t('investmentInfo'), href: '/investment', isExternal: false },
    { id: 4, label: t('eventSharing'), href: '/events', isExternal: false }
  ];

  const column2Title = footerData?.column2Title || "CONTACT US";
  
  const phone = footerData?.phone || "+886-2-1234-5678";
  const email = footerData?.email || "info@ceai.org";
  const address = footerData?.address || "9F, No. 223, Zhonghua 1st Rd., Gushan Dist., Kaohsiung City 804, Taiwan";
  const copyright = footerData?.copyright || `© ${new Date().getFullYear()} CEAI - Commercial Exchange Association of India. All Rights Reserved.`;
  const socialLinks = footerData?.socialLinks || [];

  return (
    <footer className="bg-seppa-blue text-white pt-20 pb-8 mt-12 lg:mt-20 relative overflow-hidden m-3 rounded-2xl">
      <div className="absolute inset-0 pointer-events-none bg-no-repeat bg-center bg-cover opacity-15" style={{ backgroundImage: `url(${bgPattern.src})` }}></div>
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
          
          {/* Column 1: Logo and Description */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src={logoImg} 
                alt={`${siteName} Logo`} 
                className="h-14 w-auto transition-all duration-300 bg-white px-2 py-1 rounded object-contain" 
              />
            </Link>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-md">
              {headline}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-seppa-red font-bold uppercase tracking-wider mb-6 text-sm md:text-base">{column1Title}</h3>
            <ul className="space-y-4 text-gray-300 text-sm md:text-base font-light">
              {column1Links.map(link => (
                <li key={link.id}>
                  {link.isExternal ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-seppa-red transition-colors">{link.label}</a>
                  ) : (
                    <Link href={link.href} className="hover:text-seppa-red transition-colors">{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="md:col-span-4">
            <h3 className="text-seppa-red font-bold uppercase tracking-wider mb-6 text-sm md:text-base">{column2Title}</h3>
            <ul className="space-y-5 text-gray-300 text-sm md:text-base font-light">
              <li className="flex items-start gap-3">
                <div className="text-seppa-red mt-1 shrink-0">
                  <MdLocationOn size={20} />
                </div>
                <span className="leading-relaxed">{address}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="text-seppa-red mt-1 shrink-0">
                  <MdPhone size={20} />
                </div>
                <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="hover:text-seppa-red transition-colors">{`${tFooter('tel')}: ${phone}`}</a>
              </li>
              <li className="flex items-start gap-3">
                <div className="text-seppa-red mt-1 shrink-0">
                  <MdEmail size={20} />
                </div>
                <a href={`mailto:${email}`} className="hover:text-seppa-red transition-colors">{`${tFooter('email')}: ${email}`}</a>
              </li>
            </ul>
          </div>
          
        </div>
         
        {/* Copyright Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 font-light text-xs md:text-sm" dangerouslySetInnerHTML={{ __html: copyright }} />
          
          <div className="flex gap-4">
            {socialLinks.length > 0 ? (
              socialLinks.map((social) => {
                let Icon = FiArrowUpRight;
                if (social.platform === 'facebook') Icon = FiFacebook;
                if (social.platform === 'instagram') Icon = FiInstagram;
                if (social.platform === 'youtube') Icon = FaYoutube;
                return (
                  <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform} className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors text-lg">
                    <Icon />
                  </a>
                );
              })
            ) : (
               <>
                 <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition">
                   <FiFacebook />
                 </a>
                 <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition">
                   <FiInstagram />
                 </a>
                 <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition text-lg">
                   <FaYoutube />
                 </a>
               </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
