import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { PlayerRepository } from '@/domain/repositories';
import Player from '@/domain/player/player';
import {
  buildRegisterResponse,
  toPlayerDto,
} from './response/response.builder';
import { PlayerDto } from './response/types';
import { IsAuthenticatedGuard } from '../auth/guards/is-authenticated/is-authenticated.guard';

@Controller('/players')
export class PlayerController {
  constructor(
    @Inject('PlayerRepository')
    private readonly playerRepository: PlayerRepository,
  ) {}

  @Post()
  @UseGuards(IsAuthenticatedGuard)
  register(@Body() { playerName }: { playerName: string }): any {
    const player = this.playerRepository.register(playerName);
    return buildRegisterResponse(toPlayerDto(player));
  }

  @Get('/self')
  @UseGuards(IsAuthenticatedGuard)
  getPlayer(@Req() request: Request): PlayerDto {
    const player: Player = request.user as Player;
    return toPlayerDto(player);
  }
}
