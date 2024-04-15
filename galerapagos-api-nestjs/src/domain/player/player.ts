import { UUID } from 'crypto';

export default class Player {
  private _id: UUID;
  private _name: string;

  constructor(id: UUID, name: string) {
    this._id = id;
    this._name = name;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
}
