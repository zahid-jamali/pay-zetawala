import React from 'react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface WebApplicationSchemaProps {
  name: string;
  url: string;
  description: string;
  applicationCategory: 'FinanceApplication' | 'EducationalApplication';
  operatingSystem?: string;
}

export interface DatasetSchemaProps {
  name: string;
  description: string;
  url: string;
  temporalCoverage: string;
  keywords?: string[];
}

export interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}

interface StructuredDataProps {
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FaqItem[];
  webApp?: WebApplicationSchemaProps;
  dataset?: DatasetSchemaProps;
  article?: ArticleSchemaProps;
}

export const StructuredData: React.FC<StructuredDataProps> = ({
  breadcrumbs,
  faqs,
  webApp,
  dataset,
  article,
}) => {
  const schemas: Record<string, unknown>[] = [];

  // Breadcrumbs Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: crumb.url.startsWith('http') ? crumb.url : `https://pay.zetawala.com${crumb.url}`,
      })),
    });
  }

  // WebApplication Schema
  if (webApp) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: webApp.name,
      url: webApp.url.startsWith('http') ? webApp.url : `https://pay.zetawala.com${webApp.url}`,
      description: webApp.description,
      applicationCategory: webApp.applicationCategory,
      operatingSystem: webApp.operatingSystem || 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      isAccessibleForFree: true,
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      provider: {
        '@type': 'Organization',
        name: 'Pay',
        url: 'https://pay.zetawala.com',
        parentOrganization: {
          '@type': 'Organization',
          name: 'Zetawala',
          url: 'https://zetawala.com',
        },
      },
    });
  }

  // FAQPage Schema
  if (faqs && faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer.replace(/<[^>]*>?/gm, ''), // strip html tags for clean plain text schema
        },
      })),
    });
  }

  // Dataset Schema
  if (dataset) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: dataset.name,
      description: dataset.description,
      url: dataset.url.startsWith('http') ? dataset.url : `https://pay.zetawala.com${dataset.url}`,
      temporalCoverage: dataset.temporalCoverage,
      keywords: dataset.keywords || ['rates', 'fees', 'official table'],
      isAccessibleForFree: true,
      creator: {
        '@type': 'Organization',
        name: 'Pay',
        url: 'https://pay.zetawala.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Pay',
        url: 'https://pay.zetawala.com',
        parentOrganization: {
          '@type': 'Organization',
          name: 'Zetawala',
          url: 'https://zetawala.com',
        },
      },
    });
  }

  // Article Schema
  if (article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.headline,
      description: article.description,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': article.url.startsWith('http') ? article.url : `https://pay.zetawala.com${article.url}`,
      },
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      author: {
        '@type': 'Organization',
        name: 'Pay Editorial Team',
        url: 'https://pay.zetawala.com/about/',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Pay',
        url: 'https://pay.zetawala.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://pay.zetawala.com/images/pay-logo.png',
        },
        parentOrganization: {
          '@type': 'Organization',
          name: 'Zetawala',
          url: 'https://zetawala.com',
        },
      },
    });
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};
