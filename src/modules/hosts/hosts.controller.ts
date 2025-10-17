import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { HostsService } from "./hosts.service";

@Controller("hosts")
export class HostsController {
  constructor(private readonly hostsService: HostsService) {}

  @Get(":hostId/properties")
  getProperties(@Param("hostId") hostId: string) {
    return this.hostsService.getProperties(hostId);
  }

  @Get(":hostId/bookings")
  getBookings(@Param("hostId") hostId: string) {
    return this.hostsService.getBookings(hostId);
  }

  @Get(":hostId/balances")
  getBalances(@Param("hostId") hostId: string) {
    return this.hostsService.getBalances(hostId);
  }

  @Get(":hostId/messages")
  getMessages(@Param("hostId") hostId: string) {
    return this.hostsService.getMessages(hostId);
  }

  @Get(":hostId/messages/:bookingId")
  getMessageThread(
    @Param("hostId") hostId: string,
    @Param("bookingId") bookingId: string
  ) {
    return this.hostsService.getMessageThread(hostId, bookingId);
  }

  @Post(":hostId/messages/:bookingId")
  sendMessage(
    @Param("hostId") hostId: string,
    @Param("bookingId") bookingId: string,
    @Body() body: { text: string; toUserId: string }
  ) {
    return this.hostsService.sendMessage(hostId, bookingId, body);
  }

  @Patch(":hostId/messages/:bookingId/read")
  markRead(
    @Param("hostId") hostId: string,
    @Param("bookingId") bookingId: string
  ) {
    return this.hostsService.markThreadRead(hostId, bookingId);
  }

  @Patch(":hostId/messages/read")
  markReadBulk(
    @Param("hostId") hostId: string,
    @Body() body: { bookingIds: string[] }
  ) {
    return this.hostsService.markThreadsRead(hostId, body.bookingIds || []);
  }

  @Patch(":hostId/messages/:bookingId/unread")
  markUnread(
    @Param("hostId") hostId: string,
    @Param("bookingId") bookingId: string
  ) {
    return this.hostsService.markThreadUnread(hostId, bookingId);
  }

  @Patch(":hostId/messages/unread")
  markUnreadBulk(
    @Param("hostId") hostId: string,
    @Body() body: { bookingIds: string[] }
  ) {
    return this.hostsService.markThreadsUnread(hostId, body.bookingIds || []);
  }

  @Get(":hostId/overview")
  getOverview(@Param("hostId") hostId: string) {
    return this.hostsService.getOverview(hostId);
  }
}
