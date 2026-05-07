# ITGroup Germaniya Live

Production-grade marketing site **and** admin panel for **ITGroup Germaniya Live** — an IT services studio building CRM, ERP, mobile apps, web platforms, Telegram bots and AI integrations.

`itgroup.germaniya-live.uz`

---

## Stack

- **Next.js 14** App Router · **TypeScript** strict
- **Tailwind CSS** + **shadcn/ui**-style primitives
- **Framer Motion** for choreography
- **next-intl** for UZ / RU / EN
- **next-themes** for light + dark
- **react-hook-form** + **zod** for forms
- **Lucide** icons
- **Sonner** for toasts

---

## Run it

```bash
cd germaniya-live
pnpm install      # or: npm install / yarn / bun install
pnpm dev          # http://localhost:3000
```

The middleware redirects `/` → `/uz` (default locale). Available locales: `uz`, `ru`, `en`.

```bash
pnpm build        # production build
pnpm start        # serve the production build
pnpm type-check   # tsc --noEmit
```

---

## Routes

### Public (marketing)

| Path | Purpose |
|---|---|
| `/[locale]` | Landing — hero (with monitor mockup), services, process, cases, why-us, stats, testimonials, CTA |
| `/[locale]/services/[slug]` | Detail page for each service (`crm`, `erp`, `mobile`, `web`, `telegram-bots`, `ai`) |
| `/[locale]/cases` | Case studies grid with service filter |
| `/[locale]/about` | Mission, values, team |
| `/[locale]/contact` | Contact form (chip-select for service & budget) + direct channels |
| `/[locale]/login` · `/register` | Auth screens |

### Admin

| Path | Purpose |
|---|---|
| `/[locale]/admin` | Dashboard — KPIs, sparklines, leads-over-time chart, service-mix bars |
| `/[locale]/admin/leads` | Pipeline — tab strip, search, table ↔ kanban toggle, lead drawer |
| `/[locale]/admin/clients` | Placeholder — coming soon |
| `/[locale]/admin/projects` | Placeholder — coming soon |
| `/[locale]/admin/users` | Team — search, role / status badges, edit / delete |
| `/[locale]/admin/settings` | Profile, security, notifications, appearance |

---

## File map

```
app/
  layout.tsx                       root layout
  not-found.tsx
  globals.css                      tokens, light + dark themes
  [locale]/
    layout.tsx                     fonts, theme, i18n providers
    (marketing)/
      layout.tsx                   navbar + footer
      page.tsx                     landing
      services/[slug]/page.tsx
      about/page.tsx
      cases/page.tsx
      contact/page.tsx
    (auth)/
      layout.tsx
      login/page.tsx
      register/page.tsx
    admin/
      layout.tsx                   sidebar shell
      page.tsx                     dashboard
      leads/page.tsx
      users/page.tsx
      settings/page.tsx
      clients/page.tsx
      projects/page.tsx
components/
  brand/
    logo.tsx                       SVG mark + wordmark
    monitor-mockup.tsx             hero centerpiece — logo on a 3D monitor
  marketing/
    navbar.tsx · hero.tsx · trust-strip.tsx · services-grid.tsx
    process-section.tsx · stats-strip.tsx · cases-section.tsx
    why-us.tsx · testimonials.tsx · cta-banner.tsx · footer.tsx
  admin/
    sidebar.tsx · topbar.tsx · stat-card.tsx
  ui/
    button.tsx · card.tsx · input.tsx · textarea.tsx · label.tsx
    badge.tsx · section.tsx · dropdown-menu.tsx · dialog.tsx
    theme-toggle.tsx · language-switcher.tsx
  providers/
    theme-provider.tsx
content/
  services.ts                      6 services — icons, stack, deliverables
  cases.ts                         6 case studies — covers, metrics
lib/
  utils.ts                         cn(), formatNumber(), slugify()
  mock-leads.ts                    seed pipeline data
  mock-users.ts                    seed admin users
messages/
  uz.json · ru.json · en.json      complete translations
i18n.ts                            next-intl request config
middleware.ts                      locale routing
tailwind.config.ts                 brand palette + motion tokens
public/
  favicon.svg                      brand mark
```

---

## Brand language

- The **logo** is an abstract letter G as a stylized eagle's head in a warm orange-amber gradient. The hero uses a **3D monitor mockup** (`components/brand/monitor-mockup.tsx`) showing the logo on screen, with cursor-aware parallax and an ambient halo.
- The palette is derived from the logo: a warm orange primary (`brand.500`) on a neutral foundation. Light and dark themes are first-class, each with its own deliberate composition rather than a simple invert.
- Typography: **Space Grotesk** display (geometric, takes the wordmark voice), **Inter** UI, **JetBrains Mono** for IDs and stat metadata.
- Motion uses `cubic-bezier(0.16, 1, 0.3, 1)` consistently — slow, confident, never bouncy. `prefers-reduced-motion` is respected in `globals.css`.

---

## Deviating from the original Mag'zuna codebase

This project re-imagines the Mag'zuna Consult Flask/HTML site for a different purpose: an IT services studio. The structural inheritance:

| Original | Here |
|---|---|
| Hero with image grid | Hero with 3D monitor mockup of the logo |
| 6 service cards (Accounting, Brokerage, IT, HR, Licensing, Energy) | 6 service cards (CRM, ERP, Mobile, Web, Telegram bots, AI) |
| Order form per service | Contact form with chip-select service + budget |
| Vanilla HTML/JS + Tailwind CDN | Next.js 14 + TS + Tailwind + shadcn primitives |
| Order management admin | Lead pipeline (table + kanban) + dashboard |
| Single-language UZ/RU/EN via `data-lang-key` | Route-based i18n with `next-intl` |
| No theme | Light + dark first-class |
| No motion library | Framer Motion choreography |

---

## Notes for future work

- Replace `lib/mock-leads.ts` and `lib/mock-users.ts` with a real API client (TanStack Query + MSW handlers in dev).
- Wire the contact form to a real endpoint — current submit is simulated.
- The admin auth is not enforced; add a route guard before exposing.
- Add a websocket layer for real-time lead updates in the dashboard.
