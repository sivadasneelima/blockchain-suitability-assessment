# Blockchain Suitability Assessment Framework

A structured decision-support tool that helps startups, enterprises, and policymakers determine whether blockchain is an appropriate architectural choice for their use case.

This application implements a flowchart-based evaluation model and generates an executive-ready PDF assessment report.

---

## 🚀 Overview

The Blockchain Suitability Assessment Framework provides:

- Progressive, structured evaluation
- Deterministic verdict generation
- Executive-style downloadable PDF report
- Support for:
  - Public Permissionless Blockchain
  - Private Permissioned Blockchain
  - Alternative Hybrid Models

The framework translates architectural decision logic into a clear, auditable recommendation.

---

## 🧠 Decision Logic

The assessment evaluates three primary dimensions:

1. **Data Considerations**
   - Shared data requirements
   - Traceability
   - Authentication
   - Ownership certification
   - Time-stamping
   - Tamper-evidence
   - Sensitive data constraints

2. **Stakeholder Considerations**
   - Participant distribution
   - Intermediary removal
   - Known vs unknown participants

3. **Cost Considerations**
   - Budget feasibility
   - Long-term cost orientation

Based on responses, the system produces one of the following canonical outcomes:

- **A Public Permissionless Ledger can be an optimum choice here**
- **A Private Permissioned Ledger can be an optimum choice here**
- **Look for Alternative Models**

---

## 📄 PDF Report

The downloadable PDF includes:

- Executive Summary
- Final Verdict
- Structured Rationale (aligned with selected blockchain type)
- User Responses
- Timestamped generation

The PDF is designed to be executive-ready and suitable for internal review or advisory presentation.

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Material UI (MUI)**
- **pdf-lib** (server-side PDF generation)
- **Vercel** (deployment)

---

## 🏗 Project Structure




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


