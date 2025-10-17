import { Controller, Get, Query } from "@nestjs/common";
import { MessagesService } from "./messages.service";

@Controller("messages")
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
