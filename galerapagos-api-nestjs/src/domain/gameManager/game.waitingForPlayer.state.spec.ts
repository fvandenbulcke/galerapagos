import { randomUUID, UUID } from 'crypto';
import {
  Game,
  GameStateInfo,
  GamePlayer,
  Player,
  Ressource,
} from '@/domain/models';
import { GameRepository } from '@/domain/repositories';

import { GameManager } from './game.manager';

jest.mock('@/domain/configuration/index', () => ({
  startingRessourcesByPlayersNumber: {
    2: { fish: 5, water: 6, wood: 7 },
  },
}));

const mockGetById = jest.fn();
const mockDeleteById = jest.fn();
const gameRepositoryStub: GameRepository = {
  getAll: jest.fn(),
  create: jest.fn(),
  getById: (id: UUID) => mockGetById(id),
  deleteById: (id: UUID) => mockDeleteById(id),
  save: (game: Game) => game,
};

const gameManager = new GameManager(gameRepositoryStub);

const PLAYER_ID: UUID = '55757a87-79a4-4866-9e9e-9c587eb7d39b';
const GAME_ID: UUID = '66868b98-79a4-4866-9e9e-9c587eb7d39b';
let GAME: Game;
let gamePlayer: GamePlayer;

describe('Game - when not yet started', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const player = new Player(PLAYER_ID, 'unit-test');
    gamePlayer = new GamePlayer(player);
    GAME = Game.create(player);
    mockGetById.mockReturnValue(GAME);
  });

  test('should init game', () => {
    const gameState = GAME.getState();
    const expected: GameStateInfo = {
      id: GAME.id,
      canBeStarted: false,
      isStarted: false,
      players: [gamePlayer],
      ressources: undefined,
    };
    expect(gameState).toEqual(expected);
  });

  describe('when maximum of players is not reached', () => {
    test('should be able to join the game', () => {
      const anotherPlayer = new Player(randomUUID(), 'another-unit-test');
      const updatedGame = gameManager.join(anotherPlayer, GAME_ID);

      const gameState = updatedGame.getState();
      const expected: GameStateInfo = {
        id: GAME.id,
        canBeStarted: true,
        isStarted: false,
        players: [gamePlayer, new GamePlayer(anotherPlayer)],
        ressources: undefined,
      };
      expect(gameState).toEqual(expected);
    });

    test('should delete game when leaving player is the last one', () => {
      const response = gameManager.leave(gamePlayer, GAME.id);
      expect(mockDeleteById).toHaveBeenCalledTimes(1);
      expect(mockDeleteById).toHaveBeenCalledWith(GAME.id);
      expect(response).toBeNull();
    });

    test('should not be able to start the game', () => {
      expect(() => {
        gameManager.start(GAME_ID);
      }).toThrow('Not enough player to start');
    });

    test.each([
      { playerId: PLAYER_ID, expected: true, case: 'already played' },
      {
        playerId: randomUUID(),
        expected: false,
        case: 'didnt already played',
      },
    ])(
      'should be able to detect when player $case',
      ({ playerId, expected }) => {
        const game = gameManager.join(
          new Player('55757a87-79a4-4866-9e9e-9c587eb7d39b', 'unit-test'),
          GAME_ID,
        );
        const playerToTest = new Player(playerId, 'unit-test');
        expect(game.isPlayer(playerToTest)).toBe(playerId === PLAYER_ID);
      },
    );
  });

  describe('when maximum of players is reached', () => {
    let anotherPlayer: Player;
    beforeEach(() => {
      anotherPlayer = new Player(randomUUID(), `unit-test-2`);
      gameManager.join(anotherPlayer, GAME_ID);
    });

    test('should be able to leave the game', () => {
      const updatedGame = gameManager.leave(anotherPlayer, GAME.id);
      expect(mockDeleteById).not.toHaveBeenCalled();

      const gameState = updatedGame.getState();
      const expected: GameStateInfo = {
        id: GAME.id,
        canBeStarted: false,
        isStarted: false,
        players: [gamePlayer],
        ressources: undefined,
      };
      expect(gameState).toEqual(expected);
    });

    test('should not be able to add player', () => {
      expect(() => {
        const player = new Player(randomUUID(), 'unit-test-3');
        gameManager.join(player, GAME_ID);
      }).toThrow(`The game ${GAME.id} can not be joined`);
    });

    test('should be able to start the game', () => {
      const game = gameManager.start(GAME_ID);
      const expected: Ressource = { fish: 5, water: 6, wood: 7 };
      expect(game.state.ressources).toEqual(expected);
    });
  });
});
