import { GameManager } from 'src/domain/game/game.manager';
import { GameRepository } from '@/domain/game/repository/game.repository';
import { PlayerRepository } from 'src/domain/player/player.repository';
import { InMemoryGameRepository } from 'src/infrastructure/repository/inMemory.game.repository';
import { InMemoryPlayerRepository } from 'src/infrastructure/repository/inMemory.player.repository';

export const gameRepositry: GameRepository = new InMemoryGameRepository();
export const playerRepository: PlayerRepository =
  new InMemoryPlayerRepository();
export const gameManager: GameManager = new GameManager(
  gameRepositry,
  playerRepository,
);
