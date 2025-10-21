# AlojaPy API (NestJS)

API para la plataforma de alquileres AlojaPy. Integra Supabase Auth (JWT) y aplica rate‑limit global.

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

### Ejemplo `.env.development`

```bash
# Server
PORT=3001

# Supabase (Service Role key solo en backend)
SUPABASE_URL=https://<PROJECT_REF>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Cloudflare R2 / S3 compatible
R2_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_BUCKET=your-bucket-name
R2_PUBLIC_BASE_URL=https://cdn.example.com
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

## Swagger / OpenAPI

- UI de documentación: `http://localhost:3001/api/docs`
- Autorización: botón "Authorize" → esquema `bearer` → pegar `Bearer <JWT>` de Supabase.
- Roles:
  - Rutas `/admin/**` requieren `role=admin` en `user_metadata`.
  - Rutas `/hosts/**` requieren `role=host` o `admin`.
- Rate limit: 20 req / 60s por IP (429 Too Many Requests). Ajustable en `AppModule`.

## Seguridad / Producción

- Throttling global: `@nestjs/throttler` (20 req / 60s por IP). Ajustable en `AppModule`.
- CORS: habilitar el dominio de producción en `main.ts`.
- Supabase: usar `SUPABASE_SERVICE_ROLE_KEY` solo en backend (nunca exponer en frontend).
