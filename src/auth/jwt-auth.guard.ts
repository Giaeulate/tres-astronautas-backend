import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly reflect: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = this.reflect.get('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    if (!authHeader) throw new HttpException('No Autorizado', 403);
    return true;
  }
}
