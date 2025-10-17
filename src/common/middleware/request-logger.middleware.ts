import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import type { Request, Response, NextFunction } from "express";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, originalUrl } = req;

    res.on("finish", () => {
      const durationMs = Date.now() - start;
      const statusCode = res.statusCode;
      const userAgent = req.get("user-agent") || "-";
      Logger.log(
        `${method} ${originalUrl} ${statusCode} ${durationMs}ms ua:${userAgent}`,
        "HTTP"
      );
    });

    next();
  }
}
