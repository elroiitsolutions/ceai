"use client";
import React, { useState, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { StrapiGlobalData, StrapiNavigationData } from '@/types/strapi';
import logoImg from '@/assets/LOGOFINAL.png';

interface HeaderProps {
  globalData?: StrapiGlobalData | null;
  navigationData?: StrapiNavigationData | null;
}

const Header: React.FC<HeaderProps> = ({ globalData, navigationData }) => {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const isZh = locale === 'zh';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const defaultNavLinks = [
    { name: t('home'), href: '/' },
    { name: t('ourMission'), href: '/mission' },
    { name: t('laborLaw'), href: '/labor' },
    { name: t('governmentPolicy'), href: '/policy' },
    { name: t('industrialZones'), href: '/industrial' },
    { name: t('investmentInfo'), href: '/investment' },
    { name: t('eventSharing'), href: '/events' },
    { name: t('culturalExchange'), href: '/culture' },
  ];

  const navLinks = navigationData?.items?.length 
    ? navigationData.items.map(item => ({ 
        name: item.label, 
        href: item.href,
        children: item.children?.map(child => ({ name: child.label, href: child.href }))
      }))
    : defaultNavLinks.map(link => ({ ...link, children: undefined }));

  const ctaLabel = navigationData?.ctaLabel || t('contact');
  const ctaHref = navigationData?.ctaHref || '/contact';
  const siteName = globalData?.siteName || "CEA Logo";

  return (
    <>
      <div className={`fixed top-0 inset-x-0 w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        
        {/* TOP BAR (White Section) */}
        <div className="w-full bg-white border-b border-gray-100 px-4 lg:px-8 h-[64px] lg:h-[76px] flex items-center justify-between relative z-20">
          <div className="flex items-center gap-2 lg:gap-4 max-w-[1700px] mx-auto w-full">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image src={logoImg} alt={siteName} className="h-10 lg:h-12 w-auto object-contain" priority />
            </Link>
            
            {/* Texts */}
            <div className="flex flex-col justify-center flex-1 min-w-0 pr-2">
              <h1 className="text-seppa-blue font-bold text-[11px] sm:text-sm md:text-base lg:text-lg leading-tight truncate">
                {isZh ? 'CEAI 印度台灣商務交流協會' : 'CEAI - Commercial Exchange Association of India'}
              </h1>
              <p className="text-orange-500 font-medium text-[8px] sm:text-[10px] md:text-xs lg:text-sm leading-tight truncate mt-0.5 hidden sm:block">
                {isZh ? 'COMMERCIAL EXCHANGE ASSOCIATION OF INDIA | 印度商业交换协会' : 'The Official Business Bridge Promoting Trade and Cultural Exchange'}
              </p>
            </div>

            {/* Right Actions: Language Switcher & Hamburger */}
            <div className="flex items-center gap-3 lg:gap-4 shrink-0 ml-auto">
              <LanguageSwitcher />
              
              <button
                suppressHydrationWarning
                className="md:hidden text-2xl text-seppa-blue flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </div>

        {/* NAVIGATION BAR (Blue Section) - Hidden on Mobile */}
        <header className="hidden md:flex w-full bg-seppa-blue border-t border-white/10 px-4 lg:px-8 h-12 lg:h-14 relative z-10">
          <div className="w-full flex justify-between items-center max-w-[1700px] mx-auto h-full">
            <nav className="flex-1 flex justify-start items-center h-full">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return link.children && link.children.length > 0 ? (
                  <div key={link.href} className={`relative group h-full flex items-center px-2 lg:px-4 transition-colors ${isActive ? 'bg-[#1b8c4c]' : 'hover:bg-white/10'}`}>
                    <div className="cursor-pointer h-full flex items-center">
                      <Link href={link.href} className="font-medium text-xs lg:text-sm 2xl:text-base flex items-center gap-1 text-white h-full whitespace-nowrap">
                        {link.name} <FiChevronDown className="text-sm opacity-70 ml-0.5" />
                      </Link>
                    </div>
                    <div className="absolute top-full left-0 mt-0 w-56 bg-seppa-blue text-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col py-2 border-t border-[#1b8c4c]">
                      {link.children.map(child => (
                        <Link key={child.href} href={child.href} className="px-4 py-2 hover:bg-[#1b8c4c] transition-colors block w-full text-left text-[13px] lg:text-sm">
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link key={link.href} href={link.href} className={`font-medium text-xs lg:text-sm 2xl:text-base flex items-center h-full px-2 lg:px-4 transition-colors whitespace-nowrap ${isActive ? 'bg-[#1b8c4c] text-white' : 'text-white hover:bg-white/10'}`}>
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex justify-end items-center gap-2 md:gap-4 group cursor-pointer ml-auto pl-2 shrink-0">
              <Link
                href={ctaHref}
                className="px-4 lg:px-5 2xl:px-6 py-2 2xl:py-3 rounded-full font-bold transition duration-300 bg-seppa-blue text-white hover:bg-seppa-red tracking-wide text-[13px] lg:text-sm 2xl:text-base flex items-center justify-center whitespace-nowrap"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-seppa-blue z-40 pt-[80px] pb-8 px-6 overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
          <div className="flex flex-col space-y-4 text-lg pb-10">
            {navLinks.map((link) => (
              link.children && link.children.length > 0 ? (
                <details key={link.href} className="group border-b border-white/10 pb-2">
                  <summary className="flex justify-between items-center text-white font-medium font-heading cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)}>{link.name}</Link>
                    <FiChevronDown className="transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="flex flex-col space-y-3 mt-3 pl-4 text-base">
                    {link.children.map(child => (
                      <Link key={child.href} href={child.href} className="text-gray-300 hover:text-gold flex items-start gap-3 mt-1" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0 mt-2"></span>
                        <span>{child.name}</span>
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-white font-medium font-heading hover:text-[#cda262] transition border-b border-white/10 pb-2 block" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
            
            <div className="pt-6 mt-auto">
              <Link href={ctaHref} className="bg-seppa-red text-white px-6 py-4 rounded-full font-medium hover:bg-white hover:text-seppa-blue transition flex items-center justify-center gap-2 w-full text-center shadow-md" onClick={() => setIsMobileMenuOpen(false)}>
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
