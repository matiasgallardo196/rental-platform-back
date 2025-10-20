import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { Request } from "express";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Inject } from "@nestjs/common";
import { SUPABASE_ADMIN } from "../supabase/supabase.module";
import { IS_PUBLIC_KEY } from "./constants";

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(
    @Inject(SUPABASE_ADMIN) private readonly supabase: SupabaseClient,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers["authorization"] || "";
    const startsWith = (authHeader as string)
      .toLowerCase()
      .startsWith("bearer ");
    const token = startsWith ? (authHeader as string).slice(7) : "";

    if (!token) throw new UnauthorizedException("No token provided");

    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser(token);

    if (error || !user) throw new UnauthorizedException("Invalid token");

    (req as any).user = user;
    return true;
  }
}
