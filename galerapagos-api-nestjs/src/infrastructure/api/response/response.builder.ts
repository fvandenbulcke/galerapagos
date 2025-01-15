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
    .addLink('listGames', `${paths.app}/games`)
    .addLink('createGame', `${paths.app}/games`);
};

export const buildGameListResponse = (player: Player, games: Game[]): any => {
  return halson({ content: games.map(buildGameResponse(player)) })
    .addLink('self', `${paths.app}/games`)
    .addLink('createGame', `${paths.app}/games`);
};

export const buildGameResponse =
  (player: Player) =>
  (game: Game): any => {
    const gameState = game.getState();
    const response = halson(GameStateDto.from(gameState)).addLink(
      'self',
      `${paths.app}/games/${game.id}`,
    );
    const isPlayer = gameState.players.some(({ id }) => id === player.id);
    if (isPlayer) {
      response.addLink('leaveGame', `${paths.app}/games/${game.id}/leave`);
    } else {
      response.addLink('joinGame', `${paths.app}/games/${game.id}`);
    }

    if (!gameState.ressources && gameState.canBeStarted) {
      response.addLink('startGame', `${paths.app}/games/${game.id}/start`);
    } else if (gameState.ressources) {
      const isCurrentPlayer = gameState.currentPlayer === player.id;

      if (isCurrentPlayer && !gameState.currentPlayerTurn) {
        response.addLink(
          'selectAction',
          `${paths.app}/games/${game.id}/selectAction`,
        );
      } else if (isCurrentPlayer && !gameState.currentPlayerTurn.gain) {
        response.addLink('gain', `${paths.app}/games/${game.id}/gain`);
      } else {
      }
    }

    return response;
  };
