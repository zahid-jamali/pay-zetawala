'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { Menu, X, ChevronDown, Check } from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  // Determine current active country from pathname
  const currentCountry = siteConfig.supportedCountries.find(c => pathname.startsWith(`/${c.name.toLowerCase()}/`));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 focus-visible:outline-brand focus-visible:outline-2 rounded">
          <Image
            src="/images/pay-logo.png"
            alt="Pay Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-neutral-900 leading-none">
              {siteConfig.brandName}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-1">
          {siteConfig.supportedCountries.map(country => {
            const isActive = pathname.startsWith(country.path);
            return (
              <Link
                key={country.code}
                href={country.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-brand-soft text-brand-strong font-semibold'
                    : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Header Right / Country Switcher Dropdown (Desktop) */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
              onBlur={() => setTimeout(() => setCountryDropdownOpen(false), 200)}
              className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus-visible:outline-brand"
              aria-expanded={countryDropdownOpen}
              aria-label="Select Country Hub"
            >
              <span>{currentCountry ? currentCountry.flag : '🌐'}</span>
              <span>{currentCountry ? currentCountry.name : 'Select Country'}</span>
              <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
            </button>

            {countryDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 rounded-md border border-neutral-200 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                {siteConfig.supportedCountries.map(c => {
                  const isSelected = currentCountry?.code === c.code;
                  return (
                    <Link
                      key={c.code}
                      href={c.path}
                      onClick={() => setCountryDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-medium text-neutral-800 hover:bg-neutral-100"
                    >
                      <div className="flex items-center gap-2">
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                      </div>
                      {isSelected && <Check className="h-3.5 w-3.5 text-brand" />}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-brand"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-neutral-200 bg-white px-4 pt-2 pb-6 md:hidden">
          <div className="space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Country Calculators
            </div>
            {siteConfig.supportedCountries.map(c => {
              const isActive = pathname.startsWith(c.path);
              return (
                <Link
                  key={c.code}
                  href={c.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-brand-soft text-brand-strong font-semibold'
                      : 'text-neutral-800 hover:bg-neutral-100'
                  }`}
                >
                  <span className="text-base">{c.flag}</span>
                  <span>{c.name} Calculators</span>
                </Link>
              );
            })}
            <div className="border-t border-neutral-200 my-2 pt-2">
              <Link
                href="/sitemap/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900"
              >
                All Calculators Directory
              </Link>
              <Link
                href="/about/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900"
              >
                About & Verified Sources
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
