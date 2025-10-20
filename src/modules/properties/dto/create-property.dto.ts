import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

class LocationDto {
  @ApiProperty({ example: "Barcelona" })
  @IsString()
  @IsNotEmpty()
  city!: string;

  @ApiProperty({ example: "Cataluña" })
  @IsString()
  @IsNotEmpty()
  state!: string;

  @ApiProperty({ example: "España" })
  @IsString()
  @IsNotEmpty()
  country!: string;

  @ApiPropertyOptional({ example: "Carrer de Mallorca 401" })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: "08013" })
  @IsOptional()
  @IsString()
  zipCode?: string;
}

class PricingDto {
  @ApiProperty({ example: 120, minimum: 0 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  basePrice!: number;
}

class CapacityDto {
  @ApiProperty({ example: 4, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  guests!: number;

  @ApiProperty({ example: 2, minimum: 0 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  bedrooms!: number;
}

export class CreatePropertyDto {
  @ApiProperty({ example: "Acogedor apartamento cerca de la playa" })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  location!: LocationDto;

  @ApiProperty({ type: [String], example: ["/img1.jpg", "/img2.jpg"] })
  @IsArray()
  @IsString({ each: true })
  images!: string[];

  @ApiProperty({ type: PricingDto })
  @ValidateNested()
  @Type(() => PricingDto)
  pricing!: PricingDto;

  @ApiProperty({ type: CapacityDto })
  @ValidateNested()
  @Type(() => CapacityDto)
  capacity!: CapacityDto;
}
