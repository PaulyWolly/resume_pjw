# Paul Welby — Interactive Resume

An Angular v20 single-page application showcasing Paul Welby's professional resume, hosted on Netlify with PDF download capability.

## Tech Stack

- **Angular v20** (standalone components, signals, OnPush change detection)
- **TypeScript** with typed static data arrays
- **SCSS** with CSS custom properties
- **jsPDF** for client-side text-based PDF generation (no screenshot/OCR artifacts)
- **Netlify** for hosting

## Prerequisites

Angular 20 requires **Node.js v20.19+**. Switch with nvm:

```bash
nvm use 20.19.1
```

## Development

```bash
cd resume-app
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200).

## Build

```bash
npm run build
```

Output goes to `dist/resume-app/browser/`.

## Deploy to Netlify

1. Push this repo to GitHub.
2. Connect the repo in Netlify — the root `netlify.toml` handles build settings automatically.
3. Or drag-and-drop the `dist/resume-app/browser` folder to Netlify's deploy UI.

## Project Structure

```
resume-app/src/app/
├── data/resume.data.ts      # Static resume content (flat-file arrays)
├── models/resume.model.ts   # TypeScript interfaces
├── components/
│   ├── header/              # Name, contact, summary
│   ├── experience/          # Work history + education
│   └── skills/              # Skills footer with chip tags
├── services/pdf.service.ts  # Client-side PDF generation
└── app.ts                   # Root component
```

## Updating Content

All resume content lives in `src/app/data/resume.data.ts`. Edit the arrays directly — no database or API needed.
