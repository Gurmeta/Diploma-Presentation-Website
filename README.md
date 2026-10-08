<div align="center">

# Automated Website Provisioning with Azure and Terraform

**An interactive presentation for a bachelor's thesis defence – run the ideas instead of reading slides.**

[**Live demo**](https://gurmeta.github.io/Diploma-Presentation-Website/) ·
[English](https://gurmeta.github.io/Diploma-Presentation-Website/?lang=en) ·
[Български](https://gurmeta.github.io/Diploma-Presentation-Website/?lang=bg)

![React 19](https://img.shields.io/badge/React-19-20232a?logo=react&logoColor=61dafb)
![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![Vite 6](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4-06b6d4?logo=tailwindcss&logoColor=white)
![License MIT](https://img.shields.io/badge/license-MIT-green)

</div>

Built for my bachelor's thesis at the University of Telecommunications and Posts (UTP), Sofia. The thesis creates a website on Microsoft Azure with Infrastructure as Code (HashiCorp Terraform). The deck lets the audience try it: a Terraform terminal, a cost calculator and comparison charts.

**Result:** the thesis and its defence were both graded **Excellent 6 (GPA A)**.

*Кратко на български: интерактивна презентация за защита на дипломна работа – автоматизирано създаване на уебсайт чрез Azure и IaC (Terraform). Защитата и дипломната работа са оценени с **Отличен 6 (GPA A)**. Вижте раздела [На български](#на-български).*

## Try the demo

Slide 5 is the centrepiece. The terminal is a simulation that runs in your browser and never talks to Azure, so you can break things freely.

1. Open slide 5 (**Demo**), or go straight to [`#5`](https://gurmeta.github.io/Diploma-Presentation-Website/#5).
2. Pick a scenario under *Scenarios to try* (see the table below).
3. Press `terraform init`, then `terraform plan`, then `terraform apply -auto-approve`. Resources appear in the monitor one by one.
4. When the apply succeeds, the simulated browser shows the deployed site. Open the architecture diagram for the full topology.
5. Run `terraform destroy -auto-approve` to tear everything down, or *Clear* to reset the terminal.

| Scenario | What happens |
| --- | --- |
| Azure Policy error (blocked region) | `apply` fails because the region is not allowed by policy |
| Zero core quota (`OperationNotAllowed`) | `apply` fails because the subscription has no vCPU quota |
| Successful deployment (Poland Central) | All resources are created and the site goes live |

The two failing scenarios reproduce real errors from the thesis (slide 4). You can also edit `location` and `size` yourself.

## What's inside

| Slide | Content |
| --- | --- |
| 1 · Title | Thesis title, author, supervisor, and the nine Terraform resources "applying" live |
| 2 · Objective | Main goal and four sub-goals |
| 3 · Tasks | The six technical tasks of the thesis |
| 4 · Contribution | Real Azure errors met during deployment and how each was fixed |
| 5 · Demo | Terraform terminal simulator, resource monitor, simulated browser, architecture diagram |
| 6 · Conclusion | Engineering benefits of IaC and a technical summary |
| 7 · Thanks | Closing slide |
| 8 · Extra | Method comparison, Azure cost simulator (BGN/EUR), latency from Bulgaria to EU regions |

## Features

- Bilingual UI (BG/EN) and a light/dark theme; both choices are remembered, and the theme follows the system setting until you pick one
- Keyboard, touch swipe and on-screen navigation; every slide has its own link (`#5`)
- Responsive layout: sidebar on desktop, slide menu and bottom controls on phones
- Accessible: skip link, semantic landmarks, keyboard-operable tabs and menus, visible focus, contrast checked in both themes (WCAG AA), `prefers-reduced-motion` respected
- No backend and no API keys – static files only

### Keyboard shortcuts

| Key | Action |
| --- | --- |
| `→` `PageDown` `Space` `Enter` | Next slide |
| `←` `PageUp` `Backspace` | Previous slide |
| `Home` / `End` | First / last slide |
| `F` | Toggle full screen |

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

**Резултат:** дипломната работа и защитата са оценени с **Отличен 6 (GPA A)**.

### Как да пробвате демото

Слайд 5 е централният. Терминалът е симулация в браузъра и не изпраща заявки към Azure.

1. Отворете слайд 5 (**Демо**) или директно [`#5`](https://gurmeta.github.io/Diploma-Presentation-Website/?lang=bg#5).
2. Изберете сценарий от „Сценарии за изпробване“: грешка от Azure Policy, нулева квота или успешно внедряване.
3. Натиснете `terraform init`, после `terraform plan`, после `terraform apply -auto-approve`.
4. След успешния `apply` симулираният браузър показва готовия сайт; архитектурната диаграма се отваря от бутона до него.
5. `terraform destroy -auto-approve` изтрива всичко, а „Изчисти“ нулира терминала.

### Накратко

- **Тема:** светла или тъмна, превключва се от бутона в страничната лента; следва системната настройка, докато не изберете сами.
- **Език:** превключвател БГ/EN в страничната лента (или `?lang=bg` / `?lang=en` в адреса).
- **Навигация:** `←` / `→`, `Интервал`, плъзгане на мобилно устройство, `F` за цял екран.
- **Стартиране:** `npm install`, после `npm run dev`.
- **Деплой:** автоматичен при push към `main` чрез GitHub Actions (Settings → Pages → Source: GitHub Actions).

## Author

**Georgi Stefanov** (student ID 170297), Computer Technologies, 4th year  
University of Telecommunications and Posts (UTP), Sofia  
**Supervisor:** Assoc. Prof. Pavlinka Radoyska, PhD

## License

[MIT](LICENSE). The UTP logo and name belong to the university and are not covered by this license.
