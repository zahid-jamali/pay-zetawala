'use client';

import React from 'react';

interface NumberInputProps {
  id?: string;
  label?: string;
  value: number;
  onChange: (val: number) => void;
  suffix?: string;
  prefix?: string;
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
  prefix,
  hint,
  error,
  min = 0,
  max,
  step = 1,
  placeholder = '0',
  required = false,
}) => {
  const inputId = id || (label ? `number-input-${label.toLowerCase().replace(/\s+/g, '-')}` : `number-input-${Math.random().toString(36).substring(2, 7)}`);

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
      {label && (
        <label htmlFor={inputId} className="block text-sm font-bold text-neutral-900 mb-1.5">
          {label}
          {required && <span className="text-red-600 ml-1 font-bold">*</span>}
        </label>
      )}

      <div className="relative mt-1 rounded-md shadow-xs">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <span className="text-neutral-600 font-semibold text-sm">{prefix}</span>
          </div>
        )}

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
          className={`block w-full rounded-md border py-2.5 px-3.5 text-base font-semibold tabular-nums placeholder:text-neutral-400 focus:outline-none focus:ring-2 sm:text-sm transition-colors shadow-xs ${
            prefix ? 'pl-12' : ''
          } ${
            suffix ? 'pr-12' : ''
          } ${
            error
              ? 'border-red-500 text-red-700 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20'
              : 'border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400 focus:border-brand focus:ring-brand/20'
          }`}
          aria-invalid={!!error}
          aria-describedby={hint ? `${inputId}-hint` : undefined}
        />

        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
            <span className="text-neutral-600 text-xs font-semibold">{suffix}</span>
          </div>
        )}
      </div>

      {hint && !error && (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-neutral-600 font-medium">
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
