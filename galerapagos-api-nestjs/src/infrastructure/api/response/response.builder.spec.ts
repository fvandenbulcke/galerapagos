import halson from 'halson';
import { UUID } from 'crypto';
import {
  buildRegisterResponse,
  buildGameListResponse,
  buildGameResponse,
  buildConnectResponse,
} from './response.builder';

import Game, { GameStateInfo } from '@/domain/game/game';
import Player from '@/domain/player/player';
import { GamePlayer, PlayerTurn, Ressource, TurnAction } from '@/domain/models';
import { PlayerDto } from './types';

let GAME_CAN_BE_STARTED = true;

const FIRST_PLAYER = { id: 'playerId' } as unknown as GamePlayer;
const SECOND_PLAYER = { id: 'playerId-2' } as unknown as GamePlayer;
const THIRD_PLAYER = { id: 'playerId-3' } as unknown as GamePlayer;
let gamePlayers: GamePlayer[] = [];
let currentGamePlayer: UUID;
let currentGamePlayerTurn: PlayerTurn;

const RESSOURCES = {
  fish: 0,
  water: 0,
  wood: 0,
};
let gameRessources: Ressource;

const GAME = {
  id: 'gameId',
  getState: (): GameStateInfo => ({
    id: 'gameId' as unknown as UUID,
    players: gamePlayers,
    canBeStarted: GAME_CAN_BE_STARTED,
    isStarted: false,
    currentPlayer: currentGamePlayer,
    currentPlayerTurn: currentGamePlayerTurn,
    ressources: gameRessources,
  }),
} as unknown as Game;

describe('response builder', () => {
  describe('welcome page', () => {
    test('should build connect response when player is not connected', () => {
      const player = null as unknown as Player;
      const response = buildConnectResponse(player);
      const expected = {
        _links: {
          login: { href: '/galerapagos/login' },
        },
      };
      expect(response).toEqual(halson(expected));
    });

    test('should build connect response when player is connected', () => {
      const player = {
        id: 'playerId',
        name: 'playerName',
      } as unknown as Player;

      const response = buildConnectResponse(player);
      const expected = {
        id: 'playerId',
        name: 'playerName',
        _links: {
          self: { href: '/galerapagos/players/self' },
          listGames: { href: '/galerapagos/games' },
          createGame: { href: '/galerapagos/games' },
        },
      };
      expect(response).toEqual(halson(expected));
    });

    test('should build register response', () => {
      const player = {
        id: 'playerId',
        name: 'playerName',
      } as unknown as PlayerDto;

      const response = buildRegisterResponse(player);
      const expected = {
        id: 'playerId',
        name: 'playerName',
        _links: {
          self: { href: '/galerapagos/players/self' },
          listGames: { href: '/galerapagos/games' },
          createGame: { href: '/galerapagos/games' },
        },
      };
      expect(response).toEqual(halson(expected));
    });

    test('should build game list response', () => {
      GAME_CAN_BE_STARTED = false;
      gameRessources = undefined;
      currentGamePlayer = 'playerId' as unknown as UUID;
      const response = buildGameListResponse(FIRST_PLAYER, [GAME]);

      const expected = {
        content: [
          {
            id: 'gameId',
            players: [],
            ressources: undefined,
            currentPlayer: 'playerId',
            currentPlayerTurn: undefined,
            _links: {
              self: { href: '/galerapagos/games/gameId' },
              joinGame: { href: '/galerapagos/games/gameId' },
            },
          },
        ],
        _links: {
          self: { href: '/galerapagos/games' },
          createGame: { href: '/galerapagos/games' },
        },
      };
      expect(response).toEqual(halson(expected));
    });
  });

  describe('should build game response', () => {
    test.each([
      {
        condition: 'player has not joined the game and game has not started',
        gameCanBeStarted: false,
        players: [SECOND_PLAYER, THIRD_PLAYER],
        self: { href: '/galerapagos/games/gameId' },
        join: { href: '/galerapagos/games/gameId' },
        startGame: undefined,
        leaveGame: undefined,
      },
      {
        condition: "player has joined the game and game can't be started",
        gameCanBeStarted: false,
        players: [FIRST_PLAYER, SECOND_PLAYER, THIRD_PLAYER],
        self: { href: '/galerapagos/games/gameId' },
        leaveGame: { href: '/galerapagos/games/gameId/leave' },
      },
      {
        condition: 'player has joined the game and game can be started',
        gameCanBeStarted: true,
        players: [FIRST_PLAYER, SECOND_PLAYER, THIRD_PLAYER],
        ressources: undefined,
        self: { href: '/galerapagos/games/gameId' },
        join: undefined,
        startGame: { href: '/galerapagos/games/gameId/start' },
        leaveGame: { href: '/galerapagos/games/gameId/leave' },
        selectAction: undefined,
      },
      {
        condition: 'player has joined the game and game has started',
        gameCanBeStarted: false,
        players: [FIRST_PLAYER, SECOND_PLAYER, THIRD_PLAYER],
        ressources: RESSOURCES,
        self: { href: '/galerapagos/games/gameId' },
        leaveGame: { href: '/galerapagos/games/gameId/leave' },
        selectAction: { href: '/galerapagos/games/gameId/selectAction' },
      },
      {
        condition: "it is not the player's turn",
        gameCanBeStarted: false,
        players: [FIRST_PLAYER, SECOND_PLAYER, THIRD_PLAYER],
        currentPlayer: SECOND_PLAYER.id,
        ressources: RESSOURCES,
        self: { href: '/galerapagos/games/gameId' },
        leaveGame: { href: '/galerapagos/games/gameId/leave' },
      },
      {
        condition: "player's turn begins",
        gameCanBeStarted: false,
        players: [FIRST_PLAYER, SECOND_PLAYER, THIRD_PLAYER],
        ressources: RESSOURCES,
        self: { href: '/galerapagos/games/gameId' },
        leaveGame: { href: '/galerapagos/games/gameId/leave' },
        selectAction: { href: '/galerapagos/games/gameId/selectAction' },
      },
      {
        condition: 'player has selected his action',
        gameCanBeStarted: false,
        players: [FIRST_PLAYER, SECOND_PLAYER, THIRD_PLAYER],
        ressources: RESSOURCES,
        currentPlayerTurn: new PlayerTurn(TurnAction.fishCatch),
        self: { href: '/galerapagos/games/gameId' },
        leaveGame: { href: '/galerapagos/games/gameId/leave' },
        gain: { href: '/galerapagos/games/gameId/gain' },
      },
    ])(
      'when $condition',
      ({
        gameCanBeStarted,
        players,
        currentPlayer,
        ressources,
        currentPlayerTurn,
        self,
        join,
        startGame,
        leaveGame,
        selectAction,
        gain,
      }) => {
        GAME_CAN_BE_STARTED = gameCanBeStarted;
        gamePlayers = players;
        currentGamePlayer = (currentPlayer || 'playerId') as unknown as UUID;
        gameRessources = ressources;
        currentGamePlayerTurn = currentPlayerTurn;

        const response = buildGameResponse(FIRST_PLAYER)(GAME);
        expect(response.getLink('self')).toEqual(self);
        expect(response.getLink('joinGame')).toEqual(join);
        expect(response.getLink('startGame')).toEqual(startGame);
        expect(response.getLink('leaveGame')).toEqual(leaveGame);
        expect(response.getLink('selectAction')).toEqual(selectAction);
        expect(response.getLink('gain')).toEqual(gain);
      },
    );
  });
});
