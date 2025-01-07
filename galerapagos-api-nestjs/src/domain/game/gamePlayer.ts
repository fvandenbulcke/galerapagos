import Player from '../player/player';

export default class GamePlayer extends Player {
  private _isManagedBySystem: boolean;

  constructor(player: Player) {
    super(player.id, player.name);
    this._isManagedBySystem = false;
  }

  get isManagedBySystem() {
    return this._isManagedBySystem;
  }

  manageItByTheSystem(): void {
    this._isManagedBySystem = true;
  }
}
