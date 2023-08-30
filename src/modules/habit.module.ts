import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { HabitController } from "src/controllers/habit.controller";
import { AuthMiddleware } from "src/middleware/auth.middleware";
import { HabitRepository } from "src/repositories/habit.repository";
import { HabitService } from "src/services/habit.service";

@Module({
    imports: [],
    providers: [HabitRepository, HabitService],
    controllers: [HabitController]
})
export class HabitModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('create');
    }
}
