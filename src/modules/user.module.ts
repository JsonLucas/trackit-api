import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UserRepository } from 'src/repositories/user.repository';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('sign-in');
  }
}
