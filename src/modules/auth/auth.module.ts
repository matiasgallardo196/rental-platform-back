import { Global, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { SupabaseModule } from "../../supabase/supabase.module";
import { SupabaseAuthGuard } from "./supabase-auth.guard";

@Global()
@Module({
  imports: [SupabaseModule],
  controllers: [AuthController],
  providers: [SupabaseAuthGuard],
  exports: [SupabaseAuthGuard],
})
export class AuthModule {}
