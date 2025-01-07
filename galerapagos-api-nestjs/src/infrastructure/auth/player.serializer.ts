import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UUID } from 'crypto';
import Player from '@/domain/player/player';
import { PlayerRepository } from '@/domain/repositories';

@Injectable()
export class PlayerSerializer extends PassportSerializer {
  constructor(
    @Inject('PlayerRepository')
    private readonly playerRepository: PlayerRepository,
  ) {
    super();
  }

  serializeUser(user: Player, done: (param: string, user: string) => any) {
    done(null, user.id);
  }

  deserializeUser(playerId: UUID, done: (param: string, user: Player) => any) {
    const player = this.playerRepository.get(playerId);

    let errorMessage = undefined;
    if (!player) {
      errorMessage = `Could not deserialize player: player with ${playerId} could not be found`;
    }

    done(errorMessage, player);
  }
}
