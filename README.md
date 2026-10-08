# Diploma Presentation – Automated Website Provisioning with Azure and Terraform

**Live demo:** <https://gurmeta.github.io/Diploma-Presentation-Website/>  
**Languages:** Bulgarian · English (switch in the sidebar or with `?lang=en` / `?lang=bg`)

An interactive web presentation built for my bachelor's thesis defence at the University of Telecommunications and Posts (UTP), Sofia. The thesis is about creating a website on Microsoft Azure with Infrastructure as Code (HashiCorp Terraform). Instead of static slides, the deck lets the audience *run* the ideas: a Terraform terminal, a cost calculator and comparison charts.

*Кратко на български: интерактивна презентация за защита на дипломна работа – автоматизирано създаване на уебсайт чрез Azure и IaC (Terraform). Поддържа български и английски. Вижте раздела [На български](#на-български).*

## What's inside

| Slide | Content |
| --- | --- |
| 1 · Title | Thesis title, author, supervisor, and the nine Terraform resources "applying" live |
| 2 · Objective | Main goal and four sub-goals |
| 3 · Tasks | The six technical tasks of the thesis |
| 4 · Contribution | Real Azure errors met during deployment and how each was fixed |
| 5 · Demo | Terraform terminal simulator (`init`, `plan`, `apply`, `destroy`), resource monitor, simulated browser with the deployed site, architecture diagram |
| 6 · Conclusion | Engineering benefits of IaC and a technical summary |
| 7 · Thanks | Closing slide |
| 8 · Extra | Method comparison, Azure cost simulator (BGN/EUR), latency from Bulgaria to EU regions |

The demo is a simulation that runs entirely in the browser; it never talks to Azure. Try the *Azure Policy* and *zero core quota* scenarios to see the errors from slide 4 reproduced.

## Features

- Bilingual UI (BG/EN) and a light/dark theme; both choices are remembered, and the theme follows the system setting until you pick one
- Keyboard, touch swipe and on-screen navigation; every slide has its own link (`#5`)
- Responsive layout: sidebar on desktop, slide menu and bottom controls on phones
- Accessible: skip link, semantic landmarks, keyboard-operable tabs and menus, visible focus, contrast checked in both themes (WCAG AA), `prefers-reduced-motion` respected
- No backend and no API keys – static files only

## Tech stack

React 19 · TypeScript (strict) · Vite 6 · Tailwind CSS 4 · Motion · Lucide icons  
Fonts: Geologica and IBM Plex Mono (Google Fonts)

## Run locally

Requires Node.js 20 or newer.

```bash
git clone https://github.com/Gurmeta/Diploma-Presentation-Website.git
cd Diploma-Presentation-Website
npm install
npm run dev        # http://localhost:3000
```

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run lint` | Type check (`tsc --noEmit`) |
| `npm run build` | Type check and production build into `dist/` |
| `npm run preview` | Serve the production build locally |

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| `→` `PageDown` `Space` `Enter` | Next slide |
| `←` `PageUp` `Backspace` | Previous slide |
| `Home` / `End` | First / last slide |
| `F` | Toggle full screen |

## Project structure

```text
src/
├── App.tsx                     # Shell: sidebar, navigation, keyboard and swipe
├── slides/                     # One component per slide, plus the slide order
├── components/
│   ├── InteractiveShowcase.tsx # Terraform terminal, resource monitor, simulated browser
│   ├── InteractiveCharts.tsx   # Comparison, cost calculator, latency
│   ├── PlanPanel.tsx           # Animated resource list on the title slide
│   ├── LanguageSwitch.tsx
│   ├── ThemeToggle.tsx
│   ├── SlideHeader.tsx
│   └── VutpLogo.tsx
├── i18n/
│   ├── bg.ts                   # Bulgarian copy (defines the dictionary shape)
│   ├── en.ts                   # English copy
│   └── I18nProvider.tsx        # Language state, persistence, <html lang>
├── theme/ThemeProvider.tsx     # Light/dark state, persistence, data-theme on <html>
├── utils/matrixHtml.ts         # HTML of the demo site shown in the simulated browser
└── index.css                   # Design tokens (light and dark) and base styles
public/architecture-diagram.png # Architecture diagram
```

### Changing text or adding a language

All visible copy lives in `src/i18n/`. Edit `bg.ts` and `en.ts` together; TypeScript reports any key that is missing in one of them. To add a language, create a new dictionary with the same shape, register it in `I18nProvider.tsx` and add a button in `LanguageSwitch.tsx`.

Terraform output inside the terminal simulator is intentionally kept in English, as it appears in a real terminal.

## Deployment (GitHub Pages)

Every push to `main` runs [`deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes it.  
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

If the repository is renamed, update `base` in [`vite.config.ts`](vite.config.ts).

## На български

Интерактивна презентация за защита на дипломна работа на тема **„Автоматизирано създаване на уебсайт чрез Azure и практиката IaC“**. Съдържа симулатор на Terraform терминал, калкулатор на разходите за Azure, сравнителни графики и архитектурна диаграма.

- **Тема:** светла или тъмна, превключва се от бутона в страничната лента; следва системната настройка, докато не изберете сами.
- **Език:** превключвател БГ/EN в страничната лента (или `?lang=bg` / `?lang=en` в адреса).
- **Навигация:** `←` / `→`, `Интервал`, плъзгане на мобилно устройство, `F` за цял екран.
- **Стартиране:** `npm install`, после `npm run dev`.
- **Деплой:** автоматичен при push към `main` чрез GitHub Actions (Settings → Pages → Source: GitHub Actions).
- Демонстрацията е симулация в браузъра и не изпраща заявки към Azure.

## Author

**Georgi Stefanov** (student ID 170297), Computer Technologies, 4th year  
University of Telecommunications and Posts (UTP), Sofia  
**Supervisor:** Assoc. Prof. Pavlinka Radoyska, PhD

## License

[MIT](LICENSE). The UTP logo and name belong to the university and are not covered by this license.
