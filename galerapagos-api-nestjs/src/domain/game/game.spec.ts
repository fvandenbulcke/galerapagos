import { randomUUID } from 'crypto';
import { Ressource } from '../configuration';
import Player from '../player/player';
import Game, { GameStateInfo } from './game';

let game: Game;
describe.only('Game', () => {
  describe('When not yet start', () => {
    beforeEach(() => {
      game = Game.create();
    });

    test('should init game', () => {
      expect(game.id).toBeDefined();
      expect(game.players).toEqual([]);
    });

    describe('when one player has joined the game', () => {
      let player;
      beforeEach(() => {
        player = new Player(randomUUID(), 'unit-test');
        game.add(player);
      });

      test('should return game state', () => {
        const gameState = game.getState();
        const expected: GameStateInfo = {
          players: [player],
          ressources: undefined,
        };
        expect(gameState).toEqual(expected);
      });

      test.each([
        { playerId: randomUUID(), playerToTestId: null, expected: true },
        {
          playerId: randomUUID(),
          playerToTestId: randomUUID(),
          expected: false,
        },
      ])(
        'should be able to detect if player already play',
        ({ playerId, playerToTestId, expected }) => {
          game.add(new Player(playerId, 'unit-test'));
          const playerToTest = new Player(
            playerToTestId || playerId,
            'unit-test',
          );
          expect(game.isPlayer(playerToTest)).toBe(expected);
        },
      );

      test('should be able to remove player', () => {
        game.isLeavedByPlayer(player.id);
        expect(game.players).toEqual([]);
      });

      test('should be able to add another player', () => {
        const anotherPlayer = new Player(randomUUID(), 'another-unit-test');
        game.add(anotherPlayer);
        expect(game.players).toEqual([player, anotherPlayer]);
      });

      test('should not be able to start the game', () => {
        expect(() => {
          game.start();
        }).toThrow('Not enough player to start');
      });
    });

    describe('when maximum of player is reached', () => {
      beforeEach(() => {
        Array.from({ length: 12 }, (value, index) => index).forEach((index) => {
          game.add(new Player(randomUUID(), `unit-test-${index}`));
        });
      });

      test('should not be able to add player', () => {
        expect(() => {
          const player = new Player(randomUUID(), 'unit-test-3');
          game.add(player);
        }).toThrow(`The game ${game.id} can not be joined`);
      });

      test('should be able to start the game', () => {
        game.start();
        const expected = { water: 24, fish: 10, wood: 0 } as Ressource;
        expect(game.state.ressources).toEqual(expected);
      });

      test('should be able to start game', () => {
        expect(game.canBeStarted()).toBe(true);
      });
    });
  });
});
