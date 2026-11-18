'use client';

import React, { useState } from 'react';
import { Share2, Check, MessageCircle } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  text,
  url,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: `${text}\nCalculated at: ${shareUrl}`,
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled or unsupported
      }
    }

    // Fallback: Copy link to clipboard
    try {
      await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Nothing
    }
  };

  const handleWhatsApp = () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const waText = encodeURIComponent(`${text}\n${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${waText}`, '_blank');
  };

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 rounded border border-neutral-300 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus-visible:outline-brand"
        title="Share calculation"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-brand-strong" />
            <span className="text-brand-strong font-semibold">Link Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="h-3.5 w-3.5 text-neutral-500" />
            <span>Share</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handleWhatsApp}
        className="inline-flex items-center gap-1 rounded border border-neutral-300 bg-white px-2 py-1 text-xs font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 hover:text-emerald-700 focus-visible:outline-brand"
        title="Share via WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
      </button>
    </div>
  );
};
