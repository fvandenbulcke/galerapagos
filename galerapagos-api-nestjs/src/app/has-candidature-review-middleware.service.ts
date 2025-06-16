import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class HasCandidatureReviewMiddlewareService implements NestMiddleware {
  async use(req: Request, _res: Response, next: NextFunction) {
    console.log('Candidature review middleware triggered');
    throw new HttpException('oups it failed', HttpStatus.NOT_FOUND);
    next();
  }
}
