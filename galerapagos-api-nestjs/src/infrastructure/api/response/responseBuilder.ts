import halson from 'halson';
import Player from 'src/domain/player/player';
import { PlayerDto } from './types';
import { Game } from 'src/domain/game/game';

export const toPlayerDto = (player: Player): PlayerDto => ({
  id: player.id,
  name: player.name,
});

export const buildRegisterResponse = (player: PlayerDto): any => {
  return halson(player)
    .addLink('self', `/player/${player.id}`)
    .addLink('listGames', `/game/${player.id}`)
    .addLink('createGame', `/game/${player.id}`);
};

export const buildGameListResponse = (player: Player, games: Game[]): any => {
  return halson(games.map(buildGameResponse(player)))
    .addLink('self', `/game`)
    .addLink('createGame', `/game/${player.id}`);
};

export const buildGameResponse =
  (player: Player) =>
  (game: Game): any => {
    const response = halson(game).addLink('self', `/game/${game.id}`);
    if (player.currentGame !== game.id) {
      response.addLink('joinGame', `/game/${game.id}/${player.id}`);
    }
    return response;
  };
