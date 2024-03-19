import { Module } from '@nestjs/common';
import { PlayerModule } from './player.module';
import { GameModule } from './game.module';

@Module({
  imports: [PlayerModule, GameModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
