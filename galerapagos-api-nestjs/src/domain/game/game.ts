import { UUID, randomUUID } from 'crypto';
import Player from '../player/player';
import { GameState } from './state/game.state';
import { WaintingForPlayersGameState } from './state/waitingForPlayers.game.state';
import { PlayingGameState } from './state/playing.game.state';
import { Ressource, TurnAction } from '../configuration';
import { PlayerTurn } from './player.turn/player.turn';

export type GameStateInfo = {
  players: Player[];
  ressources: Ressource;
  currentPlayer?: UUID;
  currentPlayerTurn?: PlayerTurn;
};

export default class Game {
  private _id: UUID;
  private _players: Player[];
  private _state: GameState;

  private constructor(id: UUID) {
    this._id = id;
    this._players = [];
    this._state = new WaintingForPlayersGameState(this);
  }

  static create(): Game {
    return new Game(randomUUID());
  }

  get id() {
    return this._id;
  }
  get players() {
    return this._players;
  }
  get state() {
    return this._state;
  }

  add(player: Player): void {
    if (!this._state.canBeJoined()) {
      throw new Error(`The game ${this._id} can not be joined`);
    }
    this._players.push(player);
  }

  isPlayer(player: Player) {
    return this._players
      .map((p) => p.id)
      .some((playerId) => playerId === player.id);
  }

  isLeavedByPlayer(leavingPlayerId: UUID): void {
    this._players = this._players.filter(({ id }) => leavingPlayerId !== id);
  }

  canBeStarted(): boolean {
    return this._state.canBeStarted();
  }

  start(): void {
    if (!this.canBeStarted()) {
      throw new Error('Not enough player to start');
    }
    this._state = new PlayingGameState(this);
  }

  selectAction(player: Player, action: TurnAction) {
    this._state.onActionSelect(player, action);
  }

  gainRessource(player: Player, quantity: number) {
    this._state.onRessourceGain(player, quantity);
  }

  getState(): GameStateInfo {
    return this._state.getState();
  }
}
