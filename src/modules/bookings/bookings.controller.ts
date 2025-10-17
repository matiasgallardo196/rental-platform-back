import { Controller, Get, Query } from "@nestjs/common";
import { BookingsService } from "./bookings.service";

@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  list(@Query("userId") userId?: string) {
    return this.bookingsService.list(userId);
  }
}


