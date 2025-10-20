import { Injectable } from "@nestjs/common";
import { users, bookings, properties, messages } from "../../mocks/data";

@Injectable()
export class AdminService {
  getOverview() {
    const totals = {
      users: users.length,
      guests: users.filter((u) => u.role === "guest").length,
      hosts: users.filter((u) => u.role === "host").length,
      admins: users.filter((u) => u.role === "admin").length,
      properties: properties.length,
      bookings: bookings.length,
      messages: messages.length,
    };
    return totals;
  }

  getMessages(userId?: string) {
    const list = userId
      ? messages.filter((m) => m.toUserId === userId || m.fromUserId === userId)
      : messages;
    return { messages: list };
  }
}
