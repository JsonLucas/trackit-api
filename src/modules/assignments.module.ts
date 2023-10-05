import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AssignmentsController } from 'src/controllers/assignments.controller';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { AssignmentService } from 'src/services/assignment.service';
import { HabitModule } from './habit.module';
import { HabitService } from 'src/services/habit.service';
import { HabitRepository } from 'src/repositories/habit.repository';
import { AssignmentRepository } from 'src/repositories/assignment.repository';

@Module({
  imports: [],
  controllers: [AssignmentsController],
  providers: [AssignmentService, HabitService, HabitRepository, AssignmentRepository]
})
export class AssignmentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware);
  }
}
