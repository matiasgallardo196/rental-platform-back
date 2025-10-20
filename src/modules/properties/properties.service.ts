import { Injectable, NotFoundException } from "@nestjs/common";
import {
  properties as mockProperties,
  users,
  bookings as mockBookings,
} from "../../mocks/data";

import { ListPropertiesDto } from "./dto/list-properties.dto";

@Injectable()
export class PropertiesService {
  private get properties() {
    return mockProperties.map((p) => {
      const host = users.find((u) => u.id === p.hostId);
      return {
        id: p.id,
        title: p.title,
        location: {
          city: p.location.city,
          state: p.location.state,
          country: p.location.country,
          address: p.location.address || "",
          zipCode: p.location.zipCode || "",
        },
        images: p.images,
        pricing: p.pricing,
        capacity: p.capacity,
        rating: 4.8,
        reviewCount: 124,
        propertyType: "Apartment",
        amenities: ["wifi", "kitchen", "parking"],
        description: "Beautiful property.",
        host: {
          id: host?.id || "host-unknown",
          name: host?.name || "Host",
          avatar: "/placeholder.svg",
        },
      };
    });
  }

  list(params: ListPropertiesDto) {
    let filtered = [...this.properties];

    if (params.query) {
      const q = params.query.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (params.location) {
      const loc = params.location.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.location.city.toLowerCase().includes(loc) ||
          p.location.state.toLowerCase().includes(loc)
      );
    }

    if (params.minPrice !== undefined) {
      filtered = filtered.filter(
        (p) => p.pricing.basePrice >= params.minPrice!
      );
    }
    if (params.maxPrice !== undefined) {
      filtered = filtered.filter(
        (p) => p.pricing.basePrice <= params.maxPrice!
      );
    }
    if (params.guests !== undefined) {
      filtered = filtered.filter((p) => p.capacity.guests >= params.guests!);
    }
    if (params.bedrooms !== undefined) {
      filtered = filtered.filter(
        (p) => p.capacity.bedrooms >= params.bedrooms!
      );
    }

    // Date availability filtering: exclude properties with overlapping bookings
    if (params.checkIn && params.checkOut) {
      const reqStart = new Date(params.checkIn);
      const reqEnd = new Date(params.checkOut);
      const validRange =
        !isNaN(reqStart.getTime()) &&
        !isNaN(reqEnd.getTime()) &&
        reqStart < reqEnd;

      if (validRange) {
        filtered = filtered.filter((p) => {
          const propBookings = mockBookings.filter(
            (b) => b.propertyId === p.id && b.status !== "cancelled"
          );
          const hasOverlap = propBookings.some((b) => {
            const bStart = new Date(b.checkIn);
            const bEnd = new Date(b.checkOut);
            // Overlap if requestedStart < bookingEnd AND requestedEnd > bookingStart
            return reqStart < bEnd && reqEnd > bStart;
          });
          return !hasOverlap;
        });
      }
    }

    const totalResults = filtered.length;
    const totalPages = Math.ceil(totalResults / params.limit);
    const start = (params.page - 1) * params.limit;
    const paginated = filtered.slice(start, start + params.limit);

    return {
      properties: paginated,
      pagination: { currentPage: params.page, totalPages, totalResults },
    };
  }

  get(id: string) {
    const found = this.properties.find((p) => p.id === id);
    if (!found) throw new NotFoundException("Property not found");
    return found;
  }

  create(payload: any) {
    const id = (this.properties.length + 1).toString();
    const created = { id, ...payload };
    this.properties.push(created);
    return created;
  }
}
