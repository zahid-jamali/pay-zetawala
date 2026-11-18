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
  isHighlighted?: (row: T) => boolean;
  searchPredicate?: (row: T, term: string) => boolean;
  searchPlaceholder?: string;
}

export function BracketTable<T>({
  title,
  subtitle,
  columns,
  data,
  highlightRowPredicate,
  isHighlighted: isHighlightedProp,
  searchPredicate,
  searchPlaceholder = 'Search amount or salary...',
}: BracketTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const activeHighlightPredicate = highlightRowPredicate || isHighlightedProp;

  const filteredData = searchPredicate && searchTerm.trim() !== ''
    ? data.filter(item => searchPredicate(item, searchTerm.toLowerCase().trim()))
    : data;

  return (
    <div className="w-full my-8 rounded-xl border border-neutral-200 bg-white shadow-xs overflow-hidden">
      <div className="p-5 border-b border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-neutral-900">{title}</h3>
          {subtitle && <p className="text-xs text-neutral-600 mt-0.5 font-medium">{subtitle}</p>}
        </div>

        {searchPredicate && (
          <div className="relative w-full sm:w-64">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-neutral-500" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={searchPlaceholder}
              className="block w-full rounded-md border border-neutral-300 bg-white py-1.5 pl-9 pr-3 text-xs font-semibold text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-xs transition-colors"
            />
          </div>
        )}
      </div>

      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="sticky top-0 bg-neutral-100 text-neutral-900 font-bold border-b-2 border-neutral-300 text-xs uppercase tracking-wider z-10">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`py-3 px-3.5 whitespace-nowrap text-neutral-900 font-bold ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  } ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-neutral-600 font-medium">
                  No matching brackets found.
                </td>
              </tr>
            ) : (
              filteredData.map((row, rowIdx) => {
                const isHighlighted = activeHighlightPredicate ? activeHighlightPredicate(row) : false;
                return (
                  <tr
                    key={rowIdx}
                    className={`transition-colors border-b border-neutral-200 ${
                      isHighlighted
                        ? 'bg-brand-soft text-neutral-950 font-semibold border-brand-subtle'
                        : 'text-neutral-800 hover:bg-neutral-50/80'
                    }`}
                  >
                    {columns.map((col, colIdx) => (
                      <td
                        key={colIdx}
                        className={`py-2.5 px-3.5 whitespace-nowrap tabular-nums ${
                          isHighlighted ? 'text-neutral-950 font-semibold' : 'text-neutral-800'
                        } ${
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
