import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { port } from './constants/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port, () => {
    console.log(`running at port ${port}`);
  });
}
bootstrap();
