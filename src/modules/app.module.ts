import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { UserModule } from './user.module';
import { HabitModule } from './habit.module';
import { WebSocketModule } from './websocket.module';

@Module({
  imports: [UserModule, HabitModule, WebSocketModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

