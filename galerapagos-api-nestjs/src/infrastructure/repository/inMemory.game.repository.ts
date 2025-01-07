import { randomUUID, UUID } from 'crypto';
import { Game, Player } from '@/domain/models';
import { GameRepository } from '@/domain/repositories';

const game1 = Game.create(new Player(randomUUID(), 'playerName1a'));
game1.isJoinedBy(new Player(randomUUID(), 'playerName1b'));
const game2 = Game.create(new Player(randomUUID(), 'playerName2a'));
game2.isJoinedBy(new Player(randomUUID(), 'playerName2b'));
const game3 = Game.create(new Player(randomUUID(), 'playerName3a'));
game3.isJoinedBy(new Player(randomUUID(), 'playerName3b'));

let games = [game1, game2, game3, game1, game2, game3] as Game[];

export class InMemoryGameRepository implements GameRepository {
  getAll(): Game[] {
    return games;
  }

  create(player: Player): Game {
    const game = Game.create(player);
    games.push(game);
    return game1;
  }

  getById(gameId: UUID): Game {
    // games.find(({ id }) => id === gameId);
    return game1; // games.find(({ id }) => id === gameId);
  }

  deleteById(gameId: UUID): void {
    games = games.filter(({ id }) => id !== gameId);
  }
}
