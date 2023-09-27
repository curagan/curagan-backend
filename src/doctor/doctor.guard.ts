import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('auth1');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env['JWT_KEY'],
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('auth2');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    const [scheme, token] = authHeader ? authHeader.split(' ') : [];

    return scheme === 'Bearer' ? token : undefined;
  }
}

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('author1');
    }
    // try {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env['JWT_KEY'],
    });
    console.log(payload);
    if (payload.sub !== request.params.id) {
      throw new UnauthorizedException('Not Yours');
    }
    console.log(payload);
    request['user'] = payload;
    // } catch {
    //   throw new UnauthorizedException('author2');
    // }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    const [scheme, token] = authHeader ? authHeader.split(' ') : [];

    return scheme === 'Bearer' ? token : undefined;
  }
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the roles allowed for the current route or method
    const allowedRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!allowedRoles) {
      // If no roles are specified, allow access by default
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user && user.role && allowedRoles.includes(user.role)) {
      return true; // User has either 'doctor' or 'patient' role
    }

    throw new ForbiddenException('You are not allowed to modify the data!');
  }
}
