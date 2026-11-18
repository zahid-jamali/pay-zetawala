'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyResultButtonProps {
  textToCopy: string;
  label?: string;
  className?: string;
}

export const CopyResultButton: React.FC<CopyResultButtonProps> = ({
  textToCopy,
  label = 'Copy',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 shadow-2xs hover:text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50 focus-visible:outline-brand transition-colors ${className}`}
      title="Copy calculation summary"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-brand-strong" />
          <span className="text-brand-strong font-bold">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5 text-neutral-500" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
