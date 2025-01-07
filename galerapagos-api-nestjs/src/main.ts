import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import paths from './infrastructure/api/routing/paths';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:8080',
  });
  app.setGlobalPrefix(paths.app);
  await app.listen(3000);
}

bootstrap();
