# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

AI Resume Judge — a GDG Raipur workshop project. Users upload a resume (PDF/DOCX), text is extracted client-side, sent to the Gemini API for evaluation, and results are displayed with scores, strengths, weaknesses, and suggestions.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
```

## Environment Setup

Copy `.env.example` to `.env.local` and add your Gemini API key from https://aistudio.google.com/apikey.

## Architecture

- **Next.js 14 App Router** with TypeScript and Tailwind CSS
- **Client-side file processing**: `pdfjs-dist` for PDF, `mammoth` for DOCX — no server-side file handling
- **Server-side AI**: POST `/api/evaluate` calls Gemini via `@google/genai` SDK, keeping the API key secret
- **No external UI libraries** — only Tailwind CSS

### Data Flow

1. `UploadZone` → user selects file
2. `lib/extract.ts` → extracts text client-side (PDF.js worker via CDN)
3. `TextPreview` → shows extracted text
4. `POST /api/evaluate` → sends text to Gemini 2.0 Flash with structured JSON output (`responseMimeType: "application/json"`)
5. `ResultsCard` + `StrengthsWeaknesses` → render evaluation results

### Key Files

- `lib/prompt.ts` — System prompt with scoring rubrics and JSON schema
- `lib/types.ts` — `EvaluationResult` interface shared between API route and components
- `lib/extract.ts` — PDF/DOCX text extraction dispatcher
- `app/api/evaluate/route.ts` — Gemini API endpoint
- `app/page.tsx` — Main page orchestrating the full flow as a client component

## Branch Structure

This is a workshop repo with 6 incremental checkpoint branches. Each branch is a working app.

| Branch | What it adds |
|--------|-------------|
| `checkpoint-0/starter` | Scaffolding, landing page, placeholder files |
| `checkpoint-1/upload-ui` | Drag & drop upload component |
| `checkpoint-2/extract-text` | PDF/DOCX text extraction |
| `checkpoint-3/gemini-api` | Gemini API integration |
| `checkpoint-4/complete` | Polished results UI (= `main`) |
| `checkpoint-5/stretch` | Optional job description tailoring |

## Conventions

- This is a **teaching codebase**: files have educational comments, `console.log` breadcrumbs, and descriptive variable names
- Dark theme throughout: slate-900/slate-800 backgrounds, sky-blue (#0EA5E9) accent color
- Components use inline SVG icons (no icon library)
- Score color coding: green (70+), yellow (50-69), red (below 50)
