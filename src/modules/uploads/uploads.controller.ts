import { Body, Controller, Post, UseGuards, Req } from "@nestjs/common";
import type { Request } from "express";
import { UploadsService } from "./uploads.service";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard";

@Controller("uploads/avatar")
@UseGuards(SupabaseAuthGuard)
export class UploadsController {
  constructor(private readonly uploads: UploadsService) {}

  @Post("presign")
  async presign(
    @Body() body: { contentType: string; size: number },
    @Req() req: Request
  ) {
    const userId = (req as any).user?.id as string;
    const { contentType, size } = body || ({} as any);
    if (!contentType || typeof size !== "number") {
      throw new Error("Parámetros inválidos");
    }
    return this.uploads.presign(userId, contentType, size);
  }
}
