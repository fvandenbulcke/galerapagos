import Player from '@/domain/player/player';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UUID } from 'crypto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  registerPlayer(userName: string): Player {
    return this.usersService.register(userName);
  }
}
