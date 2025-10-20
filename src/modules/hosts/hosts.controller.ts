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
import { Roles } from "../auth/roles.decorator";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ErrorResponseDto } from "../../common/dto/error-response.dto";

@ApiTags("hosts")
@ApiBearerAuth()
@Controller("hosts")
@UseGuards(SupabaseAuthGuard)
export class HostsController {
  constructor(private readonly hostsService: HostsService) {}

  @Get(":hostId/properties")
  @ApiOkResponse({ description: "Propiedades del host" })
  @ApiBadRequestResponse({
    description: "Parámetros inválidos",
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Token inválido o ausente",
    type: ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    description: "Rol insuficiente",
    type: ErrorResponseDto,
  })
  @ApiTooManyRequestsResponse({
    description: "Too many requests",
    type: ErrorResponseDto,
  })
  @Roles("host", "admin")
  getProperties(@Param("hostId") hostId: string) {
    return this.hostsService.getProperties(hostId);
  }

  @Get(":hostId/bookings")
  @ApiOkResponse({ description: "Reservas del host" })
  @ApiBadRequestResponse({
    description: "Parámetros inválidos",
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Token inválido o ausente",
    type: ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    description: "Rol insuficiente",
    type: ErrorResponseDto,
  })
  @ApiTooManyRequestsResponse({
    description: "Too many requests",
    type: ErrorResponseDto,
  })
  @Roles("host", "admin")
  getBookings(@Param("hostId") hostId: string) {
    return this.hostsService.getBookings(hostId);
  }

  @Get(":hostId/balances")
  @ApiOkResponse({ description: "Balances del host" })
  @ApiBadRequestResponse({
    description: "Parámetros inválidos",
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Token inválido o ausente",
    type: ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    description: "Rol insuficiente",
    type: ErrorResponseDto,
  })
  @ApiTooManyRequestsResponse({
    description: "Too many requests",
    type: ErrorResponseDto,
  })
  @Roles("host", "admin")
  getBalances(@Param("hostId") hostId: string) {
    return this.hostsService.getBalances(hostId);
  }

  @Get(":hostId/messages")
  @ApiOkResponse({ description: "Mensajes del host" })
  @ApiBadRequestResponse({
    description: "Parámetros inválidos",
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Token inválido o ausente",
    type: ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    description: "Rol insuficiente",
    type: ErrorResponseDto,
  })
  @ApiTooManyRequestsResponse({
    description: "Too many requests",
    type: ErrorResponseDto,
  })
  @Roles("host", "admin")
  getMessages(@Param("hostId") hostId: string) {
    return this.hostsService.getMessages(hostId);
  }

  @Get(":hostId/messages/:bookingId")
  @ApiOkResponse({ description: "Hilo de mensajes" })
  @ApiBadRequestResponse({
    description: "Parámetros inválidos",
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Token inválido o ausente",
    type: ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    description: "Rol insuficiente",
    type: ErrorResponseDto,
  })
  @ApiTooManyRequestsResponse({
    description: "Too many requests",
    type: ErrorResponseDto,
  })
  @Roles("host", "admin")
  getMessageThread(
    @Param("hostId") hostId: string,
    @Param("bookingId") bookingId: string
  ) {
    return this.hostsService.getMessageThread(hostId, bookingId);
  }

  @Post(":hostId/messages/:bookingId")
  @ApiOkResponse({ description: "Mensaje enviado" })
  @ApiBadRequestResponse({
    description: "Payload inválido",
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Token inválido o ausente",
    type: ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    description: "Rol insuficiente",
    type: ErrorResponseDto,
  })
  @ApiTooManyRequestsResponse({
    description: "Too many requests",
    type: ErrorResponseDto,
  })
  @Roles("host", "admin")
  sendMessage(
    @Param("hostId") hostId: string,
    @Param("bookingId") bookingId: string,
    @Body() body: { text: string; toUserId: string }
  ) {
    return this.hostsService.sendMessage(hostId, bookingId, body);
  }

  @Patch(":hostId/messages/:bookingId/read")
  @ApiOkResponse({ description: "Hilo marcado como leído" })
  @ApiBadRequestResponse({
    description: "Parámetros inválidos",
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Token inválido o ausente",
    type: ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    description: "Rol insuficiente",
    type: ErrorResponseDto,
  })
  @ApiTooManyRequestsResponse({
    description: "Too many requests",
    type: ErrorResponseDto,
  })
  @Roles("host", "admin")
  markRead(
    @Param("hostId") hostId: string,
    @Param("bookingId") bookingId: string
  ) {
    return this.hostsService.markThreadRead(hostId, bookingId);
  }

  @Patch(":hostId/messages/read")
  @ApiOkResponse({ description: "Hilos marcados como leídos" })
  @ApiBadRequestResponse({
    description: "Parámetros inválidos",
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Token inválido o ausente",
    type: ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    description: "Rol insuficiente",
    type: ErrorResponseDto,
  })
  @ApiTooManyRequestsResponse({
    description: "Too many requests",
    type: ErrorResponseDto,
  })
  @Roles("host", "admin")
  markReadBulk(
    @Param("hostId") hostId: string,
    @Body() body: { bookingIds: string[] }
  ) {
    return this.hostsService.markThreadsRead(hostId, body.bookingIds || []);
  }

  @Patch(":hostId/messages/:bookingId/unread")
  @ApiOkResponse({ description: "Hilo marcado como no leído" })
  @ApiBadRequestResponse({
    description: "Parámetros inválidos",
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Token inválido o ausente",
    type: ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    description: "Rol insuficiente",
    type: ErrorResponseDto,
  })
  @ApiTooManyRequestsResponse({
    description: "Too many requests",
    type: ErrorResponseDto,
  })
  @Roles("host", "admin")
  markUnread(
    @Param("hostId") hostId: string,
    @Param("bookingId") bookingId: string
  ) {
    return this.hostsService.markThreadUnread(hostId, bookingId);
  }

  @Patch(":hostId/messages/unread")
  @ApiOkResponse({ description: "Hilos marcados como no leídos" })
  @ApiBadRequestResponse({
    description: "Parámetros inválidos",
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Token inválido o ausente",
    type: ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    description: "Rol insuficiente",
    type: ErrorResponseDto,
  })
  @ApiTooManyRequestsResponse({
    description: "Too many requests",
    type: ErrorResponseDto,
  })
  @Roles("host", "admin")
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
