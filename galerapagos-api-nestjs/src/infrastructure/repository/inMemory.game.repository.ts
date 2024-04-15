import { UUID } from 'crypto';
import Game from 'src/domain/game/game';
import { GameRepository } from '@/domain/game/repository/game.repository';

const games = [] as Game[];

export class InMemoryGameRepository implements GameRepository {
  getAll(): Game[] {
    return games;
  }

  create(): Game {
    const game = Game.create();
    games.push(game);
    return game;
  }

  getById(gameId: UUID): Game {
    return games.find(({ id }) => id === gameId);
  }
}
