import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('canActivate');
    try {
      await super.canActivate(context);
      console.log('canActivate');
      const request = context.switchToHttp().getRequest() as Request;

      console.log('canActivate');
      await super.logIn(request);

      console.log('return canActivate');
      return true;
    } catch (error) {
      console.error(error);
    }
  }
}
