import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--color-brand)',
          hover: 'var(--color-brand-hover)',
          strong: 'var(--color-brand-strong)',
          soft: 'var(--color-brand-soft)',
          subtle: 'var(--color-brand-subtle)',
        },
        navy: {
          DEFAULT: 'var(--color-slate-navy)',
        },
        neutral: {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          950: 'var(--color-neutral-950)',
        },
        surface: {
          DEFAULT: 'var(--bg-surface)',
          raised: 'var(--bg-surface-raised)',
          muted: 'var(--bg-muted)',
          page: 'var(--bg-page)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
        },
        content: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)',
        },
        semantics: {
          success: {
            text: 'var(--color-success-text)',
            bg: 'var(--color-success-bg)',
            border: 'var(--color-success-border)',
          },
          warning: {
            text: 'var(--color-warning-text)',
            bg: 'var(--color-warning-bg)',
            border: 'var(--color-warning-border)',
          },
          danger: {
            text: 'var(--color-danger-text)',
            bg: 'var(--color-danger-bg)',
            border: 'var(--color-danger-border)',
          },
          info: {
            text: 'var(--color-info-text)',
            bg: 'var(--color-info-bg)',
            border: 'var(--color-info-border)',
          },
        },
      },
      maxWidth: {
        content: 'var(--max-content-width)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        'xs': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
