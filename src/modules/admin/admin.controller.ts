import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
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

@ApiTags("admin")
@ApiBearerAuth()
@Controller("admin")
@UseGuards(SupabaseAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("overview")
  @ApiOkResponse({ description: "Resumen de métricas" })
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
  @Roles("admin")
  overview() {
    return this.adminService.getOverview();
  }

  @Get("messages")
  @ApiOkResponse({ description: "Mensajes filtrados por usuario (opcional)" })
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
  @Roles("admin")
  messages(@Query("userId") userId?: string) {
    return this.adminService.getMessages(userId);
  }
}
