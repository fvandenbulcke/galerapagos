import Player from 'src/domain/player/player';
import { PlayerRepository } from 'src/domain/player/player.repository';

const players = [] as Player[];

export class InMemoryPlayerRepository implements PlayerRepository {
  register(): Player {
    const player = new Player('florian');
    players.push(player);
    return player;
  }

  get(uuid: string): Player {
    return players.find(({ id }) => id === uuid);
  }
}
