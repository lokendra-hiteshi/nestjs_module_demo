import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    const token = authorization?.split(' ')[1];

    if (!token)
      throw new HttpException('No Aithorization token', HttpStatus.BAD_REQUEST);
    else if (token === 'loken') next();
    else
      throw new HttpException(
        'Invalid token: Unauthorized user',
        HttpStatus.BAD_REQUEST,
      );
  }
}
