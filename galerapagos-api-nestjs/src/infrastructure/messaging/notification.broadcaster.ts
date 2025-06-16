import { MessageEvent } from '@nestjs/common';
import { UUID } from 'crypto';
import { Subject } from 'rxjs';
import { Game, Player } from '../../domain/models';
import {
  buildConnectResponse,
  buildGameResponse,
} from '../api/response/response.builder';

export class NotificationBroadCaster {
  private playerSessions = new Map<UUID, Subject<MessageEvent>>();

  register(player: Player): Subject<MessageEvent> {
    const playerMessage = new Subject<MessageEvent>();
    this.playerSessions.set(player.id, playerMessage);
    setTimeout(function () {
      playerMessage.next({ data: buildConnectResponse(player) });
    }, 1);
    return playerMessage;
  }

  broadCastGameState(game: Game): void {
    game.players.forEach((p) => {
      const response = buildGameResponse(p)(game);
      this.playerSessions.get(p.id)?.next({ data: response });
    });
  }
}
