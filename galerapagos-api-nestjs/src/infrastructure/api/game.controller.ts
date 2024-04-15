import { Controller, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { GameManager } from 'src/domain/game/game.manager';
import { PlayerRepository } from 'src/domain/player/player.repository';
import Player from 'src/domain/player/player';
import Game from 'src/domain/game/game';
import {
  buildGameListResponse,
  buildGameResponse,
} from './response/response.builder';

@Controller('/game')
export class GameController {
  constructor(
    @Inject('PlayerRepository')
    private readonly playerRepository: PlayerRepository,
    private readonly gameManager: GameManager,
  ) {}

  @Get(':uuid')
  getAll(@Param() params: any): Game[] {
    const player: Player = this.playerRepository.get(params.uuid);
    return buildGameListResponse(player, this.gameManager.getAll());
  }

  @Get('/:gameId/:uuid')
  getById(@Param() params: any): Game {
    const player: Player = this.playerRepository.get(params.uuid);
    return buildGameResponse(player)(this.gameManager.getById(params.gameId));
  }

  @Post(':uuid')
  create(@Param() params: any): Game {
    const player: Player = this.playerRepository.get(params.uuid);
    const game: Game = this.gameManager.create(params.uuid);
    return buildGameResponse(player)(game);
  }

  @Put('/:gameId/:uuid')
  join(@Param() params: any): Game {
    const player: Player = this.playerRepository.get(params.uuid);
    const game: Game = this.gameManager.join(params.uuid, params.gameId);
    return buildGameResponse(player)(game);
  }

  @Put('/:gameId/start/:uuid')
  start(@Param() params: any): Game {
    const player: Player = this.playerRepository.get(params.uuid);
    const game: Game = this.gameManager.start(params.gameId);
    return buildGameResponse(player)(game);
  }
}
