import { Controller, Get, Query } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("overview")
  overview() {
    return this.adminService.getOverview();
  }

  @Get("messages")
  messages(@Query("userId") userId?: string) {
    return this.adminService.getMessages(userId);
  }
}
