import { Injectable } from "@nestjs/common";
import {
  properties,
  bookings,
  balances,
  users,
  messages,
} from "../../mocks/data";

const hostReadByBooking: Record<string, Set<string>> = {};

@Injectable()
export class HostsService {
  getProperties(hostId: string) {
    const host = users.find((u) => u.id === hostId && u.role === "host");
    if (!host) return { properties: [] };
    const props = properties
      .filter((p) => p.hostId === hostId)
      .map((p) => ({
        id: p.id,
        title: p.title,
        images: p.images,
        location: `${p.location.city}, ${p.location.state}`,
        pricing: p.pricing,
      }));
    return { properties: props };
  }

  getBookings(hostId: string) {
    const host = users.find((u) => u.id === hostId && u.role === "host");
    if (!host) return { upcoming: [], past: [] };
    const now = new Date();
    const hostBookings = bookings.filter((b) => b.hostId === hostId);
    const mapItem = (b: any) => ({
      id: b.id,
      guestId: b.guestId,
      propertyId: b.propertyId,
      checkIn: b.checkIn,
      checkOut: b.checkOut,
      guests: b.guests,
      status: b.status,
      total: b.total,
    });
    const upcoming = hostBookings
      .filter((b) => new Date(b.checkIn) >= now)
      .map(mapItem);
    const past = hostBookings
      .filter((b) => new Date(b.checkIn) < now)
      .map(mapItem);
    return { upcoming, past };
  }

  getBalances(hostId: string) {
    const b = balances.find((bb) => bb.hostId === hostId);
    return b || { hostId, available: 0, pending: 0 };
  }

  getMessages(hostId: string) {
    const host = users.find((u) => u.id === hostId && u.role === "host");
    if (!host) return { conversations: [] };
    // Gather messages where host is either sender or recipient
    const hostMsgs = messages.filter(
      (m) => m.fromUserId === hostId || m.toUserId === hostId
    );
    // Group by bookingId for simple conversation threads
    const byBooking: Record<string, any[]> = {};
    for (const m of hostMsgs) {
      if (!byBooking[m.bookingId]) byBooking[m.bookingId] = [];
      byBooking[m.bookingId].push(m);
    }
    const conversations = Object.entries(byBooking)
      .map(([bookingId, msgs]) => {
        const lastAt = msgs[msgs.length - 1]?.at;
        const markedRead = hostReadByBooking[hostId]?.has(bookingId) ?? false;
        const unreadCount = markedRead
          ? 0
          : msgs.filter((m) => m.toUserId === hostId).length;
        const booking = bookings.find((b) => b.id === bookingId);
        const prop = booking
          ? properties.find((p) => p.id === booking.propertyId)
          : undefined;
        return {
          bookingId,
          count: msgs.length,
          lastAt,
          unreadCount,
          propertyId: booking?.propertyId,
          propertyTitle: prop?.title,
          messages: msgs,
        };
      })
      .sort(
        (a: any, b: any) =>
          new Date(b.lastAt).getTime() - new Date(a.lastAt).getTime()
      );
    return { conversations };
  }

  getMessageThread(hostId: string, bookingId: string) {
    const host = users.find((u) => u.id === hostId && u.role === "host");
    if (!host) return { bookingId, messages: [] };
    const thread = messages.filter(
      (m) =>
        m.bookingId === bookingId &&
        (m.fromUserId === hostId || m.toUserId === hostId)
    );
    return { bookingId, messages: thread };
  }

  sendMessage(
    hostId: string,
    bookingId: string,
    body: { text: string; toUserId: string }
  ) {
    const host = users.find((u) => u.id === hostId && u.role === "host");
    if (!host) return { success: false };
    const newMsg = {
      id: `m-${Date.now()}`,
      bookingId,
      fromUserId: hostId,
      toUserId: body.toUserId,
      text: body.text,
      at: new Date().toISOString(),
    } as any;
    messages.push(newMsg);
    return { success: true, message: newMsg };
  }

  markThreadRead(hostId: string, bookingId: string) {
    const host = users.find((u) => u.id === hostId && u.role === "host");
    if (!host) return { success: false };
    if (!hostReadByBooking[hostId]) hostReadByBooking[hostId] = new Set();
    hostReadByBooking[hostId].add(bookingId);
    // Also update message-level readBy for future DB parity
    for (const m of messages) {
      if (
        m.bookingId === bookingId &&
        (m.toUserId === hostId || m.fromUserId === hostId)
      ) {
        if (!m.readBy) m.readBy = [];
        if (!m.readBy.includes(hostId)) m.readBy.push(hostId);
      }
    }
    return { success: true };
  }

  markThreadsRead(hostId: string, bookingIds: string[]) {
    const host = users.find((u) => u.id === hostId && u.role === "host");
    if (!host) return { success: false };
    if (!hostReadByBooking[hostId]) hostReadByBooking[hostId] = new Set();
    bookingIds.forEach((id) => hostReadByBooking[hostId].add(id));
    for (const m of messages) {
      if (
        bookingIds.includes(m.bookingId) &&
        (m.toUserId === hostId || m.fromUserId === hostId)
      ) {
        if (!m.readBy) m.readBy = [];
        if (!m.readBy.includes(hostId)) m.readBy.push(hostId);
      }
    }
    return { success: true, count: bookingIds.length };
  }

  markThreadUnread(hostId: string, bookingId: string) {
    const host = users.find((u) => u.id === hostId && u.role === "host");
    if (!host) return { success: false };
    if (hostReadByBooking[hostId]) hostReadByBooking[hostId].delete(bookingId);
    for (const m of messages) {
      if (m.bookingId === bookingId && m.readBy) {
        m.readBy = m.readBy.filter((u) => u !== hostId);
      }
    }
    return { success: true };
  }

  markThreadsUnread(hostId: string, bookingIds: string[]) {
    const host = users.find((u) => u.id === hostId && u.role === "host");
    if (!host) return { success: false };
    if (hostReadByBooking[hostId]) {
      bookingIds.forEach((id) => hostReadByBooking[hostId].delete(id));
    }
    for (const m of messages) {
      if (bookingIds.includes(m.bookingId) && m.readBy) {
        m.readBy = m.readBy.filter((u) => u !== hostId);
      }
    }
    return { success: true, count: bookingIds.length };
  }

  getOverview(hostId: string) {
    const host = users.find((u) => u.id === hostId && u.role === "host");
    if (!host) return { summary: null };
    const hostProps = properties.filter((p) => p.hostId === hostId);
    const hostBookings = bookings.filter((b) => b.hostId === hostId);
    const balance = balances.find((b) => b.hostId === hostId);
    const totalNights = hostBookings.reduce((acc, b) => {
      const inD = new Date(b.checkIn).getTime();
      const outD = new Date(b.checkOut).getTime();
      return (
        acc + Math.max(0, Math.round((outD - inD) / (1000 * 60 * 60 * 24)))
      );
    }, 0);
    const revenue = hostBookings.reduce((acc, b) => acc + b.total, 0);
    const avgRating = hostProps.length
      ? (
          hostProps.reduce((acc, p) => acc + (p.rating || 0), 0) /
          hostProps.length
        ).toFixed(2)
      : "0";
    return {
      summary: {
        properties: hostProps.length,
        bookings: hostBookings.length,
        totalNights,
        revenue,
        averageRating: Number(avgRating),
        reviewCount: hostProps.reduce(
          (acc, p) => acc + (p.reviewCount || 0),
          0
        ),
        available: balance?.available ?? 0,
        pending: balance?.pending ?? 0,
      },
    };
  }
}
