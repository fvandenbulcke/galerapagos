import { TurnAction } from '@/domain/configuration';

export class PlayerTurn {
  private _action: TurnAction;
  private _gain: number;

  constructor(action: TurnAction) {
    this._action = action;
  }

  get action(): TurnAction {
    return this._action;
  }

  get gain(): number {
    return this._gain;
  }

  chooseAction(choosenAction: TurnAction) {
    this._action = choosenAction;
  }

  onRessourceGain(quantity: number) {
    this._gain = quantity;
  }

  hasPlayed(): boolean {
    return !!this._action;
  }

  hasWaterCollected(): boolean {
    return this._action === 'waterCollect';
  }
  hasfichCatched(): boolean {
    return this._action === 'fishCatch';
  }
  hasWoodCollected(): boolean {
    return this._action === 'woodCollect';
  }
}
