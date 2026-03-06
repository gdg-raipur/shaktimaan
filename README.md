# AI Resume Judge 🤖📄

> A GDG Raipur workshop project — build an AI-powered resume reviewer using Next.js and Google Gemini.

Upload your resume (PDF or DOCX), and get instant structured feedback: an overall score, section-by-section breakdown, strengths, weaknesses, and actionable suggestions — all powered by the Gemini API.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- A [Gemini API key](https://aistudio.google.com/apikey) (free tier works)

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/gdg-raipur/shaktimaan.git
cd shaktimaan

# 2. Install dependencies
npm install

# 3. Set up your API key
cp .env.example .env.local
# Edit .env.local and add your Gemini API key

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Workshop Checkpoints

This project is built across **6 incremental checkpoints**. Each branch is a working app that introduces one new concept. If you fall behind, just checkout the branch and keep going!

| Branch | Concept | What You'll Build |
|--------|---------|-------------------|
| `checkpoint-0/starter` | Project scaffolding | Next.js app with landing page |
| `checkpoint-1/upload-ui` | React state & events | Drag & drop file upload |
| `checkpoint-2/extract-text` | File processing | PDF & DOCX text extraction |
| `checkpoint-3/gemini-api` | API routes & AI | Gemini integration for evaluation |
| `checkpoint-4/complete` | UI composition | Polished results display |
| `checkpoint-5/stretch` | Extending AI apps | Job description tailoring |

### Switching Checkpoints

```bash
# Jump to any checkpoint
git checkout checkpoint-2/extract-text

# Install dependencies (in case they changed)
npm install

# Start the dev server
npm run dev
```

The `main` branch contains the finished app (same as `checkpoint-4/complete`).

## Tech Stack

- **Next.js 14** — React framework with App Router
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS** — Utility-first styling
- **Google Gemini API** — AI-powered resume evaluation
- **pdfjs-dist** — PDF text extraction
- **mammoth** — DOCX text extraction

## Project Structure

```
app/
├── layout.tsx          # Root layout with dark theme
├── page.tsx            # Main page — upload → extract → evaluate → results
├── globals.css         # Tailwind + custom animations
└── api/evaluate/
    └── route.ts        # POST endpoint that calls Gemini

components/
├── UploadZone.tsx      # Drag & drop file upload
├── TextPreview.tsx     # Shows extracted resume text
├── ResultsCard.tsx     # Score card with section breakdown
├── StrengthsWeaknesses.tsx  # Strengths/weaknesses panels
└── ScoreBar.tsx        # Reusable progress bar

lib/
├── extract.ts          # PDF + DOCX text extraction
├── prompt.ts           # System prompt for Gemini
└── types.ts            # TypeScript types
```

## License

MIT — built with ❤️ by GDG Raipur
