import { Controller, Get, Param, Post, Body, Query } from "@nestjs/common";
import { PropertiesService } from "./properties.service";
import { ListPropertiesDto } from "./dto/list-properties.dto";
import { CreatePropertyDto } from "./dto/create-property.dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ErrorResponseDto } from "../../common/dto/error-response.dto";
import { Public } from "../auth/public.decorator";

@ApiTags("properties")
@Controller("properties")
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Public()
  @Get()
  @ApiOkResponse({
    description: "Listado paginado de propiedades",
    schema: {
      example: {
        properties: [
          {
            id: "1",
            title: "Acogedor apartamento",
            location: {
              city: "Barcelona",
              state: "Cataluña",
              country: "España",
              address: "",
              zipCode: "",
            },
            images: ["/img1.jpg"],
            pricing: { basePrice: 120 },
            capacity: { guests: 4, bedrooms: 2 },
            rating: 4.8,
            reviewCount: 124,
            propertyType: "Apartment",
            amenities: ["wifi", "kitchen", "parking"],
            description: "Beautiful property.",
            host: { id: "host-1", name: "Host", avatar: "/placeholder.svg" },
          },
        ],
        pagination: { currentPage: 1, totalPages: 10, totalResults: 120 },
      },
    },
  })
  @ApiBadRequestResponse({
    description: "Parámetros inválidos",
    type: ErrorResponseDto,
  })
  @ApiTooManyRequestsResponse({
    description: "Too many requests",
    type: ErrorResponseDto,
  })
  list(@Query() query: ListPropertiesDto) {
    return this.propertiesService.list(query);
  }

  @Public()
  @Get(":id")
  @ApiOkResponse({
    description: "Detalle de propiedad",
    schema: {
      example: {
        id: "1",
        title: "Acogedor apartamento",
        location: {
          city: "Barcelona",
          state: "Cataluña",
          country: "España",
          address: "",
          zipCode: "",
        },
        images: ["/img1.jpg"],
        pricing: { basePrice: 120 },
        capacity: { guests: 4, bedrooms: 2 },
        rating: 4.8,
        reviewCount: 124,
        propertyType: "Apartment",
        amenities: ["wifi", "kitchen", "parking"],
        description: "Beautiful property.",
        host: { id: "host-1", name: "Host", avatar: "/placeholder.svg" },
      },
    },
  })
  @ApiNotFoundResponse({ description: "No encontrado", type: ErrorResponseDto })
  @ApiBadRequestResponse({ description: "ID inválido", type: ErrorResponseDto })
  @ApiTooManyRequestsResponse({
    description: "Too many requests",
    type: ErrorResponseDto,
  })
  get(@Param("id") id: string) {
    return this.propertiesService.get(id);
  }

  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({
    description: "Propiedad creada (mock)",
    schema: {
      example: {
        id: "25",
        title: "Nueva propiedad",
        location: { city: "Madrid", state: "Madrid", country: "España" },
        images: ["/img1.jpg"],
        pricing: { basePrice: 100 },
        capacity: { guests: 2, bedrooms: 1 },
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
  create(@Body() payload: CreatePropertyDto) {
    return this.propertiesService.create(payload);
  }
}
