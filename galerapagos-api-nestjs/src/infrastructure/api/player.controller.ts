import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { PlayerRepository } from 'src/domain/player/player.repository';
import { buildRegisterResponse, toPlayerDto } from './response/responseBuilder';
import { PlayerDto } from './response/types';

@Controller('/player')
export class PlayerController {
  constructor(
    @Inject('PlayerRepository')
    private readonly playerRepository: PlayerRepository,
  ) {}

  @Post()
  register(): any {
    const player = this.playerRepository.register();
    return buildRegisterResponse(toPlayerDto(player));
  }

  @Get(':uuid')
  getPlayer(@Param() params: any): PlayerDto {
    const player = this.playerRepository.get(params.uuid);
    return toPlayerDto(player);
  }
}
