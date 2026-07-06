"use client";
import React, { useState, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import * as LuIcons from 'react-icons/lu';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

interface StrapiIconProps {
  name?: string | null;
  className?: string;
}

export default function StrapiIcon({ name, className = "w-6 h-6" }: StrapiIconProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder matching initial layout during hydration/SSR
    return <div className={className} />;
  }

  if (!name) return null;

  const trimmed = name.trim();

  // 1. If it looks like raw SVG code, render it safely.
  if (trimmed.startsWith('<svg') || trimmed.includes('<path') || trimmed.startsWith('<')) {
    // If it's a broken SVG, try to make sure it closes, or render as-is inside a wrapping block
    return (
      <div 
        className={`${className} flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain`}
        dangerouslySetInnerHTML={{ __html: trimmed }}
      />
    );
  }

  // 2. Otherwise, treat as an Icon name. Convert name to PascalCase.
  // E.g., "credit-card" -> "CreditCard", "briefcase" -> "Briefcase"
  const formattedName = trimmed
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

  // Prefix checks for specific libraries or direct lookups
  // Lucide Icons (Lu)
  const LuComponent = (LuIcons as any)[`Lu${formattedName}`] || (LuIcons as any)[formattedName];
  if (LuComponent) {
    return <LuComponent className={className} />;
  }

  // Feather Icons (Fi)
  const FiComponent = (FiIcons as any)[`Fi${formattedName}`] || (FiIcons as any)[formattedName];
  if (FiComponent) {
    return <FiComponent className={className} />;
  }

  // Material Design Icons (Md)
  const MdComponent = (MdIcons as any)[`Md${formattedName}`] || (MdIcons as any)[formattedName];
  if (MdComponent) {
    return <MdComponent className={className} />;
  }

  // FontAwesome Icons (Fa)
  const FaComponent = (FaIcons as any)[`Fa${formattedName}`] || (FaIcons as any)[formattedName];
  if (FaComponent) {
    return <FaComponent className={className} />;
  }

  // Fallback to a default/generic icon if name doesn't match
  const FallbackIcon = FiIcons.FiHelpCircle;
  return <FallbackIcon className={className} />;
}
