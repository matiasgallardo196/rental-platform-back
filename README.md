# Rental API (NestJS Mock)

API mock para la plataforma de alquileres. Proporciona endpoints simulados para que el frontend funcione sin una base de datos real.

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
```

## Endpoints

Base: `http://localhost:3001/api`

### Properties

- GET /properties: lista propiedades con filtros opcionales
  - query, location, minPrice, maxPrice, guests, bedrooms, page=1, limit=12
- GET /properties/:id: detalle mock
- POST /properties: crea una propiedad mock

### Auth

- POST /auth/register: registra usuario (mock)
- POST /auth/forgot-password: envía email (mock)

### Users

- PATCH /users/profile: actualiza perfil (mock)

## Notas

- Los datos son en memoria. Cada reinicio restablece el estado.
- Prefijo global `/api` ya configurado en `main.ts`.
