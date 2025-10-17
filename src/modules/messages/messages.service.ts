import { Injectable } from "@nestjs/common";
import { messages as allMessages, bookings, users } from "../../mock/data";

@Injectable()
export class MessagesService {
  getForBooking(userId?: string, bookingId?: string) {
    if (!userId) {
      return {
        bookingId: "booking-1",
        hostName: "Sarah Johnson",
        messages: [],
      };
    }
    const user = users.find((u) => u.id === userId);
    if (!user)
      return {
        bookingId: "booking-1",
        hostName: "Sarah Johnson",
        messages: [],
      };
    if (user.role !== "guest")
      return {
        bookingId: bookingId || "booking-1",
        hostName: "",
        messages: [],
      };
    const b = bookingId
      ? bookings.find((bb) => bb.id === bookingId)
      : bookings.find((bb) => bb.guestId === userId);
    if (!b) return { bookingId: bookingId || "", hostName: "", messages: [] };
    const host = users.find((u) => u.id === b.hostId);
    const conv = allMessages.filter((m) => m.bookingId === b.id);
    return {
      bookingId: b.id,
      hostName: host?.name || "Host",
      messages: conv.map((m) => ({
        id: m.id,
        from: m.fromUserId === userId ? "guest" : "host",
        text: m.text,
        at: m.at,
      })),
    };
  }
}
