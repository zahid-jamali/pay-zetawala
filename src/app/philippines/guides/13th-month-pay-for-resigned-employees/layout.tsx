import { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = getPageMetadata('ph-guide-13th-resigned');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
