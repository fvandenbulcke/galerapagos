import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import expressSession from 'express-session';
import passport from 'passport';
import { UserSerializer } from './user.serializer';

// https://aurelienbrabant.fr/blog/session-based-authentication-with-nestjs

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, UserSerializer],
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
