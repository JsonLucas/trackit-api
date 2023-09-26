import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { port } from './constants/env';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as http from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = http.createServer(app.getHttpAdapter().getInstance());
  app.enableCors();
  app.useWebSocketAdapter(new IoAdapter(server));
  await app.listen(port);
  console.log(`running at port ${port}`);
}
bootstrap();
