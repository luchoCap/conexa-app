import {
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { EnvironmentsService } from '../services/env.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly envService: EnvironmentsService) {}
  use(req: Request, res: Response, next: NextFunction) {
    let authToken;
    //esta comparacion es hecha debido a las cookies en swagger con nest
    if (req.headers.authorization) {
      authToken = req.headers.authorization
        .split(' ')
        .slice(1, 2)
        .join() as string;
    } else {
      authToken = req.cookies.token as string;
    }

    if (!authToken) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json(new UnauthorizedException().getResponse());
    }

    const decoded = verify(authToken, this.envService.jwtSecret);

    if (!decoded) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json(new UnauthorizedException().getResponse());
    }

    next();
  }
}
