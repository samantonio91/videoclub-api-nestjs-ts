# VideoClub API — NestJS + TypeScript

Proyecto de aprendizaje por etapas basado en el diagrama UML de VideoClub. Implementa las **cinco operaciones de clientes** mediante un módulo NestJS, sin base de datos por ahora. Los datos se almacenan **en memoria** y desaparecen al reiniciar la aplicación.

## Ejecutar

Con Node.js 24 y npm:

```bash
npm install
npm run dev
npm test
npm run typecheck
npm run build
```

## Métodos implementados

| Operación | Ruta |
| --- | --- |
| Agregar cliente | `POST /api/customers` |
| Modificar cliente | `PUT /api/customers/:id` |
| Eliminar cliente | `DELETE /api/customers/:id` |
| Mostrar y filtrar clientes | `GET /api/customers?name=ana&documentId=abc` |
| Buscar por ID | `GET /api/customers/:id` |

El alta exige `name` y permite `documentId`, `phone` y `email`. Validamos con DTO y `ValidationPipe`. Los filtros no distinguen mayúsculas de minúsculas. Respuestas: 201 al crear, 200 al consultar/actualizar, 204 al eliminar, 400 si la entrada es inválida y 404 si no existe.

`PUT` reemplaza todo el registro; los datos opcionales omitidos se eliminan. Los IDs se generan en memoria y no son persistentes.

## Arquitectura

`CustomersModule` contiene el controlador HTTP, un servicio con reglas de aplicación y un repositorio inyectable mediante token, preparado para cambiarse por una implementación de PostgreSQL sin reescribir las rutas.

Hay pruebas unitarias de servicio y pruebas HTTP con Vitest, Supertest y `@nestjs/testing`.

## Próximos pasos

- [GamesModule](https://github.com/samantonio91/videoclub-api-nestjs-ts/issues/2): agregar y modificar juegos.
- [PostgreSQL](https://github.com/samantonio91/videoclub-api-nestjs-ts/issues/3): repositorios persistentes y migraciones.
- [Alquileres](https://github.com/samantonio91/videoclub-api-nestjs-ts/issues/4): disponibilidad y devoluciones.

Relacionado con el [issue #1 de Customers](https://github.com/samantonio91/videoclub-api-nestjs-ts/issues/1).
