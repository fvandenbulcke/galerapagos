import halson from 'halson';
import Player from 'src/domain/player/player';
import { PlayerDto } from './types';
import Game from 'src/domain/game/game';
import paths from '../routing/paths';
import GameStateDto from './dto/game.state';

export const toPlayerDto = (player: Player): PlayerDto => ({
  id: player.id,
  name: player.name,
});

export const buildConnectResponse = (player: Player): any => {
  if (player) {
    return buildRegisterResponse(player);
  } else {
    return halson(player).addLink('login', `${paths.app}/login`);
  }
};

export const buildRegisterResponse = (player: PlayerDto): any => {
  return halson(player)
    .addLink('self', `${paths.app}/players/self`)
    .addLink('listGames', `${paths.app}/game`)
    .addLink('createGame', `${paths.app}/game`);
};

export const buildGameListResponse = (player: Player, games: Game[]): any => {
  return halson({ content: games.map(buildGameResponse(player)) })
    .addLink('self', `${paths.app}/game`)
    .addLink('createGame', `${paths.app}/game`);
};

export const buildGameResponse =
  (player: Player) =>
  (game: Game): any => {
    const gameState = game.getState();
    const response = halson(GameStateDto.from(gameState)).addLink(
      'self',
      `${paths.app}/game/${game.id}`,
    );
    const isPlayer = gameState.players.some(({ id }) => id === player.id);
    if (isPlayer) {
      response.addLink('leaveGame', `${paths.app}/game/${game.id}/leave`);
    } else if (gameState.canBeJoined) {
      response.addLink('joinGame', `${paths.app}/game/${game.id}/join`);
    }

    if (!gameState.ressources && gameState.canBeStarted) {
      response.addLink('startGame', `${paths.app}/game/${game.id}/start`);
    } else if (gameState.ressources) {
      const isCurrentPlayer = gameState.currentPlayer === player.id;

      if (isCurrentPlayer && !gameState.currentPlayerTurn) {
        response.addLink(
          'selectAction',
          `${paths.app}/game/${game.id}/selectAction`,
        );
      } else if (isCurrentPlayer && !gameState.currentPlayerTurn.gain) {
        response.addLink('gain', `${paths.app}/game/${game.id}/gain`);
      } else {
      }
    }

    return response;
  };
