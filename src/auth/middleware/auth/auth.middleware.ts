import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from 'src/utils/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    const token = authorization?.split(' ')[1];

    if (!token)
      throw new HttpException('No Aithorization token', HttpStatus.BAD_REQUEST);
    try {
      const decoded = verifyToken(token);
      req['user'] = decoded;
      next();
    } catch (error) {
      throw new HttpException(
        'Invalid token: Unauthorized user',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
