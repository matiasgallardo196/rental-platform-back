import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { PropertiesModule } from "./properties/properties.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { RequestLoggerMiddleware } from "../common/middleware/request-logger.middleware";
import { BookingsModule } from "./bookings/bookings.module";
import { MessagesModule } from "./messages/messages.module";
import { HostsModule } from "./hosts/hosts.module";
import { AdminModule } from "./admin/admin.module";
import { SupabaseModule } from "../supabase/supabase.module";

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60, limit: 20 }]),
    PropertiesModule,
    AuthModule, // still needed to export SupabaseAuthGuard globally
    UsersModule,
    BookingsModule,
    MessagesModule,
    HostsModule,
    AdminModule,
    SupabaseModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
  }
}
