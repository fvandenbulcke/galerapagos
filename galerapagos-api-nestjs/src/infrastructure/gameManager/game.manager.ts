import { UUID } from 'crypto';
import { GameRepository } from '@/domain/repositories';
import { Game, Player, GamePlayer, TurnAction } from '@/domain/models';

export class GameManager {
  private gameRepository: GameRepository;

  constructor(gameRepository: GameRepository) {
    this.gameRepository = gameRepository;
  }

  getAll(): Game[] {
    return this.gameRepository.getAll();
  }

  getById(gameId: UUID): Game {
    return this.gameRepository.getById(gameId);
  }

  create(player: Player): Game {
    return this.gameRepository.create(player);
  }

  join(player: Player, gameId: UUID): Game {
    const game: Game = this.getById(gameId);
    return game.isJoinedBy(player);
  }

  leave(player: Player, gameId: UUID): Game {
    const game: Game = this.getById(gameId);
    game.isLeftByPlayer(player.id);

    const atLeastAPlayerIsNotMangedBySystem = game.players.some(
      (gamePlayer: GamePlayer) => !gamePlayer.isManagedBySystem,
    );

    if (!atLeastAPlayerIsNotMangedBySystem) {
      this.gameRepository.deleteById(gameId);
      return null;
    }
    return game;
  }

  start(gameId: UUID): Game {
    const game: Game = this.getById(gameId);
    return game.start();
  }

  selectAction(gameId: UUID, player: Player, action: TurnAction) {
    const game: Game = this.getById(gameId);
    return game.selectAction(player, action);
  }

  gainRessource(gameId: UUID, player: Player, quantity: number) {
    const game: Game = this.getById(gameId);
    return game.gainRessource(player, quantity);
  }
}
