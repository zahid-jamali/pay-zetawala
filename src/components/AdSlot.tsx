'use client';

import React from 'react';
import { siteConfig } from '@/config/site';

interface AdSlotProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

/**
 * AdSlot component.
 * When siteConfig.adProvider === 'none', renders strictly NOTHING (zero markup, zero scripts).
 */
export const AdSlot: React.FC<AdSlotProps> = () => {
  if (siteConfig.adProvider === 'none') {
    return null;
  }

  // Future provider integration would plug in here
  return null;
};
