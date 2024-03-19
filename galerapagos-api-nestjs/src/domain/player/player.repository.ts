import Player from './player';

export interface PlayerRepository {
  register(): Player;
  get(uuid: string): Player;
}
