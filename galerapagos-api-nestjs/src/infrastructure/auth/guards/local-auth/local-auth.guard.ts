import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('custom') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('canActivate:');
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest() as Request;

    await super.logIn(request);

    return true;
  }
}
