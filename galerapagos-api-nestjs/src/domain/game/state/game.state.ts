import { Ressource, TurnAction } from '@/domain/configuration';
import Game, { GameStateInfo } from '../game';
import { PlayerTurn } from '../player.turn/player.turn';
import Player from '@/domain/player/player';
import { UUID } from 'crypto';

export abstract class GameState {
  protected _game: Game;
  protected _ressources: Ressource;

  constructor(game: Game) {
    this._game = game;
  }

  get ressources() {
    return this._ressources;
  }

  updateRessources(playerTurn: PlayerTurn) {
    if (playerTurn.hasWaterCollected()) {
      this._ressources.water += playerTurn.gain;
    } else if (playerTurn.hasWoodCollected()) {
      this._ressources.wood += playerTurn.gain;
    } else if (playerTurn.hasfichCatched()) {
      this._ressources.fish += playerTurn.gain;
    }
  }

  canBeJoined(): boolean {
    return false;
  }

  canBeStarted(): boolean {
    return false;
  }

  start(): void {
    throw new Error('Method not implemented.');
  }

  abstract onActionSelect(player: Player, action: TurnAction): void;
  abstract onRessourceGain(player: Player, quantity: number): void;
  abstract get currentPlayer(): UUID;

  getState(): GameStateInfo {
    return {
      players: this._game.players,
      ressources: this.ressources,
    };
  }
}
