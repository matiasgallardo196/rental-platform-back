import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard";

@Controller("bookings")
@UseGuards(SupabaseAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  list(@Query("userId") userId?: string) {
    return this.bookingsService.list(userId);
  }
}
