import { Global, Module } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const SUPABASE_ADMIN = "SUPABASE_ADMIN";

@Global()
@Module({
  providers: [
    {
      provide: SUPABASE_ADMIN,
      useFactory: (): SupabaseClient => {
        return createClient(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
      },
    },
  ],
  exports: [SUPABASE_ADMIN],
})
export class SupabaseModule {}
