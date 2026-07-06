import React from 'react';
import { StrapiMedia } from '@/types/strapi';
import { getStrapiURL } from '@/lib/strapi-url';

interface StrapiImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  media: StrapiMedia | null | undefined;
  fallback?: string;
}

export default function StrapiImage({ media, fallback, className, alt, ...props }: StrapiImageProps) {
  if (!media?.url && !fallback) {
    return null;
  }

  const imageUrl = media?.url 
    ? (media.url.startsWith('http') ? media.url : getStrapiURL(media.url))
    : fallback;

  if (!imageUrl) return null;

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
