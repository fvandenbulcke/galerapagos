import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HasCandidatureReviewMiddlewareService } from './has-candidature-review-middleware.service';
import { MiddlewareController } from './middleware.controller';

@Module({
  controllers: [MiddlewareController],
  providers: [],
})
export class MiddleWareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HasCandidatureReviewMiddlewareService)
      .forRoutes('candidature/reviews');
  }
}
