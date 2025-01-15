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
    game.isJoinedBy(player);
    return this.gameRepository.save(game);
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
    return this.gameRepository.save(game);
  }

  start(gameId: UUID): Game {
    const game: Game = this.getById(gameId);
    game.start();
    return this.gameRepository.save(game);
  }

  selectAction(gameId: UUID, player: Player, action: TurnAction): Game {
    const game: Game = this.getById(gameId);
    game.selectAction(player, action);
    return this.gameRepository.save(game);
  }

  gainRessource(gameId: UUID, player: Player, quantity: number): Game {
    let game: Game = this.getById(gameId);
    game.gainRessource(player, quantity);
    game = this.gameRepository.save(game);

    const { players, currentPlayer } = game.getState();
    let expectedPlayer = players.find(({ id }) => id === currentPlayer);

    while (expectedPlayer.isManagedBySystem) {
      this.#playAutomaticTurn(game, expectedPlayer);
      game = this.gameRepository.save(game);
      const { currentPlayer } = game.getState();
      expectedPlayer = players.find(({ id }) => id === currentPlayer);
    }

    return game;
  }

  #playAutomaticTurn(game: Game, player: GamePlayer) {
    game.selectAction(player, TurnAction.waterCollect);
    game.gainRessource(player, 2);
  }
}
