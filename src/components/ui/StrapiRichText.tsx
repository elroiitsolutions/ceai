import React from 'react';
import ReactMarkdown from 'react-markdown';

interface StrapiRichTextProps {
  content: string;
  className?: string;
}

const getTextFromNode = (node: React.ReactNode): string => {
  if (!node) return '';
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getTextFromNode).join('');
  }
  if (React.isValidElement(node)) {
    return getTextFromNode((node as React.ReactElement<any>).props.children);
  }
  return '';
};

const isStageList = (items: any[]) => {
  if (items.length === 0) return false;
  return items.every((item: any) => {
    if (!item || !item.props) return false;
    const textContent = getTextFromNode(item.props.children);
    return /^(Stage\s+\d+)/i.test(textContent.trim());
  });
};

const renderStageList = (items: any[]) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 mt-6 w-full">
      {items.map((item: any, idx) => {
        const textContent = getTextFromNode(item.props.children);
        // Match: Stage X, then optional colon/punctuation, title, then optional separator (- or full-width －), and optional subtitle
        const match = textContent.trim().match(/^(Stage\s+\d+)[:：]?\s*([^-－]+)(?:[-－]\s*(.+))?$/i);
        
        if (!match) {
          return (
            <div key={idx} className="bg-white border border-gray-100 p-4 rounded-xl shadow-xs text-center flex flex-col justify-center min-h-[110px]">
              {item.props.children}
            </div>
          );
        }
        
        const stageLabel = match[1];
        const title = match[2].trim();
        const subtitle = match[3] ? match[3].trim() : '';

        return (
          <div 
            key={idx} 
            className="bg-white border border-gray-100 hover:border-orange-200 p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 text-center flex flex-col justify-center min-h-[110px]"
          >
            <div className="text-orange-500 font-bold text-xs md:text-sm tracking-wider uppercase mb-1">
              {stageLabel}
            </div>
            <div className="text-seppa-blue font-bold text-sm md:text-base mb-1">
              {title}
            </div>
            {subtitle && (
              <div className="text-gray-400 text-[11px] md:text-xs leading-tight mt-0.5">
                {subtitle}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function StrapiRichText({ content, className = '' }: StrapiRichTextProps) {
  if (!content) return null;

  return (
    <div className={`max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => <h1 className="text-2xl md:text-3xl font-bold font-heading text-seppa-blue mt-6 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl md:text-2xl font-bold font-heading text-seppa-blue mt-5 mb-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg md:text-xl font-bold font-heading text-seppa-blue mt-4 mb-3" {...props} />,
          h4: ({ node, ...props }) => <h4 className="text-xs md:text-sm font-bold text-seppa-blue uppercase tracking-wider mt-4 first:mt-0 mb-2.5" {...props} />,
          p: ({ node, ...props }) => <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 last:mb-0" {...props} />,
          ul: ({ node, children, ...props }) => {
            const items = React.Children.toArray(children).filter(
              (child: any) => child && typeof child !== 'string' && child.props
            );
            
            if (items.length > 0 && isStageList(items)) {
              return renderStageList(items);
            }
            
            return <ul className="list-disc pl-5 my-4 space-y-2" {...props}>{children}</ul>;
          },
          ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-4 space-y-2" {...props} />,
          li: ({ node, ...props }) => <li className="text-gray-600 text-sm md:text-base marker:text-seppa-blue/70" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-bold text-seppa-blue" {...props} />,
          em: ({ node, ...props }) => <em className="italic text-gray-700" {...props} />,
          a: ({ node, ...props }) => <a className="text-orange-500 hover:text-seppa-red underline transition-colors" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
