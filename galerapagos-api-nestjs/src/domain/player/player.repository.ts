import Player from './player';

export default interface PlayerRepository {
  register(playerName: string): Player;
  get(uuid: string): Player;
}
