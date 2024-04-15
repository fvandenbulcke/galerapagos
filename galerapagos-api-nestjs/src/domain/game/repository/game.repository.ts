import { UUID } from 'crypto';
import Game from '../game';

export interface GameRepository {
  getAll(): Game[];

  create(): Game;

  getById(gameId: UUID): Game;
}
