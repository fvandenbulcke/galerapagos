import { UUID } from 'crypto';
import Game from '../game';
import Player from '../../player/player';

export default interface GameRepository {
  getAll(): Game[];

  create(player: Player): Game;

  getById(gameId: UUID): Game;

  deleteById(gameId: UUID): void;

  save(game: Game): Game;
}
