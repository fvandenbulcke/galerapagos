import { Module } from '@nestjs/common';
import { NotificationController } from '../infrastructure/messaging/sse.notification';
import { gameRepositry, notificationBroadCaster } from './beans';
import { NotificationBroadCaster } from '../infrastructure/messaging/notification.broadcaster';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [
    NotificationController,
    {
      provide: 'gameRepository',
      useValue: gameRepositry,
    },
    {
      provide: NotificationBroadCaster,
      useValue: notificationBroadCaster,
    },
  ],
  exports: [NotificationBroadCaster],
})
export class NotificationModule {}
