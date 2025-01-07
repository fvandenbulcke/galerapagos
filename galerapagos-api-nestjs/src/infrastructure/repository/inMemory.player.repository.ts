import { randomUUID } from 'crypto';
import { Player } from '@/domain/models';
import { PlayerRepository } from '@/domain/repositories';

const players = [] as Player[];

export class InMemoryPlayerRepository implements PlayerRepository {
  register(playerName: string): Player {
    const player = new Player(randomUUID(), playerName);
    players.push(player);
    return player;
  }

  get(uuid: string): Player {
    return players.find(({ id }) => id === uuid);
  }
}
