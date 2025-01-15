import { UUID, randomUUID } from 'crypto';
import { WeatherManager } from './weather/weather.manager';
import { GameState, StateInfo } from './state/game.state';
import { WaintingForPlayersGameState } from './state/waitingForPlayers.game.state';
import { PlayingGameState } from './state/playing.game.state';
import { Ressource, TurnAction } from '../configuration';
import PlayerTurn from './player.turn/player.turn';
import GamePlayer from './gamePlayer';
import Player from '../player/player';

export type GameStateInfo = StateInfo & {
  id: UUID;
  players: GamePlayer[];
};

export default class Game {
  private _id: UUID;
  private _players: GamePlayer[];
  private _state: GameState;
  private _weatherManager: WeatherManager;

  private constructor(id: UUID, player: GamePlayer) {
    this._id = id;
    this._players = [player];
    this._state = new WaintingForPlayersGameState(this);
  }

  static create(player: Player): Game {
    return new Game(randomUUID(), new GamePlayer(player));
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

  isJoinedBy(player: Player): void {
    if (!this._state.canBeJoined()) {
      throw new Error(`The game ${this._id} can not be joined`);
    }
    this._players.push(new GamePlayer(player));
  }

  isPlayer({ id: playerId }: Player) {
    return this._players.some(({ id }) => id === playerId);
  }

  isLeftByPlayer(leavingPlayerId: UUID): void {
    const leavingPlayerIndex = this._players.findIndex(
      ({ id }) => leavingPlayerId === id,
    );
    if (leavingPlayerIndex >= 0) {
      if (!this.getState().isStarted) {
        this._players.splice(leavingPlayerIndex, 1);
      } else {
        this._players[leavingPlayerIndex].manageItByTheSystem();
      }
    }
  }

  start(): void {
    const gameState = this.getState();
    if (!gameState.isStarted) {
      if (!gameState.canBeStarted) {
        throw new Error('Not enough player to start');
      }
      this._state = new PlayingGameState(this);
      this._weatherManager = new WeatherManager();
    }
  }

  selectAction(player: Player, action: TurnAction): void {
    this._state.onActionSelect(player, action);
  }

  gainRessource(player: Player, quantity: number): void {
    this._state.onRessourceGain(player, quantity);
  }

  getState(): GameStateInfo {
    return {
      ...this._state.getState(),
      id: this.id,
      players: this.players,
    };
  }
}
