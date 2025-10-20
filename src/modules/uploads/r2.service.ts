import { Injectable } from "@nestjs/common";
import {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class R2Service {
  private client: S3Client;
  private bucket: string;
  private publicBase: string;

  constructor() {
    const endpoint = process.env.R2_ENDPOINT!;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID!;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!;
    this.bucket = process.env.R2_BUCKET!;
    this.publicBase = process.env.R2_PUBLIC_BASE_URL!;
    if (!endpoint || !accessKeyId || !secretAccessKey || !this.bucket) {
      throw new Error("R2 env vars not configured");
    }
    this.client = new S3Client({
      region: "auto",
      endpoint,
      forcePathStyle: true,
      credentials: { accessKeyId, secretAccessKey },
    });
  }

  buildPublicUrl(key: string) {
    return `${this.publicBase}/${key}`;
  }

  async presignPut(key: string, contentType: string) {
    const cmd = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    });
    return getSignedUrl(this.client, cmd, { expiresIn: 60 });
  }

  async delete(key: string) {
    const cmd = new DeleteObjectCommand({ Bucket: this.bucket, Key: key });
    await this.client.send(cmd);
  }
}
