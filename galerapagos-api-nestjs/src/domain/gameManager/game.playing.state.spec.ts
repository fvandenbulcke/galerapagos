import { randomUUID, UUID } from 'crypto';
import { GameRepository } from '@/domain/repositories';
import {
  Game,
  GameStateInfo,
  GamePlayer,
  Player,
  PlayerTurn,
  TurnAction,
} from '@/domain/models';

import { GameManager } from './game.manager';

jest.mock('@/domain/configuration/index', () => ({
  ...jest.requireActual('@/domain/configuration/index'),
  startingRessourcesByPlayersNumber: {
    2: { fish: 5, water: 6, wood: 7 },
    3: { fish: 5, water: 6, wood: 7 },
    12: { fish: 10, water: 24, wood: 0 },
  },
}));

const mockGetById = jest.fn();
const mockDeleteById = jest.fn();
const mockSave = jest.fn((game: Game) => game);
const gameRepositoryStub: GameRepository = {
  getAll: jest.fn(),
  create: jest.fn(),
  getById: (id: UUID) => mockGetById(id),
  deleteById: (id: UUID) => mockDeleteById(id),
  save: mockSave,
};

const gameManager = new GameManager(gameRepositoryStub);

const PLAYER_ID: UUID = '55757a87-79a4-4866-9e9e-9c587eb7d39b';
const FIRST_PLAYER = new Player(PLAYER_ID, 'unit-test-1');
const SECOND_PLAYER = new Player(randomUUID(), 'unit-test-2');

let GAME: Game;
const GAME_ID: UUID = '66868b98-79a4-4866-9e9e-9c587eb7d39b';

const getCurrentPlayer = (): Player => {
  const { currentPlayer, players } = mockGetById(GAME_ID).getState();
  return players.find(({ id }) => id === currentPlayer);
};

describe('Game - when is started', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    GAME = Game.create(FIRST_PLAYER);
    GAME.isJoinedBy(SECOND_PLAYER);
    mockGetById.mockReturnValue(GAME);
    gameManager.start(GAME_ID);
  });

  test('should not be able to select an action when it is not its turn', () => {
    const notCurrentUser = { id: 'id', name: 'name' } as any;
    expect(() => {
      gameManager.selectAction(
        GAME_ID,
        notCurrentUser,
        TurnAction.waterCollect,
      );
    }).toThrow('Player is not the expected one');
  });

  test('left player should be managed by the system', () => {
    const gameState = gameManager.leave(FIRST_PLAYER, GAME.id).getState();

    const firstPlayer = new GamePlayer(FIRST_PLAYER);
    firstPlayer.manageItByTheSystem();

    const expected: GameStateInfo = {
      id: GAME.id,
      canBeStarted: false,
      isStarted: true,
      players: [firstPlayer, new GamePlayer(SECOND_PLAYER)],
      ressources: { fish: 5, water: 6, wood: 7 },
      currentPlayer: PLAYER_ID,
      currentPlayerTurn: undefined,
    };
    expect(gameState).toEqual(expected);
  });

  test('should delete game when leaving player is the last true one', () => {
    gameManager.leave(FIRST_PLAYER, GAME.id);
    const updatedGame = gameManager.leave(SECOND_PLAYER, GAME.id);

    expect(mockDeleteById).toHaveBeenCalledTimes(1);
    expect(mockDeleteById).toHaveBeenCalledWith(GAME.id);
    expect(updatedGame).toBeNull();
  });

  describe('action select', () => {
    test.each([
      { action: TurnAction.waterCollect, ressoure: 'water' },
      { action: TurnAction.fishCatch, ressoure: 'fish' },
      { action: TurnAction.wooCollect, ressoure: 'wood' },
    ])('should be able to select $ressoure collect action', ({ action }) => {
      const gameState = gameManager
        .selectAction(GAME_ID, getCurrentPlayer(), action)
        .getState();

      const expected: GameStateInfo = {
        id: GAME.id,
        canBeStarted: false,
        isStarted: true,
        players: [new GamePlayer(FIRST_PLAYER), new GamePlayer(SECOND_PLAYER)],
        ressources: { fish: 5, water: 6, wood: 7 },
        currentPlayer: PLAYER_ID,
        currentPlayerTurn: new PlayerTurn(action),
      };
      expect(gameState).toEqual(expected);
    });
  });

  describe('action gain', () => {
    test('should not be able to gain ressource when the action has not been selected', () => {
      expect(() => {
        gameManager.gainRessource(GAME_ID, getCurrentPlayer(), 2);
      }).toThrow('Player has not yet selected its action');
    });

    test('should not be able to gain ressource when it is not its turn', () => {
      const notCurrentUser = { id: 'id', name: 'name' } as any;
      expect(() => {
        gameManager.gainRessource(GAME_ID, notCurrentUser, 2);
      }).toThrow('Player is not the expected one');
    });

    test.each([
      {
        action: TurnAction.fishCatch,
        ressoure: 'fish',
        ressources: { fish: 7, water: 6, wood: 7 },
      },
      {
        action: TurnAction.waterCollect,
        ressoure: 'water',
        ressources: { fish: 5, water: 8, wood: 7 },
      },
      {
        action: TurnAction.wooCollect,
        ressoure: 'wood',
        ressources: { fish: 5, water: 6, wood: 9 },
      },
    ])('should gain ressource for $action', ({ action, ressources }) => {
      const currentPlayer = getCurrentPlayer();
      const earnedRessources = 2;

      gameManager.selectAction(GAME_ID, currentPlayer, action);
      const gameState = gameManager
        .gainRessource(GAME_ID, currentPlayer, earnedRessources)
        .getState();

      const expected: GameStateInfo = {
        id: GAME.id,
        canBeStarted: false,
        isStarted: true,
        players: [new GamePlayer(FIRST_PLAYER), new GamePlayer(SECOND_PLAYER)],
        ressources,
        currentPlayer: SECOND_PLAYER.id,
        currentPlayerTurn: undefined,
      };
      expect(gameState).toEqual(expected);
    });
  });

  describe('automatic turn', () => {
    const THIRD_PLAYER = new Player(randomUUID(), 'unit-test-3');
    const FOURTH_PLAYER = new Player(randomUUID(), 'unit-test-4');
    const FIFT_PLAYER = new Player(randomUUID(), 'unit-test-5');

    beforeEach(() => {
      GAME = Game.create(FIRST_PLAYER);
      GAME.isJoinedBy(SECOND_PLAYER);
      GAME.isJoinedBy(THIRD_PLAYER);
      GAME.isJoinedBy(FOURTH_PLAYER);
      GAME.isJoinedBy(FIFT_PLAYER);
      mockGetById.mockReturnValue(GAME);
      gameManager.start(GAME_ID);
    });

    test('should automatic turn when next player is managed by the system', () => {
      gameManager.leave(SECOND_PLAYER, GAME.id);
      gameManager.leave(THIRD_PLAYER, GAME.id);
      gameManager.leave(FOURTH_PLAYER, GAME.id);
      const currentPlayer = getCurrentPlayer();
      gameManager.selectAction(GAME_ID, currentPlayer, TurnAction.fishCatch);
      jest.clearAllMocks();
      gameManager.gainRessource(GAME_ID, currentPlayer, 3);
      expect(mockSave).toHaveBeenCalledTimes(4);
    });
  });
});
