'use client';

import React from 'react';

interface NumberInputProps {
  id?: string;
  label: string;
  value: number;
  onChange: (val: number) => void;
  suffix?: string;
  hint?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  required?: boolean;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  id,
  label,
  value,
  onChange,
  suffix,
  hint,
  error,
  min = 0,
  max,
  step = 1,
  placeholder = '0',
  required = false,
}) => {
  const inputId = id || `number-input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      onChange(val);
    } else if (e.target.value === '') {
      onChange(0);
    }
  };

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="block text-sm font-semibold text-neutral-800 mb-1">
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </label>

      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="number"
          id={inputId}
          name={inputId}
          value={value === 0 ? '' : value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={`block w-full rounded-md border py-2.5 px-3.5 text-base font-medium text-neutral-900 tabular-nums placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand sm:text-sm ${
            suffix ? 'pr-12' : ''
          } ${
            error
              ? 'border-danger focus:ring-danger focus:border-danger'
              : 'border-neutral-300 hover:border-neutral-400'
          }`}
          aria-invalid={!!error}
          aria-describedby={hint ? `${inputId}-hint` : undefined}
        />
        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-neutral-500 text-xs font-medium">{suffix}</span>
          </div>
        )}
      </div>

      {hint && !error && (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-neutral-500">
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
