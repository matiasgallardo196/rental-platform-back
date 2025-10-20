export type Role = "guest" | "host" | "admin";

export interface User {
  id: string;
  role: Role;
  email: string;
  password: string;
  name: string;
  avatar?: string;
}

export interface Property {
  id: string;
  hostId: string;
  title: string;
  images: string[];
  location: {
    city: string;
    state: string;
    country: string;
    address?: string;
    zipCode?: string;
  };
  pricing: { basePrice: number; cleaningFee?: number; taxRate?: number };
  capacity: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  rating?: number;
  reviewCount?: number;
}

export interface Booking {
  id: string;
  guestId: string;
  hostId: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: "confirmed" | "completed" | "cancelled";
  total: number;
}

export interface Message {
  id: string;
  bookingId: string;
  fromUserId: string;
  toUserId: string;
  text: string;
  at: string;
  readBy?: string[]; // userIds who have read this message
}

export interface Balance {
  hostId: string;
  available: number;
  pending: number;
  lastPayoutAt?: string;
}

export const users: User[] = [
  // Guests (3)
  {
    id: "guest-1",
    role: "guest",
    email: "guest1@example.com",
    password: "1234567",
    name: "Invitado Uno",
  },
  {
    id: "guest-2",
    role: "guest",
    email: "guest2@example.com",
    password: "1234567",
    name: "Invitado Dos",
  },
  {
    id: "guest-3",
    role: "guest",
    email: "guest3@example.com",
    password: "1234567",
    name: "Invitado Tres",
  },
  // Hosts (2)
  {
    id: "host-1",
    role: "host",
    email: "host1@example.com",
    password: "1234567",
    name: "Anfitrión Uno",
  },
  {
    id: "host-2",
    role: "host",
    email: "host2@example.com",
    password: "1234567",
    name: "Anfitrión Dos",
  },
  // Admin (1)
  {
    id: "admin-1",
    role: "admin",
    email: "admin@dfg.cv",
    password: "1234567",
    name: "Usuario Administrador",
  },
];

export const properties: Property[] = [
  {
    id: "prop-1",
    hostId: "host-1",
    title: "Loft moderno en el centro",
    images: ["/modern-apartment-living.png"],
    location: { city: "Montevideo", state: "Montevideo", country: "Uruguay" },
    pricing: { basePrice: 150, cleaningFee: 50, taxRate: 10 },
    capacity: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: "prop-2",
    hostId: "host-2",
    title: "Acogedora casa de playa",
    images: ["/secluded-beach-house.png"],
    location: {
      city: "Punta del Este",
      state: "Maldonado",
      country: "Uruguay",
    },
    pricing: { basePrice: 200, cleaningFee: 60, taxRate: 10 },
    capacity: { guests: 4, bedrooms: 2, beds: 3, bathrooms: 2 },
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: "prop-3",
    hostId: "host-1",
    title: "Amplia casa suburbana",
    images: ["/spacious-suburban-home.png"],
    location: {
      city: "Colonia del Sacramento",
      state: "Colonia",
      country: "Uruguay",
    },
    pricing: { basePrice: 220, cleaningFee: 70, taxRate: 10 },
    capacity: { guests: 6, bedrooms: 3, beds: 4, bathrooms: 2 },
    rating: 4.7,
    reviewCount: 42,
  },
  {
    id: "prop-4",
    hostId: "host-2",
    title: "Cabaña de montaña",
    images: ["/mountain-cabin-retreat.png"],
    location: { city: "Piriápolis", state: "Maldonado", country: "Uruguay" },
    pricing: { basePrice: 180, cleaningFee: 50, taxRate: 10 },
    capacity: { guests: 4, bedrooms: 2, beds: 3, bathrooms: 1 },
    rating: 4.5,
    reviewCount: 33,
  },
];

export const bookings: Booking[] = [
  {
    id: "b-1",
    guestId: "guest-1",
    hostId: "host-1",
    propertyId: "prop-1",
    checkIn: "2025-02-15",
    checkOut: "2025-02-20",
    guests: 2,
    status: "confirmed",
    total: 750,
  },
  {
    id: "b-2",
    guestId: "guest-1",
    hostId: "host-2",
    propertyId: "prop-2",
    checkIn: "2024-12-10",
    checkOut: "2024-12-15",
    guests: 4,
    status: "completed",
    total: 1200,
  },
  // Additional bookings for other guests
  {
    id: "b-3",
    guestId: "guest-2",
    hostId: "host-1",
    propertyId: "prop-1",
    checkIn: "2025-03-05",
    checkOut: "2025-03-10",
    guests: 2,
    status: "confirmed",
    total: 900,
  },
  {
    id: "b-4",
    guestId: "guest-3",
    hostId: "host-2",
    propertyId: "prop-2",
    checkIn: "2025-01-22",
    checkOut: "2025-01-25",
    guests: 1,
    status: "confirmed",
    total: 600,
  },
  {
    id: "b-5",
    guestId: "guest-2",
    hostId: "host-1",
    propertyId: "prop-3",
    checkIn: "2025-04-02",
    checkOut: "2025-04-06",
    guests: 3,
    status: "confirmed",
    total: 1100,
  },
  {
    id: "b-6",
    guestId: "guest-3",
    hostId: "host-2",
    propertyId: "prop-4",
    checkIn: "2025-02-10",
    checkOut: "2025-02-13",
    guests: 2,
    status: "confirmed",
    total: 540,
  },
];

export const messages: Message[] = [
  {
    id: "m1",
    bookingId: "b-1",
    fromUserId: "host-1",
    toUserId: "guest-1",
    text: "¡Hola! Será un gusto hospedarte.",
    at: "2025-01-10T10:00:00Z",
    readBy: [],
  },
  {
    id: "m2",
    bookingId: "b-1",
    fromUserId: "guest-1",
    toUserId: "host-1",
    text: "¡Gracias! Nos vemos pronto.",
    at: "2025-01-10T10:05:00Z",
    readBy: [],
  },
  {
    id: "m3",
    bookingId: "b-2",
    fromUserId: "admin-1",
    toUserId: "guest-1",
    text: "Soporte aquí, ¿algún inconveniente?",
    at: "2024-12-11T11:00:00Z",
    readBy: [],
  },
  // Extra messages for host-1 with real guest (guest-1) on booking b-1
  {
    id: "m4",
    bookingId: "b-1",
    fromUserId: "guest-1",
    toUserId: "host-1",
    text: "¿Podríamos coordinar un check-in temprano cerca de la 1pm?",
    at: "2025-01-12T09:30:00Z",
    readBy: [],
  },
  {
    id: "m5",
    bookingId: "b-1",
    fromUserId: "guest-1",
    toUserId: "host-1",
    text: "Además, ¿hay estacionamiento cercano?",
    at: "2025-01-12T09:32:00Z",
    readBy: [],
  },
  // Messages for guest-2 with host-1 on booking b-3
  {
    id: "m6",
    bookingId: "b-3",
    fromUserId: "guest-2",
    toUserId: "host-1",
    text: "¡Hola! ¿Puedo llevar un perro pequeño?",
    at: "2025-02-20T08:15:00Z",
    readBy: [],
  },
  {
    id: "m7",
    bookingId: "b-3",
    fromUserId: "host-1",
    toUserId: "guest-2",
    text: "Sí, se permiten mascotas con una pequeña tarifa.",
    at: "2025-02-20T08:20:00Z",
    readBy: [],
  },
  // Messages for guest-3 with host-2 on booking b-4
  {
    id: "m8",
    bookingId: "b-4",
    fromUserId: "guest-3",
    toUserId: "host-2",
    text: "¿Tienen check-in tarde? Llego a las 23:00.",
    at: "2025-01-15T19:40:00Z",
    readBy: [],
  },
  {
    id: "m9",
    bookingId: "b-4",
    fromUserId: "host-2",
    toUserId: "guest-3",
    text: "Sí, hay self check-in disponible.",
    at: "2025-01-15T19:45:00Z",
    readBy: [],
  },
];

export const balances: Balance[] = [
  {
    hostId: "host-1",
    available: 1600,
    pending: 500,
    lastPayoutAt: "2025-01-05T00:00:00Z",
  },
  {
    hostId: "host-2",
    available: 1300,
    pending: 250,
    lastPayoutAt: "2025-01-02T00:00:00Z",
  },
];

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}
