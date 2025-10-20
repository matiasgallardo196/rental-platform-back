import { Injectable } from "@nestjs/common";
import { R2Service } from "./r2.service";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

@Injectable()
export class UploadsService {
  constructor(private readonly r2: R2Service) {}

  validate(contentType: string, size: number) {
    if (!ALLOWED.has(contentType)) {
      throw new Error("Tipo de archivo no permitido");
    }
    if (!Number.isFinite(size) || size <= 0 || size > MAX_BYTES) {
      throw new Error("Archivo demasiado grande");
    }
  }

  mimeToExt(mime: string) {
    switch (mime) {
      case "image/jpeg":
        return "jpg";
      case "image/png":
        return "png";
      case "image/webp":
        return "webp";
      case "image/avif":
        return "avif";
      default:
        return "bin";
    }
  }

  generateKey(userId: string, ext: string) {
    const ts = Date.now();
    const rand = Math.random().toString(16).slice(2, 10);
    return `avatars/${userId}/${ts}-${rand}.${ext}`;
  }

  async presign(userId: string, contentType: string, size: number) {
    this.validate(contentType, size);
    const key = this.generateKey(userId, this.mimeToExt(contentType));
    const url = await this.r2.presignPut(key, contentType);
    const publicUrl = this.r2.buildPublicUrl(key);
    return { url, key, publicUrl };
  }
}
