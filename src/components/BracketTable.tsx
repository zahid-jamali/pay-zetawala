'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

export interface ColumnDef<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
  className?: string;
}

interface BracketTableProps<T> {
  title: string;
  subtitle?: string;
  columns: ColumnDef<T>[];
  data: T[];
  highlightRowPredicate?: (row: T) => boolean;
  searchPredicate?: (row: T, term: string) => boolean;
  searchPlaceholder?: string;
}

export function BracketTable<T>({
  title,
  subtitle,
  columns,
  data,
  highlightRowPredicate,
  searchPredicate,
  searchPlaceholder = 'Search amount or salary...',
}: BracketTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = searchPredicate && searchTerm.trim() !== ''
    ? data.filter(item => searchPredicate(item, searchTerm.toLowerCase().trim()))
    : data;

  return (
    <div className="w-full my-8 rounded-xl border border-neutral-200 bg-white shadow-2xs overflow-hidden">
      <div className="p-5 border-b border-neutral-200 bg-neutral-50/75 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-neutral-900">{title}</h3>
          {subtitle && <p className="text-xs text-neutral-600 mt-0.5">{subtitle}</p>}
        </div>

        {searchPredicate && (
          <div className="relative w-full sm:w-64">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-neutral-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={searchPlaceholder}
              className="block w-full rounded-md border border-neutral-300 py-1.5 pl-9 pr-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
            />
          </div>
        )}
      </div>

      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="sticky top-0 bg-neutral-100 text-neutral-700 font-semibold border-b border-neutral-200 z-10">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`py-2.5 px-3.5 whitespace-nowrap ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  } ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-neutral-500">
                  No matching brackets found.
                </td>
              </tr>
            ) : (
              filteredData.map((row, rowIdx) => {
                const isHighlighted = highlightRowPredicate ? highlightRowPredicate(row) : false;
                return (
                  <tr
                    key={rowIdx}
                    className={`transition-colors hover:bg-neutral-50 ${
                      isHighlighted ? 'bg-brand-soft/60 font-semibold text-brand-strong' : ''
                    }`}
                  >
                    {columns.map((col, colIdx) => (
                      <td
                        key={colIdx}
                        className={`py-2.5 px-3.5 whitespace-nowrap tabular-nums ${
                          col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                        } ${col.className || ''}`}
                      >
                        {col.accessor(row)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
