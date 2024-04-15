import Player from '@/domain/player/player';
import { PlayerTurn } from '../player.turn/player.turn';
import { GameState } from './game.state';
import { startingRessourcesByPlayersNumber } from '@/domain/configuration/index';

const keys = Object.keys(startingRessourcesByPlayersNumber).map((key) =>
  Number(key),
);

const MINIMUM_PLAYER_NUMBER = Math.min(...keys);
const MAXIMUM_PLAYER_NUMBER = Math.max(...keys);

export class WaintingForPlayersGameState extends GameState {
  get currentPlayer(): `${string}-${string}-${string}-${string}-${string}` {
    throw new Error('Method not implemented.');
  }

  canBeJoined(): boolean {
    return this._game.players.length < MAXIMUM_PLAYER_NUMBER;
  }

  canBeStarted(): boolean {
    return this._game.players.length >= MINIMUM_PLAYER_NUMBER;
  }

  onActionSelect(): void {
    throw new Error('Method not implemented.');
  }
  onRessourceGain(): void {
    throw new Error('Method not implemented.');
  }
}
