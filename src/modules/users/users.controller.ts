import { Body, Controller, Patch } from "@nestjs/common";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ErrorResponseDto } from "../../common/dto/error-response.dto";

@ApiTags("users")
@Controller("users")
export class UsersController {
  @Patch("profile")
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "Perfil actualizado (mock)",
    schema: {
      example: {
        message: "Profile updated (mock)",
        profile: {
          name: "Juan Pérez",
          avatar_url: "https://example.com/a.png",
          bio: "Anfitrión...",
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: "Token inválido o ausente",
    type: ErrorResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Payload inválido",
    type: ErrorResponseDto,
  })
  @ApiTooManyRequestsResponse({
    description: "Too many requests",
    type: ErrorResponseDto,
  })
  updateProfile(@Body() body: UpdateProfileDto) {
    return { message: "Profile updated (mock)", profile: body };
  }
}
