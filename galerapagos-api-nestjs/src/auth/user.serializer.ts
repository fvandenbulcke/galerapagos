import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User, UsersService } from '../users/users.service';
import { UUID } from 'crypto';
import Player from '@/domain/player/player';

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: Player, done: (param: string, user: string) => any) {
    done(null, user.id);
  }

  deserializeUser(userId: UUID, done: (param: string, user: Player) => any) {
    const player = this.usersService.findById(userId);

    if (!player) {
      return done(
        `Could not deserialize user: user with ${userId} could not be found`,
        null,
      );
    }

    done(null, player);
  }
}
