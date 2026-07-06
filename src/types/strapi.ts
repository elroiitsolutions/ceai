export interface StrapiMediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
  mime: string;
}

export interface StrapiButton {
  id: number;
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  isExternal: boolean;
  icon: string | null;
}

export interface StrapiSocialLink {
  id: number;
  platform: 'facebook' | 'instagram' | 'youtube' | 'twitter' | 'linkedin' | 'line' | 'wechat';
  url: string;
  label: string | null;
}

export interface StrapiNavItem {
  id: number;
  label: string;
  href: string;
  order: number;
  isExternal: boolean;
  children?: StrapiNavItem[];
}

export interface StrapiFooterLink {
  id: number;
  label: string;
  href: string;
  isExternal: boolean;
}

export interface StrapiGlobalData {
  siteName: string;
  siteTagline: string | null;
  headerLogo: StrapiMedia | null;
  footerLogo: StrapiMedia | null;
  favicon: StrapiMedia | null;
  maintenanceMode: boolean;
  defaultOGImage: StrapiMedia | null;
}

export interface StrapiNavigationData {
  ctaLabel: string | null;
  ctaHref: string | null;
  items: StrapiNavItem[];
}

export interface StrapiFooterData {
  headline: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  newsletterTitle: string | null;
  column1Title: string | null;
  column1Links: StrapiFooterLink[];
  column2Title: string | null;
  column2Links: StrapiFooterLink[];
  phone: string | null;
  email: string | null;
  address: string | null;
  socialLinks: StrapiSocialLink[];
  copyright: string | null;
}
