import { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = getPageMetadata('ph-tax-table');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
