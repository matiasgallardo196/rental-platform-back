# Rental API (NestJS)

API para la plataforma de alquileres. Integra Supabase Auth (JWT) y aplica rate‑limit global.

## Requisitos

- Node.js 18+
- npm o pnpm

## Instalación

```bash
# En la carpeta rental-api
npm install
```

## Desarrollo

```bash
# Ejecuta el servidor en modo desarrollo
npm run start:dev
```

El servidor corre en `http://localhost:3001` con prefijo `api`. CORS habilitado para `http://localhost:3000`.

## Variables de entorno

```bash
PORT=3001 # opcional, por defecto 3001
SUPABASE_URL=https://<PROJECT_REF>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
```

## Endpoints

Base: `http://localhost:3001/api`

### Properties

- GET /properties: lista propiedades con filtros opcionales
  - query, location, minPrice, maxPrice, guests, bedrooms, page=1, limit=12
- GET /properties/:id: detalle mock
- POST /properties: crea una propiedad mock

### Auth

- Autenticación y recuperación están delegadas a Supabase Auth (frontend).
- El backend valida JWT con `SupabaseAuthGuard` y roles con `RoleGuard`.

#### Endpoints de auth deshabilitados

- `POST /auth/register`, `POST /auth/login`, `POST /auth/forgot-password` responden **410 Gone** indicando que se use Supabase desde el frontend.
- Ver `src/modules/auth/auth.controller.ts`.

### Users

- PATCH /users/profile: actualiza perfil (mock)

## Seguridad / Producción

- Throttling global: `@nestjs/throttler` (20 req / 60s por IP). Ajustable en `AppModule`.
- CORS: habilitar el dominio de producción en `main.ts`.
- Supabase: usar `SUPABASE_SERVICE_ROLE_KEY` solo en backend (nunca exponer en frontend).
