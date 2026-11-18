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
      className={`inline-flex items-center gap-1.5 rounded border border-neutral-300 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus-visible:outline-brand ${className}`}
      title="Copy calculation summary"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-brand-strong" />
          <span className="text-brand-strong font-semibold">Copied!</span>
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
