import { Game, GamePlayer, Player } from '@/domain/models';

import { NotificationBroadCaster } from './notification.broadcaster';

jest.mock('@/domain/configuration/index', () => ({
  ...jest.requireActual('@/domain/configuration/index'),
  startingRessourcesByPlayersNumber: {
    2: { fish: 5, water: 6, wood: 7 },
    3: { fish: 5, water: 6, wood: 7 },
    12: { fish: 10, water: 24, wood: 0 },
  },
}));

const FIRST_PLAYER = new Player(
  '55757a87-79a4-4866-9e9e-9c587eb7d39b',
  'unit-test-1',
);
const SECOND_PLAYER = new Player(
  '390b66fb-633e-4c68-a0e4-dd7c5d6a7020',
  'unit-test-2',
);

const notificationBroadCaster = new NotificationBroadCaster();

describe('Notification broadCaster', () => {
  let GAME: Game;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    GAME = Game.create(FIRST_PLAYER);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should broadcast game state when a player session is registered', () => {
    const playerSession = notificationBroadCaster.register(FIRST_PLAYER, GAME);

    const nextSpy = jest.spyOn(playerSession, 'next');

    // avancer le timer (le code utilise setTimeout(..., 1))
    jest.advanceTimersByTime(1);

    const expected = {
      data: {
        id: GAME.id,
        players: [new GamePlayer(FIRST_PLAYER)],
        ressources: undefined,
        currentPlayer: undefined,
        currentPlayerTurn: undefined,
        _links: {
          self: { href: `/galerapagos/game/${GAME.id}` },
          leaveGame: { href: `/galerapagos/game/${GAME.id}/leave` },
        },
      },
    };
    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(nextSpy).toHaveBeenCalledWith(expected);
  });

  test('should broadcast game state to all its players', () => {
    GAME.isJoinedBy(SECOND_PLAYER);

    const firstPlayerSession = notificationBroadCaster.register(
      FIRST_PLAYER,
      GAME,
    );
    const secondPlayerSession = notificationBroadCaster.register(
      SECOND_PLAYER,
      GAME,
    );

    // avancer le timer (le code utilise setTimeout(..., 1))
    jest.advanceTimersByTime(2);

    const firstPlayerSessionNextSpy = jest.spyOn(firstPlayerSession, 'next');
    const secondPlayerSessionNextSpy = jest.spyOn(secondPlayerSession, 'next');
    notificationBroadCaster.broadCastGameState(GAME);

    const expected = {
      data: {
        id: GAME.id,
        players: [new GamePlayer(FIRST_PLAYER), new GamePlayer(SECOND_PLAYER)],
        ressources: undefined,
        currentPlayer: undefined,
        currentPlayerTurn: undefined,
        _links: {
          self: { href: `/galerapagos/game/${GAME.id}` },
          leaveGame: { href: `/galerapagos/game/${GAME.id}/leave` },
          startGame: { href: `/galerapagos/game/${GAME.id}/start` },
        },
      },
    };
    expect(firstPlayerSessionNextSpy).toHaveBeenCalledTimes(1);
    expect(firstPlayerSessionNextSpy).toHaveBeenCalledWith(expected);
    expect(secondPlayerSessionNextSpy).toHaveBeenCalledTimes(1);
    expect(secondPlayerSessionNextSpy).toHaveBeenCalledWith(expected);
  });
});
