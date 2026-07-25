import React from 'react';
import { StrapiMedia } from '@/types/strapi';

interface StrapiImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  media: StrapiMedia | null | undefined;
  fallback?: string;
}

export default function StrapiImage({ media, fallback, className, alt, ...props }: StrapiImageProps) {
  if (!media?.url && !fallback) {
    return null;
  }

  let imageUrl = media?.url || fallback;

  if (!imageUrl) return null;

  // Format relative Strapi media URLs to absolute URLs
  if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://13.234.18.254:1337';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    imageUrl = `${cleanBase}${cleanPath}`;
  }

  return (
    <img
      src={imageUrl}
      alt={alt || media?.alternativeText || "CEAI Image"}
      className={className}
      width={media?.width || props.width}
      height={media?.height || props.height}
      {...props}
    />
  );
}
