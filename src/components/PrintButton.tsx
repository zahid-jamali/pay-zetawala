'use client';

import React from 'react';
import { Printer } from 'lucide-react';

interface PrintButtonProps {
  label?: string;
  className?: string;
}

export const PrintButton: React.FC<PrintButtonProps> = ({
  label = 'Print',
  className = '',
}) => {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className={`inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 shadow-2xs hover:text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50 focus-visible:outline-brand print:hidden transition-colors ${className}`}
      title="Print or Save as PDF"
    >
      <Printer className="h-3.5 w-3.5 text-neutral-500" />
      <span>{label}</span>
    </button>
  );
};
