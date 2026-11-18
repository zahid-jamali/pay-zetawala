'use client';

import React, { useState, useEffect } from 'react';

interface MoneyInputProps {
  id?: string;
  label: string;
  value: number;
  onChange: (val: number) => void;
  currencySymbol: string;
  hint?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  required?: boolean;
}

export const MoneyInput: React.FC<MoneyInputProps> = ({
  id,
  label,
  value,
  onChange,
  currencySymbol,
  hint,
  error,
  min = 0,
  max,
  step = 1,
  placeholder = '0.00',
  required = false,
}) => {
  const [displayValue, setDisplayValue] = useState<string>(
    value ? value.toLocaleString('en-US', { maximumFractionDigits: 2 }) : ''
  );
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(value ? value.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '');
    }
  }, [value, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    setDisplayValue(value ? String(value) : '');
  };

  const handleBlur = () => {
    setIsFocused(false);
    let numeric = parseFloat(displayValue.replace(/,/g, ''));
    if (isNaN(numeric) || numeric < min) {
      numeric = min;
    }
    if (max !== undefined && numeric > max) {
      numeric = max;
    }
    onChange(numeric);
    setDisplayValue(numeric ? numeric.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDisplayValue(raw);
    const cleaned = parseFloat(raw.replace(/,/g, ''));
    if (!isNaN(cleaned)) {
      onChange(cleaned);
    } else if (raw === '') {
      onChange(0);
    }
  };

  const inputId = id || `money-input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="block text-sm font-semibold text-neutral-800 mb-1">
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </label>

      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-neutral-500 font-semibold text-sm">{currencySymbol}</span>
        </div>

        <input
          type="text"
          inputMode="decimal"
          id={inputId}
          name={inputId}
          value={displayValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={placeholder}
          className={`block w-full rounded-md border py-2.5 pl-12 pr-4 text-base font-medium text-neutral-900 tabular-nums placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand sm:text-sm ${
            error
              ? 'border-danger focus:ring-danger focus:border-danger'
              : 'border-neutral-300 hover:border-neutral-400'
          }`}
          aria-invalid={!!error}
          aria-describedby={hint ? `${inputId}-hint` : undefined}
        />
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
