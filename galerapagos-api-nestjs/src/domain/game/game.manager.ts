import { UUID } from 'crypto';
import { PlayerRepository } from '../player/player.repository';
import { GameRepository } from './repository/game.repository';
import Player from '../player/player';
import Game from './game';

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

  getById(gameId: UUID): Game {
    return this.gameRepository.getById(gameId);
  }

  #playerJoinAGame(player: Player, game: Game): Game {
    game.add(player);
    return game;
  }

  create(playerId: UUID): Game {
    const player: Player = this.playerRepository.get(playerId);
    const game: Game = this.gameRepository.create();
    return this.#playerJoinAGame(player, game);
  }

  join(playerId: UUID, gameId: UUID): Game {
    const player: Player = this.playerRepository.get(playerId);
    const game: Game = this.getById(gameId);
    return this.#playerJoinAGame(player, game);
  }

  start(gameId: UUID): Game {
    const game: Game = this.getById(gameId);
    game.start();
    return game;
  }
}
