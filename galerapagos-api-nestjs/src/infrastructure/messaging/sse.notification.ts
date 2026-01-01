import {
  Controller,
  Get,
  Inject,
  MessageEvent,
  Post,
  Query,
  Req,
  Res,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { map, Observable } from 'rxjs';
import { GameRepository } from '../../domain/repositories';
import { NotificationBroadCaster } from './notification.broadcaster';
import { randomUUID } from 'crypto';
import paths from '../api/routing/paths';
import { Player } from '../../domain/models';
import { IsAuthenticatedGuard } from '../auth/guards/is-authenticated/is-authenticated.guard';

/**
 * https://javascript.plainenglish.io/how-to-use-server-side-events-with-nestjs-to-create-a-simple-notification-system-3b7041861aad
 * https://medium.com/using-nestjs-sse-for-updating-front-end
 * https://medium.com/using-nestjs-sse-for-updating-front-end/backend-implementation-cedd3801c210
 */
@Controller()
export class NotificationController {
  constructor(
    @Inject('gameRepository') private gameRepository: GameRepository,
    private notificationBroadCaster: NotificationBroadCaster,
  ) {}

  @Get(paths.connect)
  @Sse(paths.connect)
  @UseGuards(IsAuthenticatedGuard)
  connect(@Req() request: Request): Observable<MessageEvent> {
    const player: Player = request.user as Player;
    return this.notificationBroadCaster.register(player, null).asObservable();
  }

  @Get()
  index(@Res() response: Response) {
    response
      .type('text/html')
      .send(readFileSync('./src/index.html').toString());
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    const game = this.gameRepository.getById(randomUUID());
    const player = game.players[0];
    return this.notificationBroadCaster.register(player, null).asObservable();
  }

  @Post('produce')
  produce(@Query('player') player): void {
    const game = this.gameRepository.getById(randomUUID());
    this.notificationBroadCaster.broadCastGameState(game);
  }
}
