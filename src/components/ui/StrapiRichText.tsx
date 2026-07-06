import React from 'react';
import ReactMarkdown from 'react-markdown';

interface StrapiRichTextProps {
  content: string;
  className?: string;
}

export default function StrapiRichText({ content, className = '' }: StrapiRichTextProps) {
  if (!content) return null;

  return (
    <div className={`prose max-w-none ${className}`}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
