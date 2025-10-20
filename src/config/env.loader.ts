import { config as dotenvConfig } from "dotenv";

// Carga de variables en desarrollo desde .env.development
if (process.env.NODE_ENV !== "production") {
  dotenvConfig({ path: ".env.development" });
}

// Solo variables realmente usadas por el backend
export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = parseInt(process.env.PORT || "3001", 10);

// Supabase
export const SUPABASE_URL = process.env.SUPABASE_URL as string | undefined;
export const SUPABASE_SERVICE_ROLE_KEY = process.env
  .SUPABASE_SERVICE_ROLE_KEY as string | undefined;

// R2 / S3
export const R2_ENDPOINT = process.env.R2_ENDPOINT as string | undefined;
export const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID as
  | string
  | undefined;
export const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY as
  | string
  | undefined;
export const R2_BUCKET = process.env.R2_BUCKET as string | undefined;
export const R2_PUBLIC_BASE_URL = process.env.R2_PUBLIC_BASE_URL as
  | string
  | undefined;
