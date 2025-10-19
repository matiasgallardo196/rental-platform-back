import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly allowed: string[]) {}

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<any>();
    const role = req.user?.user_metadata?.role;
    if (!this.allowed.includes(role)) {
      throw new ForbiddenException("Insufficient role");
    }
    return true;
  }
}
