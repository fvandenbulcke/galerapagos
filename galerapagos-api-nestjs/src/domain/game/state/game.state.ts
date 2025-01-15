import { UUID } from 'crypto';
import { Ressource, TurnAction } from '@/domain/configuration';
import Player from '@/domain/player/player';
import PlayerTurn from '@/domain/game/player.turn/player.turn';

export type StateInfo = {
  canBeStarted: boolean;
  isStarted: boolean;
  ressources?: Ressource;
  currentPlayer?: UUID;
  currentPlayerTurn?: PlayerTurn;
};

export abstract class GameState {
  protected _ressources: Ressource;

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

  isStarted(): boolean {
    return true;
  }

  start(): void {
    throw new Error('Method not implemented.');
  }

  abstract onActionSelect(player: Player, action: TurnAction): void;
  abstract onRessourceGain(player: Player, quantity: number): void;

  getState(): StateInfo {
    return {
      canBeStarted: this.canBeStarted(),
      isStarted: this.isStarted(),
      ressources: this.ressources,
    };
  }
}
