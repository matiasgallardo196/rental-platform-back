import { Global, Module } from "@nestjs/common";
import { APP_GUARD, Reflector } from "@nestjs/core";
import { SupabaseModule } from "../supabase/supabase.module";
import { SupabaseAuthGuard } from "./supabase-auth.guard";
import { RoleGuard } from "./role.guard";

@Global()
@Module({
  imports: [SupabaseModule],
  providers: [
    SupabaseAuthGuard,
    RoleGuard,
    { provide: APP_GUARD, useClass: SupabaseAuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
  exports: [SupabaseAuthGuard, RoleGuard],
})
export class AuthModule {}
