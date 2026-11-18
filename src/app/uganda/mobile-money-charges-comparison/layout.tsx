import { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = getPageMetadata('ug-comparison');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
