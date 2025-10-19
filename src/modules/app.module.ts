import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
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
    PropertiesModule,
    AuthModule,
    UsersModule,
    BookingsModule,
    MessagesModule,
    HostsModule,
    AdminModule,
    SupabaseModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
  }
}
