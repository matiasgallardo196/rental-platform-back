import { Body, Controller, GoneException, Post } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  @Post("register")
  register(@Body() _body: unknown) {
    throw new GoneException("Use Supabase auth from the frontend");
  }

  @Post("forgot-password")
  forgotPassword(@Body() _body: { email: string }) {
    throw new GoneException("Use Supabase password reset from the frontend");
  }

  @Post("login")
  login(@Body() _body: { email: string; password: string }) {
    throw new GoneException("Use Supabase login from the frontend");
  }
}
