import { Body, Controller, Patch } from "@nestjs/common";

@Controller("users")
export class UsersController {
  @Patch("profile")
  updateProfile(@Body() body: any) {
    return { message: "Profile updated (mock)", profile: body };
  }
}
