import Game from '@/domain/game/game';
import Player from '@/domain/player/player';
import {
  buildRegisterResponse,
  buildGameListResponse,
  buildGameResponse,
} from './response.builder';
import halson from 'halson';
import { PlayerDto } from './types';

const isPlayerStub = jest.fn();
const canBeStartedStub = jest.fn();

const GAME = {
  id: 'gameId',
  isPlayer: isPlayerStub,
  canBeStarted: canBeStartedStub,
  getState: () => ({ currentPlayer: 'currentPlayer' }),
} as unknown as Game;

const PLAYER = { id: 'playerId' } as unknown as Player;

describe('response builder', () => {
  describe('welcome page', () => {
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
          self: { href: '/player/playerId' },
          listGames: { href: '/game/playerId' },
          createGame: { href: '/game/playerId' },
        },
      };
      expect(response).toEqual(halson(expected));
    });

    test('should build game list response', () => {
      isPlayerStub.mockReturnValue(false);
      const response = buildGameListResponse(PLAYER, [GAME]);

      const expected = {
        '0': {
          currentPlayer: 'currentPlayer',
          _links: {
            self: { href: '/game/gameId/playerId' },
            joinGame: { href: '/game/gameId/playerId' },
          },
        },
        _links: {
          self: { href: '/game' },
          createGame: { href: '/game/playerId' },
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
        canBeStartedStub.mockReturnValue(false);
        response = buildGameResponse(PLAYER)(GAME);
      });

      test('should be able to reload the game', () => {
        const expected = { href: '/game/gameId/playerId' };
        expect(response.getLink('self')).toEqual(expected);
      });

      test('should be able to join the game', () => {
        const expected = { href: '/game/gameId/playerId' };
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
        canBeStartedStub.mockReturnValue(false);
        response = buildGameResponse(PLAYER)(GAME);
      });

      test('should be able to reload the game', () => {
        const expected = { href: '/game/gameId/playerId' };
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
        isPlayerStub.mockReturnValue(true);
        canBeStartedStub.mockReturnValue(true);
        response = buildGameResponse(PLAYER)(GAME);
      });

      test('should be able to reload the game', () => {
        const expected = { href: '/game/gameId/playerId' };
        expect(response.getLink('self')).toEqual(expected);
      });

      test('should not be able to join the game', () => {
        expect(response.getLink('joinGame')).toBeUndefined();
      });

      test('should be able to start the game', () => {
        const expected = { href: '/game/gameId/start/playerId' };
        expect(response.getLink('startGame')).toEqual(expected);
      });
    });
  });

  describe('when game has started', () => {
    describe('when player is current one', () => {
      let response;

      beforeAll(() => {
        isPlayerStub.mockReturnValue(false);
        canBeStartedStub.mockReturnValue(false);
        response = buildGameResponse(PLAYER)(GAME);
      });

      test('should be able to reload the game', () => {
        const expected = { href: '/game/gameId/playerId' };
        expect(response.getLink('self')).toEqual(expected);
      });

      test('should be able to join the game', () => {
        const expected = { href: '/game/gameId/playerId' };
        expect(response.getLink('joinGame')).toEqual(expected);
      });
    });
  });
});
