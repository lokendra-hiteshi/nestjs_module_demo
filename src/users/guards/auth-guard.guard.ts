import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '../services/users/users.service';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const userEmail = request?.user?.email;

    if (!userEmail) {
      return false;
    }

    const user = await this.usersService.fetchUserByEmail(userEmail);

    if (!user) {
      return false;
    }

    request.user = user;
    return true;
  }
}
