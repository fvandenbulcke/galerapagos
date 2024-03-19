import { UUID, randomUUID } from 'crypto';
import Player from '../player/player';
import { GameState } from './state/game.state';

export class Game {
  private _id: UUID;
  private _players: Player[];
  private _state: GameState;

  private constructor(id: UUID) {
    this._id = id;
    this._players = [];
    this._state = new GameState();
  }

  static create(): Game {
    return new Game(randomUUID());
  }

  get id() {
    return this._id;
  }

  add(player: Player): void {
    if (!this._state.canBeJoined()) {
      throw new Error(`The game ${this._id} can not be joined`);
    }
    this._players.push(player);
  }

  isLeavedByPlayer(leavingPlayerId: UUID): void {
    this._players = this._players.filter(({ id }) => leavingPlayerId === id);
  }
}
