import { randomUUID } from 'crypto';
import Player from '../player/player';
import Game from './game';
import { TurnAction } from '@/domain/configuration/index';

let game: Game;

const getCurrentPlayer = (): Player => {
  return game
    .getState()
    .players.find(({ id }) => id === game.getState().currentPlayer);
};

describe('Game - when is started', () => {
  beforeEach(() => {
    game = Game.create();
    Array.from({ length: 5 }, (value, index) => index).forEach((index) => {
      game.add(new Player(randomUUID(), `unit-test-${index}`));
    });
    game.start();
  });

  test('should return game state', () => {
    const gameStateInfo = game.getState();
    expect(gameStateInfo.ressources).toEqual({ water: 10, fish: 8, wood: 0 });
    const playerIds = gameStateInfo.players.map(({ id }) => id);
    expect(playerIds.includes(gameStateInfo.currentPlayer)).toBe(true);
    expect(gameStateInfo.currentPlayerTurn).toBeUndefined();
  });

  test('should not be able to select an action when it is not its turn', () => {
    const notCurrentUser = { id: 'id', name: 'name' } as any;
    expect(() => {
      game.selectAction(notCurrentUser, TurnAction.waterCollect);
    }).toThrow('Player is not the expected player');
  });

  test('should not be able to play an action when it is not its turn', () => {
    const notCurrentUser = { id: 'id', name: 'name' } as any;
    expect(() => {
      game.gainRessource(notCurrentUser, 2);
    }).toThrow('Player is not the expected player');
  });

  test('should not be able to gain ressource when it is not the selected one', () => {
    expect(() => {
      game.gainRessource(getCurrentPlayer(), 2);
    }).toThrow('Player has not yet selected its action');
  });

  test.each([
    { action: TurnAction.waterCollect, ressoure: 'water' },
    { action: TurnAction.fishCatch, ressoure: 'fish' },
    { action: TurnAction.wooCollect, ressoure: 'wood' },
  ])(
    'should not be able to gain ressource more that one time ($ressoure case)',
    ({ action }) => {
      const currentPlayer = getCurrentPlayer();
      game.selectAction(currentPlayer, action);
      game.gainRessource(currentPlayer, 1);
      expect(() => {
        game.gainRessource(currentPlayer, 1);
      }).toThrow('Player has already gained ressource');
    },
  );

  describe('action select', () => {
    test.each([
      { action: TurnAction.waterCollect, ressoure: 'water' },
      { action: TurnAction.fishCatch, ressoure: 'fish' },
      { action: TurnAction.wooCollect, ressoure: 'wood' },
    ])('should be able to select $ressoure collect action', ({ action }) => {
      game.selectAction(getCurrentPlayer(), action);
      const { currentPlayerTurn } = game.getState();
      expect(currentPlayerTurn.action).toEqual(action);
      expect(currentPlayerTurn.gain).toBeUndefined();
    });
  });

  describe('action gain', () => {
    test.each([
      {
        action: TurnAction.fishCatch,
        ressoure: 'fish',
        expected: { water: 10, fish: 10, wood: 0 },
      },
      {
        action: TurnAction.waterCollect,
        ressoure: 'water',
        expected: { water: 12, fish: 8, wood: 0 },
      },
      {
        action: TurnAction.wooCollect,
        ressoure: 'wood',
        expected: { water: 10, fish: 8, wood: 2 },
      },
    ])('should gain ressource for $action', ({ action, expected }) => {
      const currentPlayer = getCurrentPlayer();
      const earnedRessources = 2;

      game.selectAction(currentPlayer, action);
      game.gainRessource(currentPlayer, earnedRessources);
      const { currentPlayerTurn, ressources } = game.getState();
      expect(currentPlayerTurn.gain).toEqual(earnedRessources);

      expect(ressources).toEqual(expected);
    });
  });
});
