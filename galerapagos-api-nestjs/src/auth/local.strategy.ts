import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { AuthService } from './auth.service';
import Player from '@/domain/player/player';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  validate(request: Request): Player {
    return (
      (request.user as Player) ||
      this.authService.registerPlayer(request.body.userName)
    );
  }
}
