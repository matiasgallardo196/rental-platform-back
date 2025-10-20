import { Type } from "class-transformer";
import {
  IsInt,
  IsOptional,
  IsString,
  IsDateString,
  Min,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class ListPropertiesDto {
  @ApiPropertyOptional({
    example: "beach",
    description: "Texto para buscar por título",
  })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiPropertyOptional({
    example: "Barcelona",
    description: "Ciudad/estado para filtrar",
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 50, minimum: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ example: 300, minimum: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ example: 2, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  guests?: number;

  @ApiPropertyOptional({ example: 2, minimum: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  bedrooms?: number;

  @ApiPropertyOptional({ example: "2025-08-01" })
  @IsOptional()
  @IsDateString()
  checkIn?: string; // yyyy-mm-dd

  @ApiPropertyOptional({ example: "2025-08-07" })
  @IsOptional()
  @IsDateString()
  checkOut?: string; // yyyy-mm-dd

  @ApiPropertyOptional({ example: 1, minimum: 1, default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ example: 12, minimum: 1, default: 12 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 12;
}
