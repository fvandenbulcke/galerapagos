import { UUID } from 'crypto';
import { GameRepository } from '@/domain/repositories';
import { Game, Player } from '@/domain/models';

import { GameManager } from './game.manager';

jest.mock('@/domain/configuration/index', () => ({
  ...jest.requireActual('@/domain/configuration/index'),
  startingRessourcesByPlayersNumber: {
    2: { fish: 5, water: 6, wood: 7 },
    3: { fish: 5, water: 6, wood: 7 },
    12: { fish: 10, water: 24, wood: 0 },
  },
}));

const PLAYER_ID: UUID = '55757a87-79a4-4866-9e9e-9c587eb7d39b';
const FIRST_PLAYER = new Player(PLAYER_ID, 'unit-test-1');

const GAME: Game = Game.create(FIRST_PLAYER);

const mockGetByPlayer = jest.fn();
const gameRepositoryStub: GameRepository = {
  getAll: jest.fn().mockReturnValue([GAME]),
  create: jest.fn().mockReturnValue(GAME),
  getById: jest.fn(),
  deleteById: jest.fn(),
  save: jest.fn(),
  getByPlayer: mockGetByPlayer,
};

const gameManager = new GameManager(gameRepositoryStub);

describe('Game - when is started', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should list all games', () => {
    const result = gameManager.getAll();
    expect(gameRepositoryStub.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([GAME]);
  });

  test('should create a game', () => {
    const result = gameManager.create(FIRST_PLAYER);
    expect(gameRepositoryStub.create).toHaveBeenCalledTimes(1);
    expect(gameRepositoryStub.create).toHaveBeenCalledWith(FIRST_PLAYER);
    expect(result).toEqual(GAME);
  });

  test('should not be able to join a game when player is already participating in another game', () => {
    mockGetByPlayer.mockReturnValue(GAME);
    expect(() => {
      gameManager.join(FIRST_PLAYER, GAME.id);
    }).toThrow('Player is already in a game');
    expect(mockGetByPlayer).toHaveBeenCalledTimes(1);
    expect(mockGetByPlayer).toHaveBeenCalledWith(FIRST_PLAYER);
  });
});
