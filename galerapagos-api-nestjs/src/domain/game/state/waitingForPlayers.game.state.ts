import { startingRessourcesByPlayersNumber } from '@/domain/configuration/index';

import { GameState } from './game.state';

const keys = Object.keys(startingRessourcesByPlayersNumber).map((key) =>
  Number(key),
);

const MINIMUM_PLAYER_NUMBER = Math.min(...keys);
const MAXIMUM_PLAYER_NUMBER = Math.max(...keys);

export class WaintingForPlayersGameState extends GameState {
  canBeJoined(): boolean {
    return this._game.players.length < MAXIMUM_PLAYER_NUMBER;
  }

  canBeStarted(): boolean {
    return this._game.players.length >= MINIMUM_PLAYER_NUMBER;
  }

  isStarted(): boolean {
    return false;
  }

  onActionSelect(): void {
    throw new Error('Method not implemented.');
  }
  onRessourceGain(): void {
    throw new Error('Method not implemented.');
  }
}
