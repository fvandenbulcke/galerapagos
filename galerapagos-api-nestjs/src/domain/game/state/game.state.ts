import { Ressource, TurnAction } from '@/domain/configuration';
import Player from '@/domain/player/player';
import Game, { GameStateInfo } from '@/domain/game/game';
import PlayerTurn from '@/domain/game/player.turn/player.turn';

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

  isStarted(): boolean {
    return true;
  }

  start(): void {
    throw new Error('Method not implemented.');
  }

  abstract onActionSelect(player: Player, action: TurnAction): void;
  abstract onRessourceGain(player: Player, quantity: number): void;

  getState(): GameStateInfo {
    return {
      id: this._game.id,
      canBeStarted: this.canBeStarted(),
      isStarted: this.isStarted(),
      players: this._game.players,
      ressources: this.ressources,
    };
  }
}
