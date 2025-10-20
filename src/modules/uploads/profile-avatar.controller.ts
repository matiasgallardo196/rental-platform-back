import { Body, Controller, Post, UseGuards, Req } from "@nestjs/common";
import type { Request } from "express";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard";
import { Inject } from "@nestjs/common";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ADMIN } from "../supabase/supabase.module";
import { R2Service } from "./r2.service";

@Controller("profile/avatar")
@UseGuards(SupabaseAuthGuard)
export class ProfileAvatarController {
  constructor(
    @Inject(SUPABASE_ADMIN) private readonly supabase: SupabaseClient,
    private readonly r2: R2Service
  ) {}

  @Post("confirm")
  async confirm(@Body() body: { key: string }, @Req() req: Request) {
    const user = (req as any).user;
    const newKey = body?.key;
    if (!newKey) throw new Error("Falta key");

    // Leer oldKey
    const { data: profile, error: readErr } = await this.supabase
      .from("profiles")
      .select("avatar_key")
      .eq("id", user.id)
      .maybeSingle();
    if (readErr) throw readErr;

    const oldKey = (profile as any)?.avatar_key as string | null;
    const newUrl = this.r2.buildPublicUrl(newKey);

    const { error: updateErr } = await this.supabase
      .from("profiles")
      .update({ avatar_key: newKey, avatar_url: newUrl })
      .eq("id", user.id);
    if (updateErr) throw updateErr;

    if (oldKey && oldKey !== newKey) {
      try {
        await this.r2.delete(oldKey);
      } catch (e) {
        // no romper confirm
        // eslint-disable-next-line no-console
        console.warn("[avatar-confirm] delete oldKey failed", e);
      }
    }

    return { ok: true, publicUrl: newUrl };
  }
}
