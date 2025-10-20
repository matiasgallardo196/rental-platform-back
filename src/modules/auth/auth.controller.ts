import { Body, Controller, GoneException, Post } from "@nestjs/common";
import { Public } from "./public.decorator";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  @Post("register")
  @Public()
  register(@Body() _body: unknown) {
    throw new GoneException("Use Supabase auth from the frontend");
  }

  @Post("forgot-password")
  @Public()
  forgotPassword(@Body() _body: { email: string }) {
    throw new GoneException("Use Supabase password reset from the frontend");
  }

  @Post("login")
  @Public()
  login(@Body() _body: { email: string; password: string }) {
    throw new GoneException("Use Supabase login from the frontend");
  }
}
