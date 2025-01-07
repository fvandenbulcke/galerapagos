import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import expressSession from 'express-session';
import passport from 'passport';
import { LocalStrategy } from '@/infrastructure/auth/local.strategy';
import { PlayerSerializer } from '@/infrastructure/auth/player.serializer';
import { AuthController } from '@/infrastructure/api/auth.controller';
import { PlayerModule } from './player.module';
import { playerRepository } from './beans';

// https://aurelienbrabant.fr/blog/session-based-authentication-with-nestjs

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [
    LocalStrategy,
    PlayerSerializer,
    {
      provide: 'PlayerRepository',
      useValue: playerRepository,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        expressSession({
          secret: 'SOME SESSION SECRET',
          resave: false,
          saveUninitialized: false,
        }),
        passport.session(),
      )
      .forRoutes('*');
  }
}
