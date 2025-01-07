import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { PlayerRepository } from '@/domain/repositories';
import Player from '@/domain/player/player';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('PlayerRepository')
    private readonly playerRepository: PlayerRepository,
  ) {
    super();
  }

  validate(request: Request): Player {
    return (
      (request.user as Player) ||
      this.playerRepository.register(request.body.userName)
    );
  }
}
