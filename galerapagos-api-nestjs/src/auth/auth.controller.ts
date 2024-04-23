import {
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Session as ExpressSession } from 'express-session';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { IsAuthenticatedGuard } from './guards/is-authenticated/is-authenticated.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() request: any) {
    console.log('request');
    return request.user; /* the user we are returning in our local strategy's validate method */
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get('/session')
  someMethod(@Session() session: ExpressSession) {
    return session;
  }

  @UseGuards(IsAuthenticatedGuard)
  @Post('logout')
  async logout(@Req() request: Request) {
    const logoutError = await new Promise((resolve) =>
      request.logOut({ keepSessionInfo: false }, (error) => resolve(error)),
    );

    if (logoutError) {
      console.error(logoutError);

      throw new InternalServerErrorException('Could not log out user');
    }

    return {
      logout: true,
    };
  }

  @Get('protected')
  protected() {
    return {
      message: 'This route is protected against unauthenticated users!',
    };
  }
}
