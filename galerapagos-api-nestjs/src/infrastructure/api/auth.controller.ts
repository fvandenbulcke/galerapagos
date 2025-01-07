import {
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Session as ExpressSession } from 'express-session';
import { LocalAuthGuard } from '../auth/guards/local-auth/local-auth.guard';
import { IsAuthenticatedGuard } from '../auth/guards/is-authenticated/is-authenticated.guard';
import paths from './routing/paths';
import { buildConnectResponse } from './response/response.builder';
import Player from '@/domain/player/player';

@Controller()
export class AuthController {
  @Get()
  connect(@Req() request: Request) {
    return buildConnectResponse(request.user as Player);
  }

  @Post(paths.login)
  @UseGuards(LocalAuthGuard)
  login(@Req() request: Request) {
    return buildConnectResponse(request.user as Player);
  }

  @Get(paths.session)
  @UseGuards(IsAuthenticatedGuard)
  someMethod(@Session() session: ExpressSession, @Req() request: Request) {
    return {
      ...session,
      user: request.user,
    };
  }

  @Get('/session-2')
  someMethod2(@Session() session: ExpressSession, @Req() request: Request) {
    return {
      ...session,
      user: request.user,
    };
  }

  @Post(paths.logout)
  @UseGuards(IsAuthenticatedGuard)
  async logout(@Req() request: Request) {
    const logoutError = await new Promise((resolve) =>
      request.logOut({ keepSessionInfo: false }, (error) => resolve(error)),
    );

    if (logoutError) {
      throw new InternalServerErrorException('Could not log out user');
    }

    return {
      logout: true,
    };
  }
}
