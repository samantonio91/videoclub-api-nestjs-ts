# VideoClub API — NestJS + TypeScript

An **incremental backend learning project** built with NestJS 12, TypeScript and Node.js. It uses the same [VideoClub UML learning domain](https://github.com/samantonio91/videoClub) as the [Express version](https://github.com/samantonio91/videoclub-api-express-ts), but emphasizes NestJS modules, controllers, providers, dependency injection and testable business rules.

**Current phase: foundation only.** The implemented endpoint is `GET /api/health`. Customer and game operations, persistence and rentals are planned in [GitHub Issues](https://github.com/samantonio91/videoclub-api-nestjs-ts/issues); they do not exist yet. This repository is **not production-ready**.

## Tech stack

- Node.js 24 recommended
- NestJS 12, TypeScript 6, ES modules
- Vitest + Supertest for automated tests
- Layered modules with injectable providers

## Run

```bash
npm install
npm run dev
```

Check `http://localhost:3000/api/health`:

```json
{"status":"ok","service":"videoclub-api-nestjs-ts"}
```

Run checks:

```bash
npm run typecheck
npm test
npm run build
npm start
```

No database or credentials are needed for this foundation. All source imports use explicit `.js` extensions to match native ESM output. Do not commit an actual `.env`.

## Planned stages

1. **Customers module:** create, update, delete, list/filter and find by ID — [issue #1](https://github.com/samantonio91/videoclub-api-nestjs-ts/issues/1)
2. **Games module:** create and update, Product/Game model — [issue #2](https://github.com/samantonio91/videoclub-api-nestjs-ts/issues/2)
3. **PostgreSQL persistence:** injectable repositories and migrations — [issue #3](https://github.com/samantonio91/videoclub-api-nestjs-ts/issues/3)
4. **Rentals and returns:** domain rules, availability, concurrency protection — [issue #4](https://github.com/samantonio91/videoclub-api-nestjs-ts/issues/4)
5. **Portfolio quality:** Swagger/OpenAPI, Docker and security review — [issue #5](https://github.com/samantonio91/videoclub-api-nestjs-ts/issues/5)

## Learning comparison

- **Java Spring Boot:** JPA and familiar layered Java enterprise patterns.
- **Express + TypeScript:** manual composition of controllers, services and repository interfaces.
- **NestJS + TypeScript:** framework-managed modules, providers and dependency injection, with progressively richer domain behavior.

This repository has genuine milestones and pull requests; no artificial commit history or fake development dates.

Español: [README.es.md](README.es.md).
