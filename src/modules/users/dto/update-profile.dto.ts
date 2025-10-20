import { IsOptional, IsString, IsUrl } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: "Juan Pérez" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: "https://example.com/avatar.png" })
  @IsOptional()
  @IsUrl()
  avatar_url?: string;

  @ApiPropertyOptional({ example: "Anfitrión apasionado por el mar" })
  @IsOptional()
  @IsString()
  bio?: string;
}
