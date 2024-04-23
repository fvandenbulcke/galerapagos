import { Module } from '@nestjs/common';
import { PlayerModule } from './player.module';
import { GameModule } from './game.module';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [PlayerModule, GameModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
