import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AssignmentsController } from "src/controllers/assignments.controller";
import { AuthMiddleware } from "src/middleware/auth.middleware";
import { AssignmentService } from "src/services/assignment.service";
import { HabitService } from "src/services/habit.service";

@Module({
    imports: [],
    providers: [AuthMiddleware, HabitService, AssignmentService],
    controllers: [AssignmentsController]
})
export class AssignmentsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('create', 'get');
    }
}