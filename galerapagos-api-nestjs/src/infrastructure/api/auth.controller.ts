import {
  Controller,
  Get,
  InternalServerErrorException,
  MessageEvent,
  Post,
  Req,
  Session,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Session as ExpressSession } from 'express-session';
import { LocalAuthGuard } from '../auth/guards/local-auth/local-auth.guard';
import { IsAuthenticatedGuard } from '../auth/guards/is-authenticated/is-authenticated.guard';
import paths from './routing/paths';
import { buildConnectResponse } from './response/response.builder';
import Player from '@/domain/player/player';
import { NotificationBroadCaster } from '../messaging/notification.broadcaster';
import { Observable } from 'rxjs';

@Controller()
export class AuthController {
  constructor(private notificationBroadCaster: NotificationBroadCaster) {}

  @Get()
  main(@Req() request: Request) {
    return buildConnectResponse(request.user as Player);
  }

  @Post(paths.login)
  @UseGuards(LocalAuthGuard)
  logIn() {}

  @Get(paths.connect)
  @Sse(paths.connect)
  @UseGuards(IsAuthenticatedGuard)
  connect(@Req() request: Request): Observable<MessageEvent> {
    const player: Player = request.user as Player;
    return this.notificationBroadCaster.register(player).asObservable();
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
