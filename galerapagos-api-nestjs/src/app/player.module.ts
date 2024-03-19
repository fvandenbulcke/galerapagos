import { Module } from '@nestjs/common';
import { PlayerController } from 'src/infrastructure/api/player.controller';
import { playerRepository } from './beans';

@Module({
  imports: [],
  controllers: [PlayerController],
  providers: [
    PlayerController,
    {
      provide: 'PlayerRepository',
      useValue: playerRepository,
    },
  ],
  exports: [],
})
export class PlayerModule {}
