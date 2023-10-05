import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { UserModule } from './user.module';
import { HabitModule } from './habit.module';
import { WebSocketModule } from './websocket.module';
import { UserService } from 'src/services/user.service';
import { UserRepository } from 'src/repositories/user.repository';
import { AssignmentRepository } from 'src/repositories/assignment.repository';
import { AssignmentsModule } from './assignments.module';
import { HabitRepository } from 'src/repositories/habit.repository';
import { HabitService } from 'src/services/habit.service';
import { AssignmentService } from 'src/services/assignment.service';
import { UserController } from 'src/controllers/user.controller';

@Module({
  imports: [UserModule, HabitModule, AssignmentsModule, WebSocketModule],
  controllers: [AppController],
  providers: [],
})

export class AppModule {}

