import { GameManager } from '@/domain/gameManager/game.manager';
import { GameRepository, PlayerRepository } from '@/domain/repositories';
import { InMemoryGameRepository } from 'src/infrastructure/repository/inMemory.game.repository';
import { InMemoryPlayerRepository } from 'src/infrastructure/repository/inMemory.player.repository';

export const gameRepositry: GameRepository = new InMemoryGameRepository();
export const playerRepository: PlayerRepository =
  new InMemoryPlayerRepository();
export const gameManager: GameManager = new GameManager(gameRepositry);
