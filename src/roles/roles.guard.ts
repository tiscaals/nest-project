import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      // No roles defined, allow access
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (requiredRoles===decoded.role) {
      return true
    }
    throw new ForbiddenException('Lo bukan admin! Minggir doeloe')
  }
}
