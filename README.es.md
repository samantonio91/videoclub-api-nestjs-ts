# VideoClub API — NestJS + TypeScript

Proyecto de aprendizaje incremental con **NestJS 12, TypeScript y Node.js**, enfocado en módulos, controladores, proveedores e inyección de dependencias.

**Estado actual:** únicamente se implementó la base del proyecto y `GET /api/health`. Todavía no incluye operaciones de clientes, juegos, base de datos ni alquileres. Las mejoras están organizadas en los [Issues de GitHub](https://github.com/samantonio91/videoclub-api-nestjs-ts/issues).

## Ejecución

Recomendado: Node.js 24.

```bash
npm install
npm run dev
npm test
npm run typecheck
npm run build
```

El endpoint `GET /api/health` devuelve un JSON de estado. La primera versión no requiere credenciales ni base de datos.

## Plan de desarrollo

1. Clientes: alta, edición, eliminación, listado y búsqueda.
2. Juegos: alta y edición, con validaciones.
3. PostgreSQL con migraciones y repositorios inyectables.
4. Alquileres, devoluciones y reglas de disponibilidad.
5. Swagger, Docker, CI y documentación técnica.

Esta versión complementará la API Express, demostrando una arquitectura dirigida por NestJS y casos de negocio gradualmente más complejos.
