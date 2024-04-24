import Player from '@/domain/player/player';
import { Injectable } from '@nestjs/common';
import { UUID, randomUUID } from 'crypto';

export interface User {
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly mockedPlayers: Player[] = [];

  register(username: string): Player {
    const player = new Player(randomUUID(), username);
    this.mockedPlayers.push(player);
    return player;
  }

  findById(userId: UUID): Player | null {
    return this.mockedPlayers.find((player) => player.id === userId) ?? null;
  }
}
