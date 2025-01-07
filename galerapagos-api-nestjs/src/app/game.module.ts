import { Module } from '@nestjs/common';
import { GameController } from 'src/infrastructure/api/game.controller';
import { GameManager } from '@/infrastructure/gameManager/game.manager';
import { gameManager, playerRepository } from './beans';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [
    GameController,
    {
      provide: GameManager,
      useValue: gameManager,
    },
    {
      provide: 'PlayerRepository',
      useValue: playerRepository,
    },
  ],
  exports: [GameController],
})
export class GameModule {}
