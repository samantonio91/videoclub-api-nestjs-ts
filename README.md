# VideoClub API — NestJS + TypeScript

An **incremental backend learning project** built with NestJS 12, TypeScript and Node.js. It uses the same [VideoClub UML learning domain](https://github.com/samantonio91/videoClub) as the [Express version](https://github.com/samantonio91/videoclub-api-express-ts), but focuses on NestJS modules, dependency injection, validation and domain rules.

**Current phase: CustomersModule implemented** (five customer operations), plus `GET /api/health`. Persistence is currently **in memory** and all data is lost on restart. Games, rentals and payments are not implemented, and this is not a production-ready system.

## Development

Requires Node.js 24 (recommended) and npm.

```bash
npm install
npm run dev
```

Validation and automated checks:

```bash
npm run typecheck
npm test
npm run build
```

## Available endpoints

| UML operation | HTTP | Route |
| --- | --- | --- |
| AgregarCliente | POST | `/api/customers` |
| ModificarCliente | PUT | `/api/customers/:id` |
| EliminarCliente | DELETE | `/api/customers/:id` |
| MostrarClientes | GET | `/api/customers?name=ana&documentId=abc` |
| BuscarCliente | GET | `/api/customers/:id` |
| Health | GET | `/api/health` |

**POST example**

```bash
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana Garcia","documentId":"ABC-123","phone":"5551234","email":"ana@example.com"}'
```

The response includes a generated numeric `id`. `PUT` replaces the **whole** customer record; omitted optional properties are cleared. Deleting returns HTTP 204. Missing records return HTTP 404, and invalid body/query/id parameters return HTTP 400.

Both `name` and `documentId` can filter the customer list using case-insensitive partial matches.

## NestJS design

- `CustomersModule` registers controller, service and repository provider.
- `CustomersController` exposes REST routes and delegates to `CustomersService`.
- Request DTO classes are validated by a globally configured `ValidationPipe` using `class-validator` and `class-transformer`.
- The service receives a repository through the `CUSTOMERS_REPOSITORY` injection token.
- The in-memory repository is replaceable by a persistent adapter in the [PostgreSQL issue](https://github.com/samantonio91/videoclub-api-nestjs-ts/issues/3).
- Tests cover service behavior and HTTP behavior with `@nestjs/testing`, Vitest and Supertest.

## Next issues

1. [GamesModule (issue #2)](https://github.com/samantonio91/videoclub-api-nestjs-ts/issues/2).
2. [PostgreSQL with migrations (issue #3)](https://github.com/samantonio91/videoclub-api-nestjs-ts/issues/3).
3. [Rental workflow and availability (issue #4)](https://github.com/samantonio91/videoclub-api-nestjs-ts/issues/4).
4. [OpenAPI, Docker and security (issue #5)](https://github.com/samantonio91/videoclub-api-nestjs-ts/issues/5).

This implementation belongs to [CustomersModule issue #1](https://github.com/samantonio91/videoclub-api-nestjs-ts/issues/1). Read the [Spanish README](README.es.md).
