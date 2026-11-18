export interface SiteConfig {
  brandName: string;
  brandTagline: string;
  domain: string;
  siteUrl: string;
  adProvider: 'none' | 'adsense';
  adSensePublisherId?: string;
  parentNetwork: {
    name: string;
    url: string;
    footerText: string;
  };
  supportedCountries: {
    code: 'ph' | 'ke' | 'ug' | 'ng';
    name: string;
    flag: string;
    currency: string;
    currencySymbol: string;
    path: string;
  }[];
}

export const siteConfig: SiteConfig = {
  brandName: 'Pay',
  brandTagline: 'Free, verified salary deductions, mobile-money fees, and grade calculators',
  domain: 'pay.zetawala.com',
  siteUrl: 'https://pay.zetawala.com',
  adProvider: 'none', // Strict requirement: default off, no ads.txt, no external scripts
  parentNetwork: {
    name: 'Zetawala',
    url: 'https://zetawala.com',
    footerText: 'Pay is a Zetawala project',
  },
  supportedCountries: [
    {
      code: 'ph',
      name: 'Philippines',
      flag: '🇵🇭',
      currency: 'PHP',
      currencySymbol: '₱',
      path: '/philippines/',
    },
    {
      code: 'ke',
      name: 'Kenya',
      flag: '🇰🇪',
      currency: 'KES',
      currencySymbol: 'KES',
      path: '/kenya/',
    },
    {
      code: 'ug',
      name: 'Uganda',
      flag: '🇺🇬',
      currency: 'UGX',
      currencySymbol: 'UGX',
      path: '/uganda/',
    },
    {
      code: 'ng',
      name: 'Nigeria',
      flag: '🇳🇬',
      currency: 'NGN',
      currencySymbol: '₦',
      path: '/nigeria/',
    },
  ],
};
