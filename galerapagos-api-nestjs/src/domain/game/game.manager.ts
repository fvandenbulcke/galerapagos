import { UUID } from 'crypto';
import { PlayerRepository } from '../player/player.repository';
import { GameRepository } from './game.repository';
import Player from '../player/player';
import { Game } from './game';

export class GameManager {
  private gameRepository: GameRepository;
  private playerRepository: PlayerRepository;

  constructor(
    gameRepository: GameRepository,
    playerRepository: PlayerRepository,
  ) {
    this.gameRepository = gameRepository;
    this.playerRepository = playerRepository;
  }

  getAll(): Game[] {
    return this.gameRepository.getAll();
  }

  create(playerId: UUID): Game {
    const player: Player = this.playerRepository.get(playerId);
    const game: Game = this.gameRepository.create();
    player.join(game);
    return game;
  }

  join(playerId: UUID, gameId: UUID): Game {
    const player: Player = this.playerRepository.get(playerId);
    const game: Game = this.gameRepository.getById(gameId);
    player.join(game);
    return game;
  }
}
