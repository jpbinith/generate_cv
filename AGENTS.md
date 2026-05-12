# AI CV Generator - Agent Instructions

## Project Overview

This is a personal AI-powered CV generation web application.

The system generates tailored CV content from a master CV and job description, then renders the final CV using LaTeX.

## Tech Stack

- Monorepo: pnpm workspace
- Frontend: Next.js App Router + TypeScript
- Backend: Express + TypeScript
- AI: OpenAI API
- Styling: SCSS using ITCSS architecture
- PDF: LaTeX rendering
- Shared packages: TypeScript types, schemas, LaTeX utilities

## Monorepo Structure

```text
apps/web        → Next.js frontend
apps/api        → Express backend and OpenAI integration
packages/shared → shared types, schemas, constants
packages/latex  → LaTeX rendering utilities
generated/tex   → generated LaTeX files
generated/pdf   → generated PDF files
```

## Core Architecture Rules

* Frontend must never call OpenAI directly.
* OpenAI API calls must only happen inside `apps/api`.
* Shared types must be defined in `packages/shared`.
* LaTeX rendering logic must live in `packages/latex`.
* AI-generated output must be validated before use.
* Do not store OpenAI API keys in frontend code.
* Do not commit generated PDF or TeX files unless explicitly required.
* Do not duplicate business logic between frontend and backend.

## AI Generation Rules

* AI must generate structured JSON only.
* AI must not generate raw LaTeX.
* AI must not invent fake experience, companies, education, or skills.
* AI may rewrite and optimize existing experience only.
* AI output must match the shared CV schema.
* Use Zod validation for AI responses where possible.
* Keep AI prompts in a dedicated prompts folder.
* Prefer deterministic, schema-based responses over free text.

## Frontend Architecture

The frontend must follow a module-based and component-based architecture.

Recommended structure:

```text
apps/web/
├── app/
├── modules/
│   └── cv-generator/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       └── index.ts
├── components/
│   ├── ui/
│   └── layout/
├── styles/
│   ├── settings/
│   ├── tools/
│   ├── generic/
│   ├── elements/
│   ├── objects/
│   ├── components/
│   ├── utilities/
│   └── main.scss
└── lib/
```

## Frontend Module Rules

* Each major feature must live inside `modules/<feature-name>`.
* Module-specific components must stay inside that module.
* Shared reusable UI components must live in `components/ui`.
* Layout-level components must live in `components/layout`.
* API calling logic should live in module services.
* React hooks should live in module hooks.
* Avoid placing feature logic directly inside `app/page.tsx`.
* `app/page.tsx` should mainly compose modules.

## Component Rules

* Components must be small and reusable.
* Use TypeScript props interfaces or types.
* Avoid large components with mixed responsibilities.
* Keep presentational components separate from business logic where practical.
* Prefer composition over deeply nested conditional rendering.
* Use clear component names such as `CvForm`, `JobDescriptionInput`, `GeneratedCvPreview`.

## SCSS / ITCSS Rules

Use ITCSS order for global styles:

```text
1. settings   → variables, design tokens, colors, spacing
2. tools      → mixins, functions
3. generic    → resets, normalize, box-sizing
4. elements   → base HTML element styles
5. objects    → layout objects, wrappers, grids
6. components → reusable component styles
7. utilities  → helper classes and overrides
```

Global stylesheet entry:

```text
apps/web/styles/main.scss
```

Import order must be:

```scss
@use "settings";
@use "tools";
@use "generic";
@use "elements";
@use "objects";
@use "components";
@use "utilities";
```

SCSS rules:

* Use SCSS modules for component-specific styles when possible.
* Use global SCSS only for ITCSS layers.
* Use BEM naming for CSS classes where class-based styling is needed.
* Do not put component-specific styles in global files unless shared.
* Avoid excessive nesting.
* Maximum nesting depth: 3 levels.
* Use design tokens from `settings`.
* Avoid hardcoded colors and spacing inside components.
* Prefer class names that describe purpose, not appearance.

## Suggested SCSS Structure

```text
styles/
├── settings/
│   ├── _colors.scss
│   ├── _spacing.scss
│   ├── _typography.scss
│   └── index.scss
├── tools/
│   ├── _mixins.scss
│   └── index.scss
├── generic/
│   ├── _reset.scss
│   └── index.scss
├── elements/
│   ├── _body.scss
│   ├── _forms.scss
│   └── index.scss
├── objects/
│   ├── _container.scss
│   ├── _grid.scss
│   └── index.scss
├── components/
│   ├── _button.scss
│   ├── _card.scss
│   └── index.scss
├── utilities/
│   ├── _spacing.scss
│   ├── _text.scss
│   └── index.scss
└── main.scss
```

## Naming Conventions

* React components: PascalCase
* Hooks: useSomething
* Services: somethingService.ts
* Types: something.types.ts
* SCSS modules: ComponentName.module.scss
* API routes: kebab-case
* Folders: kebab-case
* Shared package exports must be explicit.

## Backend Rules

* Keep API routes/controllers thin.
* Put OpenAI logic in a dedicated service.
* Backend module-specific types must live in `modules/<feature>/types/` files such as `auth.types.ts`.
* Validate request bodies before processing.
* Services must not use Express `req` or `res` objects directly.
* Routes/controllers should send success responses only.
* Use a global Express error handler for shared error responses and unexpected `500` failures.
* Services may throw structured domain/service errors, and the global error handler should translate them into HTTP responses.
* Return consistent JSON responses.
* Never expose internal errors to the frontend.
* Keep prompts separated from route handlers.
* Use environment variables for secrets.

## LaTeX Rules

* AI must not directly control LaTeX templates.
* Escape all user-generated and AI-generated text before injecting into LaTeX.
* Keep LaTeX templates and rendering utilities inside `packages/latex`.
* Generated `.tex` and `.pdf` files should go into `generated/`.
* LaTeX rendering should use structured CV data only.

## TypeScript Rules

* Use strict TypeScript.
* Avoid `any`.
* Prefer typed API responses.
* Use shared types from `packages/shared`.
* Use Zod schemas for runtime validation.
* Avoid duplicated type definitions across apps.

## Development Commands

Install dependencies:

```bash
pnpm install
```

Run frontend:

```bash
pnpm --filter web dev
```

Run backend:

```bash
pnpm --filter api dev
```

Run all apps:

```bash
pnpm dev
```

Build all:

```bash
pnpm build
```

## Important Principle

AI generates the content.

The application controls:

* data validation
* layout
* rendering
* styling
* LaTeX templates
* PDF generation
