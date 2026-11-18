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
}

export const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  hint,
  error,
}) => {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full">
      <label htmlFor={selectId} className="block text-sm font-semibold text-neutral-800 mb-1">
        {label}
      </label>

      <select
        id={selectId}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="block w-full rounded-md border border-neutral-300 bg-white py-2.5 px-3 text-base text-neutral-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand sm:text-sm"
        aria-describedby={hint ? `${selectId}-hint` : undefined}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {hint && !error && (
        <p id={`${selectId}-hint`} className="mt-1.5 text-xs text-neutral-500">
          {hint}
        </p>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-danger font-medium">
          {error}
        </p>
      )}
    </div>
  );
};
