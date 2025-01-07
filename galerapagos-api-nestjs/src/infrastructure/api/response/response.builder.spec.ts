import {
  buildRegisterResponse,
  buildGameListResponse,
  buildGameResponse,
  buildConnectResponse,
} from './response.builder';
import halson from 'halson';
import { PlayerDto } from './types';
import Game from '@/domain/game/game';
import Player from '@/domain/player/player';

const isPlayerStub = jest.fn();
let GAME_CAN_BE_STARTED = true;
const GAME = {
  id: 'gameId',
  isPlayer: isPlayerStub,
  getState: () => ({
    currentPlayer: 'currentPlayer',
    canBeStarted: GAME_CAN_BE_STARTED,
  }),
} as unknown as Game;

const PLAYER = { id: 'playerId' } as unknown as Player;

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
      isPlayerStub.mockReturnValue(false);
      const response = buildGameListResponse(PLAYER, [GAME]);

      const expected = {
        content: [
          {
            id: undefined,
            players: undefined,
            ressources: undefined,
            currentPlayer: 'currentPlayer',
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

  describe('when game has not started', () => {
    describe('when player has not joined the game', () => {
      let response;

      beforeAll(() => {
        isPlayerStub.mockReturnValue(false);
        response = buildGameResponse(PLAYER)(GAME);
      });

      test('should be able to reload the game', () => {
        const expected = { href: '/galerapagos/games/gameId' };
        expect(response.getLink('self')).toEqual(expected);
      });

      test('should be able to join the game', () => {
        const expected = { href: '/galerapagos/games/gameId' };
        expect(response.getLink('joinGame')).toEqual(expected);
      });

      test('should not be able to start the game', () => {
        expect(response.getLink('startGame')).toBeUndefined();
      });
    });

    describe("when player has joined the game and game can't be started", () => {
      let response;

      beforeAll(() => {
        isPlayerStub.mockReturnValue(true);
        response = buildGameResponse(PLAYER)(GAME);
      });

      test('should be able to reload the game', () => {
        const expected = { href: '/galerapagos/games/gameId' };
        expect(response.getLink('self')).toEqual(expected);
      });

      test('should not be able to join the game', () => {
        expect(response.getLink('joinGame')).toBeUndefined();
      });

      test('should not be able to start the game', () => {
        expect(response.getLink('startGame')).toBeUndefined();
      });
    });

    describe('when player has joined the game and game can be started', () => {
      let response;

      beforeAll(() => {
        GAME_CAN_BE_STARTED = true;
        isPlayerStub.mockReturnValue(true);
        response = buildGameResponse(PLAYER)(GAME);
      });

      test('should be able to reload the game', () => {
        const expected = { href: '/galerapagos/games/gameId' };
        expect(response.getLink('self')).toEqual(expected);
      });

      test('should not be able to join the game', () => {
        expect(response.getLink('joinGame')).toBeUndefined();
      });

      test('should be able to start the game', () => {
        const expected = { href: '/galerapagos/games/gameId/start' };
        expect(response.getLink('startGame')).toEqual(expected);
      });
    });
  });

  describe('when game has started', () => {
    describe('when player is current one', () => {
      let response;

      beforeAll(() => {
        isPlayerStub.mockReturnValue(false);
        response = buildGameResponse(PLAYER)(GAME);
      });

      test('should be able to reload the game', () => {
        const expected = { href: '/galerapagos/games/gameId' };
        expect(response.getLink('self')).toEqual(expected);
      });

      test('should be able to join the game', () => {
        const expected = { href: '/galerapagos/games/gameId' };
        expect(response.getLink('joinGame')).toEqual(expected);
      });
    });
  });
});
