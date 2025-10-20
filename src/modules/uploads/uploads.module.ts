import { Module } from "@nestjs/common";
import { UploadsController } from "./uploads.controller";
import { ProfileAvatarController } from "./profile-avatar.controller";
import { UploadsService } from "./uploads.service";
import { R2Service } from "./r2.service";
import { AuthModule } from "../auth/auth.module";
import { SupabaseModule } from "../supabase/supabase.module";

@Module({
  imports: [AuthModule, SupabaseModule],
  controllers: [UploadsController, ProfileAvatarController],
  providers: [UploadsService, R2Service],
})
export class UploadsModule {}
