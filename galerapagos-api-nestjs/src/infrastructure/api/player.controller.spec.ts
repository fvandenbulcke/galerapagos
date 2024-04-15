import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
// import { AppService } from '../../app.service';

describe('AppController', () => {
  let playerController: PlayerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      // providers: [AppService],
    }).compile();

    playerController = app.get<PlayerController>(PlayerController);
  });

  xdescribe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(playerController.getPlayer()).toBe('Hello World!');
    });
  });
});
