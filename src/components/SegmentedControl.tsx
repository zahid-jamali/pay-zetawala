'use client';

import React from 'react';

export interface SegmentOption<T extends string> {
  label: string;
  value: T;
  icon?: React.ReactNode;
}

interface SegmentedControlProps<T extends string> {
  label?: string;
  value: T;
  onChange: (val: T) => void;
  options: SegmentOption<T>[];
  className?: string;
}

export function SegmentedControl<T extends string>({
  label,
  value,
  onChange,
  options,
  className = '',
}: SegmentedControlProps<T>) {
  return (
    <div className={`w-full ${className}`}>
      {label && <span className="block text-sm font-semibold text-neutral-800 mb-1.5">{label}</span>}
      <div className="inline-flex w-full rounded-lg border border-neutral-200 bg-neutral-100 p-1">
        {options.map(opt => {
          const isSelected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-md transition-all ${
                isSelected
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
              aria-pressed={isSelected}
            >
              {opt.icon && <span>{opt.icon}</span>}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
