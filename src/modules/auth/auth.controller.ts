import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { findUserByEmail, users } from "../../mock/data";

@Controller("auth")
export class AuthController {
  @Post("register")
  register(@Body() body: { name: string; email: string; password: string }) {
    const exists = findUserByEmail(body.email);
    if (exists) {
      throw new HttpException(
        { message: "Email already exists" },
        HttpStatus.CONFLICT
      );
    }
    const newUser = {
      id: `guest-${Math.random().toString(36).slice(2, 8)}`,
      role: "guest" as const,
      email: body.email,
      password: body.password,
      name: body.name,
    };
    users.push(newUser as any);
    return {
      message: "User registered (mock)",
      userId: newUser.id,
      email: newUser.email,
    };
  }

  @Post("forgot-password")
  forgotPassword(@Body() body: { email: string }) {
    return { message: "Reset email sent (mock)", email: body.email };
  }

  @Post("login")
  login(@Body() body: { email: string; password: string }) {
    const { email, password } = body || ({} as any);
    if (!email || !password) {
      throw new HttpException(
        { message: "Missing credentials" },
        HttpStatus.BAD_REQUEST
      );
    }

    const existing = findUserByEmail(email);
    if (existing) {
      if (existing.password !== password) {
        throw new HttpException(
          { message: "Invalid credentials" },
          HttpStatus.UNAUTHORIZED
        );
      }
      const { id, role, name } = existing;
      return { user: { id, email, name, role }, token: "mock-token" };
    }

    throw new HttpException(
      { message: "Invalid credentials" },
      HttpStatus.UNAUTHORIZED
    );
  }
}
