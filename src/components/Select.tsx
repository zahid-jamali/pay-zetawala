'use client';

import React from 'react';

export interface SelectOption {
  label: string;
  value: string;
  description?: string;
}

interface SelectProps {
  id?: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: SelectOption[];
  hint?: string;
  error?: string;
  required?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  hint,
  error,
  required = false,
}) => {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full">
      <label htmlFor={selectId} className="block text-sm font-bold text-neutral-900 mb-1.5">
        {label}
        {required && <span className="text-red-600 ml-1 font-bold">*</span>}
      </label>

      <div className="relative mt-1">
        <select
          id={selectId}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`block w-full rounded-md border py-2.5 px-3 text-base font-semibold shadow-xs focus:outline-none focus:ring-2 sm:text-sm transition-colors ${
            error
              ? 'border-red-500 text-red-700 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20'
              : 'border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400 focus:border-brand focus:ring-brand/20'
          }`}
          aria-invalid={!!error}
          aria-describedby={hint ? `${selectId}-hint` : undefined}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value} className="text-neutral-900 font-medium">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {hint && !error && (
        <p id={`${selectId}-hint`} className="mt-1.5 text-xs text-neutral-600 font-medium">
          {hint}
        </p>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-red-700 font-semibold">
          {error}
        </p>
      )}
    </div>
  );
};
