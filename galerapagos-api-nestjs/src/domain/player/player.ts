import { UUID, randomUUID } from 'crypto';
import { Game } from '../game/game';

export interface IPlayer {
  readonly _id: UUID;
  readonly _name: string;
}

export default class Player {
  private _id: UUID;
  private _name: string;
  private _currentGame: UUID;

  constructor(name: string) {
    this._id = randomUUID();
    this._name = name;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get currentGame(): UUID {
    return this._currentGame;
  }

  join(game: Game) {
    game.add(this);
    this._currentGame = game.id;
  }
}
