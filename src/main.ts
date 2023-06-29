import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { port } from './constants/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`running at port ${port}`);
  await app.listen(3000);
}
bootstrap();
