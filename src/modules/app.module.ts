import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { UserModule } from './user.module';
import { HabitModule } from './habit.module';
import { WebSocketModule } from './websocket.module';
import { UserService } from 'src/services/user.service';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  imports: [UserModule, HabitModule, WebSocketModule],
  controllers: [AppController],
  providers: [AppService, UserService, UserRepository],
})

export class AppModule {}

