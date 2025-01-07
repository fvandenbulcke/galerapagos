import { UUID } from 'crypto';
import {
  GamePlayer,
  GameStateInfo,
  Ressource,
  PlayerTurn,
} from '@/domain/models';

export default class GameStateDto {
  id: UUID;
  players: GamePlayer[];
  ressources: Ressource;
  currentPlayer?: UUID;
  currentPlayerTurn?: PlayerTurn;

  private constructor(
    id: UUID,
    players: GamePlayer[],
    ressources: Ressource,
    currentPlayer?: UUID,
    currentPlayerTurn?: PlayerTurn,
  ) {
    this.id = id;
    this.players = players;
    this.ressources = ressources;
    this.currentPlayer = currentPlayer;
    this.currentPlayerTurn = currentPlayerTurn;
  }

  public static from(gameState: GameStateInfo): GameStateDto {
    return new GameStateDto(
      gameState.id,
      gameState.players,
      gameState.ressources,
      gameState.currentPlayer,
      gameState.currentPlayerTurn,
    );
  }
}
