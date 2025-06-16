import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class MiddlewareController {
  @Get('candidature/reviews')
  middleware(@Req() request: Request) {
    return { hello: 'florian' };
  }
}
