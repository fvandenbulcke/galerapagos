import { UUID } from 'crypto';
import Game, { GameStateInfo } from '../game';
import { WeatherManager } from '../weather/weather.manager';
import { GameState } from './game.state';
import {
  TurnAction,
  startingRessourcesByPlayersNumber,
} from '@/domain/configuration/index';
import { PlayerTurn } from '../player.turn/player.turn';
import Player from '@/domain/player/player';

export class PlayingGameState extends GameState {
  private _weatherManager: WeatherManager;
  private _orderedPlayers: UUID[];
  private _currentPlayer: UUID;
  private _playerTurns = new Map<UUID, PlayerTurn>();

  constructor(game: Game) {
    super(game);
    const { players } = this._game;
    this._ressources = { ...startingRessourcesByPlayersNumber[players.length] };
    this._weatherManager = new WeatherManager();

    this._orderedPlayers = players.map(({ id }) => id);
    this.#setNextPlayer();
  }

  get currentPlayer(): UUID {
    return this._currentPlayer;
  }

  getState(): GameStateInfo {
    return {
      ...super.getState(),
      currentPlayer: this._currentPlayer,
      currentPlayerTurn: this._playerTurns.get(this._currentPlayer),
    };
  }

  #setNextPlayer(): void {
    this._currentPlayer = this._orderedPlayers[0];
    this._orderedPlayers = this._orderedPlayers.slice(1);
  }

  #getPlayerTurn(player: Player): PlayerTurn {
    return this._playerTurns.get(player.id);
  }

  onActionSelect(player: Player, action: TurnAction) {
    if (player.id !== this._currentPlayer)
      throw new Error('Player is not the expected player');

    const playerTurn = this.#getPlayerTurn(player);
    if (playerTurn) throw new Error('Player has already selected its action');

    this._playerTurns.set(player.id, new PlayerTurn(action));
  }

  onRessourceGain(player: Player, quantity: number) {
    if (player.id !== this._currentPlayer)
      throw new Error('Player is not the expected player');

    const playerTurn = this.#getPlayerTurn(player);
    if (!playerTurn) throw new Error('Player has not yet selected its action');

    if (playerTurn.gain) throw new Error('Player has already gained ressource');

    playerTurn.onRessourceGain(quantity);
    this.updateRessources(playerTurn);
  }
}
