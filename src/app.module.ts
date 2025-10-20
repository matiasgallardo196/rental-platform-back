import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { PropertiesModule } from "./modules/properties/properties.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { RequestLoggerMiddleware } from "./common/middleware/request-logger.middleware";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { MessagesModule } from "./modules/messages/messages.module";
import { HostsModule } from "./modules/hosts/hosts.module";
import { AdminModule } from "./modules/admin/admin.module";
import { UploadsModule } from "./modules/uploads/uploads.module";
import { SupabaseModule } from "./modules/supabase/supabase.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3001),
        SUPABASE_URL: Joi.string().uri().required(),
        SUPABASE_SERVICE_ROLE_KEY: Joi.string().required(),
      }),
    }),
    ThrottlerModule.forRoot([{ ttl: 60, limit: 20 }]),
    PropertiesModule,
    AuthModule, // still needed to export SupabaseAuthGuard globally
    UsersModule,
    BookingsModule,
    MessagesModule,
    HostsModule,
    AdminModule,
    SupabaseModule,
    UploadsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
  }
}
