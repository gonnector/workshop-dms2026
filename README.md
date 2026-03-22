[English](README.md) | [한국어](README_ko.md)

# E-commerce Behavior Data Analysis Workshop

**DMS 2026 Workshop** — STP Analysis with Microsoft Clarity + Claude Code

## Overview

This repository contains all assets for the DMS 2026 (Digital Marketing Summit) workshop on customer behavior data analysis for e-commerce:

1. **KOMMA** — A sample e-commerce website with Microsoft Clarity integration
2. **Web Slides** — Presentation slides for the workshop
3. **Practice Data** — Pre-exported Clarity data for hands-on analysis

## Workshop Description

Participants will analyze simulated customer behavior data from a sample e-commerce site using Microsoft Clarity and Claude Code to perform STP (Segmentation, Targeting, Positioning) analysis and derive actionable marketing insights.

## Tech Stack

- **Site**: Next.js 14 (App Router) + Tailwind CSS
- **Analytics**: Microsoft Clarity
- **AI Agent**: Claude Code
- **Collaboration**: FigJam
- **Deployment**: Vercel

## Getting Started

```bash
# Clone the repository
git clone https://github.com/gonnector/ecommerce-behavior-data-analysis.git
cd ecommerce-behavior-data-analysis

# Install dependencies
npm install

# Run development server
npm run dev
```

## Traffic Simulation

Generate realistic behavioral data by simulating 5 customer personas with Playwright:

```bash
cd scripts
npm install
npx playwright install chromium
npm run simulate          # 100 sessions, headless
npm run simulate:debug    # 5 sessions, headed (for testing)
```

See [scripts/README.md](scripts/README.md) for detailed configuration and persona descriptions.

## Workshop Materials

- [Design Document](DESIGN.md)
- [Export Data](export-data/) — Pre-exported Clarity CSV files for analysis

## License

[MIT](LICENSE) — Copyright (c) 2026 Gonnector (고영혁)
