# Scala Design Studio Website

A complete, production-ready multi-page website for **Scala Design Studio** — presenting custom wood, steel, and glass staircase portfolios to architects, designers, and homeowners undertaking premium renovation projects.

---

## 📁 File Structure

```
staircase-studio/
├── assets/
│   ├── css/
│   │   ├── style.css        — Main styles, component layouts, design scales
│   │   ├── dark-mode.css    — Charcoal & bronze dark theme overrides
│   │   └── rtl.css          — Right-to-left layout support
│   ├── js/
│   │   └── main.js          — All JS: theme, RTL, nav, timelines, forms
│   └── images/              — Custom project rendering resources
├── pages/
│   ├── index.html           — Home Page (Custom portfolios & design philosophies)
│   ├── home2.html           — Home 2 (Alternate landing page with project timelines)
│   ├── about.html           — About Us (Our history, stats & team profiles)
│   ├── services.html        — Design & Fabrication Services (6 design portfolios)
│   ├── blog.html            — Design Insights (Renovation & load engineering guides)
│   ├── contact.html         — Get in Touch (Architect inquiry forms, directions & FAQs)
│   ├── login.html           — Partner Portal Login
│   ├── register.html        — Partner Portal Signup / Project Tracker Setup
│   ├── 404.html             — Custom 404 error page
│   └── coming-soon.html     — Builder dashboard coming soon
└── README.md
```

---

## 🎨 Design System

### Color Palette (Architectural Synergy)
| Variable | Value | Usage |
|----------|-------|-------|
| `--primary` | `#8e7d5a` | Warm brushed bronze / highlight elements |
| `--primary-dark` | `#6c5e42` | Darker bronze hover states |
| `--primary-light` | `#ae9e7c` | Warm neutral light bronze gradients |
| `--secondary` | `#181818` | Powder-coated steel charcoal black backgrounds |
| `--accent` | `#ae9e7c` | Stat highlights & gold accents |
| `--accent-2` | `#8e7d5a` | Secondary warm neutral accent |

### Typography (Precise Variable Weights)
- **Display / Headings**: Outfit (Google Fonts variable font)
- **Body / UI**: Inter (Google Fonts variable font)
- **Spec Details**:
  - **H1 (Page Title)**: `font-weight: 580` (never 600+) | `4.5rem to 6rem`
  - **H2 (Section Heading)**: `font-weight: 540` (never 600+) | `3rem to 4.5rem`
  - **H3 (Card Heading)**: `font-weight: 520` (never 600+) | `2rem to 3rem`
  - **Paragraph / Body**: `font-weight: 410` | `0.9rem to 1.2rem`
  - **Nav Link / Labels**: `font-weight: 470` | `0.9rem to 1.2rem`

### Breakpoints
| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | ≤ 767px | Hamburger menu, single-column flow |
| Tablet | 768px | 2-column grids for cards and features |
| Desktop | 1024px | Full horizontal nav, sidebar layouts |
| Large | 1440px | Extended widescreen containers |

---

## ✨ Features

### Navigation
- Mobile menu overlay showing layout links.
- Scroll-aware sticky header transition.
- Shared top controls: theme, RTL, and Enquire call-to-actions.

### Theme System
- 🌙 **Charcoal Dark / Light mode toggle** with automatic client preference checks.
- Persists user selection via `localStorage` with no flash.

### RTL Support
- Full mirrored layout mirroring grids, margins, alignment, tables, and absolute items.

### Interactive Components
- **Counter animations**: count stats on scroll for completed projects, years of craftsmanship.
- **Timeline Tab panel**: steps through project phases (Design, Engineering, Metal Fab, Wood Joinery, Delivery, Install).
- **Project Filter gallery**: lets users dynamically sort staircase portfolios by Wood, Steel, and Glass.
- **Client Toast alerts** & form validity styling.

---

## 🏋️ Pages Overview

### Home (index.html)
1. **Hero Banner** — Modern architectural showcase image with animated particles & stats.
2. **Design Philosophy** — Detailed look at craftsmanship, CAD/BIM drawing sync, safety codes.
3. **Specialty Portfolios** — Custom Wood, Architectural Glass, and Structural Steel card blocks.
4. **Recent Projects** — Filterable showcase gallery.
5. **Testimonials** — Partner feedback from principal architects and builders.
6. **CTA Callout** — Direct request for project quotes.

### Home 2 (home2.html)
1. **Split Hero** — Side-by-side intro targeting developers & builders.
2. **Specialties Cards** — Wood, steel, and glass materials.
3. **Workflow Timeline** — Project schedules detailing steps, specs, durations, and leads.
4. **Coordinators** — Staff profiles detailing engineering credentials.
5. **Design Packages** — 3 pricing plans (Concept, Architectural CAD, Turnkey Build).
6. **Staircase FAQs** — Structural safety calculations, wood grain matching.

### About (about.html)
- Detailed background on the studio's Chennai fabrication center.
- Core values: Precision Engineering, Material Synergy, Certified Safety, and Tailored Customization.
- Team directory detailing CDO, Metal/Glass leads, CAD/BIM coordinators, and joinery heads.

### Services (services.html)
- Specialty filter grid covering all 6 custom build disciplines.
- 3 distinct consultation tiers detailing CAD deliverables and turnkey install stages.

### Blog (blog.html)
- Renovation case studies, wood grain selection tips, riser height codes, and balustrade structural thickness guides.

### Contact (contact.html)
- Custom select dropdown subjects, address coordinates, map embed, and technical compliance FAQs.

---

## 🚀 Getting Started

1. Open `index.html` directly in a browser to run the static workspace — no node build step required.
2. Google Fonts, Font Awesome icons, and Unsplash images load dynamically via CDN.

---

## 📞 Studio Contact Details
- **Phone**: +91 98765 43210
- **Email**: hello@scaladesign.in
- **Address**: 42 Anna Nagar 2nd Avenue, Chennai – 600 040
- **Studio Hours**: Monday – Saturday: 9:00 AM – 6:00 PM

---

*Built with ❤️ for Scala Design Studio*
