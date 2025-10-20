import { Global, Module } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_URL,
} from "../../config/env.loader";

export const SUPABASE_ADMIN = "SUPABASE_ADMIN";

@Global()
@Module({
  providers: [
    {
      provide: SUPABASE_ADMIN,
      useFactory: (): SupabaseClient => {
        if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
          throw new Error("Supabase env vars not configured");
        }
        return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      },
    },
  ],
  exports: [SUPABASE_ADMIN],
})
export class SupabaseModule {}
