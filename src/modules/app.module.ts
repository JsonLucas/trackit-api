import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { UserModule } from './user.module';
import { HabitModule } from './habit.module';
import { WebSocketGateway } from 'src/helpers/websocket.gateway';

@Module({
  imports: [UserModule, HabitModule],
  controllers: [AppController],
  providers: [AppService, WebSocketGateway],
})

export class AppModule {}

