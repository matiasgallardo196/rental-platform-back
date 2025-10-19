import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard";
import { RoleGuard } from "../auth/role.guard";

@Controller("admin")
@UseGuards(SupabaseAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("overview")
  @UseGuards(new RoleGuard(["admin"]))
  overview() {
    return this.adminService.getOverview();
  }

  @Get("messages")
  @UseGuards(new RoleGuard(["admin"]))
  messages(@Query("userId") userId?: string) {
    return this.adminService.getMessages(userId);
  }
}
