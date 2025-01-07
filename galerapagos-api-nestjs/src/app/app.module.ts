import { Module } from '@nestjs/common';
import { PlayerModule } from './player.module';
import { GameModule } from './game.module';
import { AuthModule } from '@/app/auth.module';

@Module({
  imports: [AuthModule, PlayerModule, GameModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
