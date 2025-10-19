import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { HostsService } from "./hosts.service";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard";
import { RoleGuard } from "../auth/role.guard";

@Controller("hosts")
@UseGuards(SupabaseAuthGuard)
export class HostsController {
  constructor(private readonly hostsService: HostsService) {}

  @Get(":hostId/properties")
  @UseGuards(new RoleGuard(["host", "admin"]))
  getProperties(@Param("hostId") hostId: string) {
    return this.hostsService.getProperties(hostId);
  }

  @Get(":hostId/bookings")
  @UseGuards(new RoleGuard(["host", "admin"]))
  getBookings(@Param("hostId") hostId: string) {
    return this.hostsService.getBookings(hostId);
  }

  @Get(":hostId/balances")
  @UseGuards(new RoleGuard(["host", "admin"]))
  getBalances(@Param("hostId") hostId: string) {
    return this.hostsService.getBalances(hostId);
  }

  @Get(":hostId/messages")
  @UseGuards(new RoleGuard(["host", "admin"]))
  getMessages(@Param("hostId") hostId: string) {
    return this.hostsService.getMessages(hostId);
  }

  @Get(":hostId/messages/:bookingId")
  @UseGuards(new RoleGuard(["host", "admin"]))
  getMessageThread(
    @Param("hostId") hostId: string,
    @Param("bookingId") bookingId: string
  ) {
    return this.hostsService.getMessageThread(hostId, bookingId);
  }

  @Post(":hostId/messages/:bookingId")
  @UseGuards(new RoleGuard(["host", "admin"]))
  sendMessage(
    @Param("hostId") hostId: string,
    @Param("bookingId") bookingId: string,
    @Body() body: { text: string; toUserId: string }
  ) {
    return this.hostsService.sendMessage(hostId, bookingId, body);
  }

  @Patch(":hostId/messages/:bookingId/read")
  @UseGuards(new RoleGuard(["host", "admin"]))
  markRead(
    @Param("hostId") hostId: string,
    @Param("bookingId") bookingId: string
  ) {
    return this.hostsService.markThreadRead(hostId, bookingId);
  }

  @Patch(":hostId/messages/read")
  @UseGuards(new RoleGuard(["host", "admin"]))
  markReadBulk(
    @Param("hostId") hostId: string,
    @Body() body: { bookingIds: string[] }
  ) {
    return this.hostsService.markThreadsRead(hostId, body.bookingIds || []);
  }

  @Patch(":hostId/messages/:bookingId/unread")
  @UseGuards(new RoleGuard(["host", "admin"]))
  markUnread(
    @Param("hostId") hostId: string,
    @Param("bookingId") bookingId: string
  ) {
    return this.hostsService.markThreadUnread(hostId, bookingId);
  }

  @Patch(":hostId/messages/unread")
  @UseGuards(new RoleGuard(["host", "admin"]))
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
