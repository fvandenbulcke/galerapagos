import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { GameManager } from '@/infrastructure/gameManager/game.manager';
import { PlayerRepository } from '@/domain/repositories';
import { Game, Player } from '@/domain/models';

import {
  buildGameListResponse,
  buildGameResponse,
} from './response/response.builder';
import { UUID } from 'crypto';
import { IsAuthenticatedGuard } from '../auth/guards/is-authenticated/is-authenticated.guard';

@Controller('/games')
export class GameController {
  constructor(
    @Inject('PlayerRepository')
    private readonly playerRepository: PlayerRepository,
    private readonly gameManager: GameManager,
  ) {}

  @Get()
  @UseGuards(IsAuthenticatedGuard)
  getAll(@Req() request: Request): Game[] {
    const player: Player = request.user as Player;
    return buildGameListResponse(player, this.gameManager.getAll());
  }

  @Get('/:gameId')
  @UseGuards(IsAuthenticatedGuard)
  getById(@Req() request: Request, @Param() params: any): Game {
    const player: Player = request.user as Player;
    return buildGameResponse(player)(this.gameManager.getById(params.gameId));
  }

  @Post()
  @UseGuards(IsAuthenticatedGuard)
  create(@Req() request: Request): Game {
    const player: Player = request.user as Player;
    const game: Game = this.gameManager.create(player);
    return buildGameResponse(player)(game);
  }

  @Put('/:gameId')
  @UseGuards(IsAuthenticatedGuard)
  join(@Req() request: Request, @Param() params: { gameId: UUID }): Game {
    const player: Player = request.user as Player;
    const game: Game = this.gameManager.join(player, params.gameId);
    return buildGameResponse(player)(game);
  }

  @Put('/:gameId/start')
  @UseGuards(IsAuthenticatedGuard)
  start(@Req() request: Request, @Param() params: { gameId: UUID }): Game {
    const player: Player = request.user as Player;
    const game: Game = this.gameManager.start(params.gameId);
    return buildGameResponse(player)(game);
  }
}
