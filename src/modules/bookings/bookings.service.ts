import { Injectable } from "@nestjs/common";
import { bookings as allBookings, users, properties } from "../../mock/data";

const DEFAULT_BOOKINGS = {
  upcoming: [
    {
      id: "1",
      property: {
        id: "prop-1",
        name: "Modern Downtown Loft",
        image: "/modern-apartment-living.png",
        location: "New York, NY",
      },
      checkIn: "2025-02-15",
      checkOut: "2025-02-20",
      guests: 2,
      status: "confirmed",
      total: 750,
    },
  ],
  past: [
    {
      id: "2",
      property: {
        id: "prop-2",
        name: "Cozy Beach House",
        image: "/placeholder.svg?height=200&width=300",
        location: "Miami, FL",
      },
      checkIn: "2024-12-10",
      checkOut: "2024-12-15",
      guests: 4,
      status: "completed",
      total: 1200,
      hasReview: false,
    },
  ],
};

const MOCK_BOOKINGS: Record<string, { upcoming: any[]; past: any[] }> = {
  "mock-host": DEFAULT_BOOKINGS,
};

@Injectable()
export class BookingsService {
  list(userId?: string) {
    if (!userId) return DEFAULT_BOOKINGS;
    const user = users.find((u) => u.id === userId);
    if (!user) return DEFAULT_BOOKINGS;
    if (user.role !== "guest") {
      return { upcoming: [], past: [] };
    }
    const now = new Date();
    const guestBookings = allBookings.filter((b) => b.guestId === userId);
    const mapProp = (b: any) => {
      const p = properties.find((pp) => pp.id === b.propertyId);
      return {
        id: b.id,
        property: {
          id: p?.id,
          name: p?.title,
          image: p?.images?.[0] || "/placeholder.svg",
          location: `${p?.location.city}, ${p?.location.state}`,
        },
        checkIn: b.checkIn,
        checkOut: b.checkOut,
        guests: b.guests,
        status: b.status,
        total: b.total,
      };
    };
    const upcoming = guestBookings
      .filter((b) => new Date(b.checkIn) >= now)
      .map(mapProp);
    const past = guestBookings
      .filter((b) => new Date(b.checkIn) < now)
      .map(mapProp);
    return { upcoming, past };
  }
}
