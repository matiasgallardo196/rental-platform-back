import { Controller, Get, Param, Post, Body, Query } from "@nestjs/common";
import { PropertiesService } from "./properties.service";

@Controller("properties")
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  list(
    @Query("query") query?: string,
    @Query("location") location?: string,
    @Query("minPrice") minPrice?: string,
    @Query("maxPrice") maxPrice?: string,
    @Query("guests") guests?: string,
    @Query("bedrooms") bedrooms?: string,
    @Query("checkIn") checkIn?: string,
    @Query("checkOut") checkOut?: string,
    @Query("page") page = "1",
    @Query("limit") limit = "12"
  ) {
    return this.propertiesService.list({
      query,
      location,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      guests: guests ? Number(guests) : undefined,
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      checkIn,
      checkOut,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.propertiesService.get(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.propertiesService.create(payload);
  }
}
