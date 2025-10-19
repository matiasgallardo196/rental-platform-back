import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard";

@Controller("messages")
@UseGuards(SupabaseAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  getForBooking(
    @Query("userId") userId?: string,
    @Query("bookingId") bookingId?: string
  ) {
    return this.messagesService.getForBooking(userId, bookingId);
  }
}
