import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { PlayerModule } from './player.module';
import { GameModule } from './game.module';

@Module({
  imports: [AuthModule, PlayerModule, GameModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
