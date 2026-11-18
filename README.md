# Pay — Free & Accurate Calculators (pay.zetawala.com)

**Pay** (`https://pay.zetawala.com`) is a fast, calm, and trustworthy financial and academic calculation utility built for four target markets: the **Philippines (PH)**, **Kenya (KE)**, **Uganda (UG)**, and **Nigeria (NG)**.

Pay is developed and maintained by the **Zetawala** network ([zetawala.com](https://zetawala.com)).

---

## 1. Product & Architecture Overview

- **100% Client-Side Computational Privacy:** All calculations execute purely in JavaScript inside the user's browser. No salary numbers, transaction amounts, loan figures, or academic grades are ever sent over the network, stored on servers, or tracked in analytics databases.
- **Pure Static Export:** Built on Next.js App Router with `output: 'export'`, `trailingSlash: true`, and `images: { unoptimized: true }`. Deploys as pure static HTML/CSS/JS without any Node.js runtime server, database, or API routes.
- **Zero Hard-Coded Numbers in Components:** All statutory contribution brackets, excise duties, tax brackets, and tariff tables are decoupled into typed rule configuration files (`src/rules/`). Components and calculation engines consume these values dynamically.
- **Strict SEO & E-E-A-T Architecture:**
  - 19 interactive calculation tools & searchable reference tables
  - 18 in-depth statutory guides (900–1,600 words each with TOC, worked examples, and official citations)
  - 4 country hubs with live rate summaries
  - 5 comprehensive FAQ centers (120+ Q&As with `FAQPage` JSON-LD schema)
  - Complete trust architecture: Methodology, About, Contact, Privacy, Terms, Disclaimer, HTML Sitemap, and XML Sitemap.

---

## 2. Verified Statutory Regulations (2026 In Force)

Every value used by the platform is verified against primary government circulars, statutory gazettes, and published corporate schedules:

### 🇵🇭 Philippines
- **SSS (Republic Act 11199):** Official 15.0% contribution rate (5.0% employee / 10.0% employer) under SSS Circular No. 2024-006. Minimum Monthly Salary Credit (MSC) ₱5,000, regular MSC ceiling ₱20,000, and total MSC ceiling ₱35,000 (including mandatory WISP for MSC above ₱20,000). EC employer contribution ₱10–₱30.
- **PhilHealth (RA 11223):** 5.0% statutory premium rate split equally (2.5% employee / 2.5% employer) under Universal Health Care Advisory 2024-0013. Monthly income floor ₱10,000 (min premium ₱500) and ceiling ₱100,000 (max premium ₱5,000).
- **Pag-IBIG Fund (HDMF):** Maximum Monthly Fund Salary (MFS) ₱10,000 under Circular No. 460. Mandatory employee deduction capped at ₱200/month, matched by ₱200/month employer share.
- **BIR Withholding Tax (TRAIN Law - RA 10963):** Revised graduated monthly tax schedule. Monthly taxable income up to ₱20,833 is 0% tax-exempt. 13th-month bonus tax exemption ceiling ₱90,000.
- **SSS Salary Loan:** 10% per annum diminishing balance interest over a 24-month amortization term, with a 1% advance service fee.
- **SSS Retirement Pension:** Evaluates the highest of three statutory formulas, credited years of service (CYS), plus the mandatory ₱1,000 across-the-board benefit and annual 13th-month pension.

### 🇰🇪 Kenya
- **Safaricom M-PESA:** Official customer tariffs inclusive of the statutory 15% excise duty mandated by the Finance Act. Free transfers for KSh 1–100 to registered users; maximum transfer fee KSh 108.
- **Agent & ATM Cashout:** Full withdrawal matrix from KSh 50 to KSh 250,000.
- **Fuliza Overdraft:** 1% access fee, zero-rated daily fee grace period for KSh 101–1,000 through Day 3, and banded daily maintenance charges from KSh 0 to KSh 25.00/day.
- **M-Shwari Loan:** Fixed 7.5% loan facilitation fee for a 30-day term under NCBA Bank tariff schedule.
- **Central Bank of Kenya (CBK):** Daily transaction limit KSh 500,000, per-transaction cap KSh 250,000, and wallet balance limit KSh 500,000.

### 🇺🇬 Uganda
- **URA Mobile Money Tax:** 0.5% statutory excise duty applied exclusively to cash withdrawals under the Excise Duty (Amendment) Act. Peer-to-peer sending and merchant payments remain 100% tax-exempt.
- **Telecom Tariffs:** Published MTN Uganda MoMo and Airtel Money tariffs for on-network, cross-network, and agent cashouts.
- **Bank of Uganda:** Maximum single transaction limit UGX 5,000,000 and Tier 3 wallet balance limit UGX 20,000,000.

### 🇳🇬 Nigeria
- **NUC University 5.0 System:** CCMAS / BMAS standards: First Class (4.50–5.00), Second Class Upper / 2:1 (3.50–4.49), Second Class Lower / 2:2 (2.40–3.49), Third Class (1.50–2.39).
- **NBTE Polytechnic 4.0 System:** Standard National Board for Technical Education curriculum for ND and HND programmes: Distinction (3.50–4.00), Upper Credit (3.00–3.49), Lower Credit (2.50–2.99), Pass (2.00–2.49).

---

## 3. Directory Structure

```text
├── out/                    # Static export output (generated on build)
├── public/                 # Static assets, favicon, logo, and OG images
│   ├── images/pay-logo.png # Brand logo
│   ├── og/*.png            # 58 pre-generated OpenGraph 1200x630 cards
│   └── a3f89b1c*.txt       # IndexNow verification key
├── scripts/
│   ├── make-og.ts          # Generates 1200x630 branded OG cards using Sharp
│   ├── check-site.mjs      # Automated QA & SEO audit crawler for out/
│   └── indexnow.mjs        # Batch submits all 60+ URLs to IndexNow (Bing/Yandex)
├── src/
│   ├── app/                # Next.js App Router routes
│   │   ├── layout.tsx      # Root layout (WebSite + Organization schema)
│   │   ├── page.tsx        # Homepage
│   │   ├── not-found.tsx   # Custom 404 handler
│   │   ├── sitemap.ts      # Dynamic XML sitemap
│   │   ├── robots.ts       # Robots.txt handler
│   │   ├── methodology/    # Regulatory verification standards
│   │   ├── about/          # Mission and team
│   │   ├── contact/        # Error reporting desk
│   │   ├── privacy/        # Zero-data privacy policy
│   │   ├── terms/          # Terms of use
│   │   ├── disclaimer/     # Legal, payroll & academic disclaimer
│   │   ├── sitemap/        # Complete HTML sitemap directory
│   │   ├── philippines/    # PH tools, guides, hub & FAQ center
│   │   ├── kenya/          # KE tools, guides, hub & FAQ center
│   │   ├── uganda/         # UG tools, guides, hub & FAQ center
│   │   └── nigeria/        # NG tools, guides, hub & FAQ center
│   ├── components/         # Reusable UI & SEO widgets
│   ├── config/             # Page metadata registry (57 routes) & site constants
│   ├── lib/                # Pure TypeScript calculation logic
│   └── rules/              # Verified statutory rules, brackets & citations
└── tests/                  # Vitest test vector suites
```

---

## 4. Development & Build Commands

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run Vitest statutory test vectors
npm test

# Run ESLint validation
npm run lint

# Build full static production export (outputs to out/)
npm run build

# Run automated site-wide QA & SEO audit
node scripts/check-site.mjs

# Batch submit static URLs to IndexNow
node scripts/indexnow.mjs
```

---

## 5. Deployment Guide

### Deploying to Vercel
1. Push the repository to GitHub.
2. In the Vercel dashboard, click **Add New Project** and select the repository.
3. Framework Preset: **Next.js**.
4. Build Command: `next build` (Next.js automatically detects `output: 'export'` and deploys the `out/` folder).
5. Output Directory: `out` (or default).
6. Click **Deploy**.

> **Important Monetization Note:**  
> If you plan to monetize the site with display ads (e.g., Google AdSense, NitroPay, Mediavine), please note that **Vercel's Terms of Service for the Free Hobby tier prohibit commercial monetization/advertising**. To display ads legally, either upgrade to **Vercel Pro** or deploy the static export directly to **Cloudflare Pages**, which allows commercial ad monetization on its free tier without code changes.

### Deploying to Cloudflare Pages
Because Pay generates a completely self-contained static directory (`out/`), it is 100% portable:
1. Connect your GitHub repository in the **Cloudflare Dashboard > Workers & Pages**.
2. Framework Preset: **None / Next.js (Static HTML Export)**.
3. Build command: `npm run build`
4. Build output directory: `out`
5. Root directory: `/`
6. Click **Save and Deploy**.

---

## 6. Rate Maintenance & Update Workflow

When a government agency or telecom operator issues an updated circular:

1. **Verify the Primary Source:** Open the official government gazette, agency circular PDF, or telecom tariff release.
2. **Update Rule Configuration:** Edit the corresponding file in `src/rules/{ph,ke,ug,ng}/`.
3. **Update Test Vectors:** If statutory test vectors change, update `tests/{ph,ke,ug,ng}.test.ts`.
4. **Run Verification:** Run `npm test` and `npm run build`. All calculator tools, worked numerical examples, and editorial rate summaries will synchronize automatically.
5. **Audit & Deploy:** Run `node scripts/check-site.mjs` to ensure zero broken links or missing tags, then deploy.
6. **Submit to IndexNow:** Run `node scripts/indexnow.mjs` to notify search engines of the updated pages immediately.

---

## License & Attribution

Copyright © 2026 Pay. All rights reserved.  
Pay is an independent digital utility project by **Zetawala** ([zetawala.com](https://zetawala.com)).
