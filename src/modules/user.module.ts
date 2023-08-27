import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UserRepository } from 'src/repositories/user.repository';
import { UserService } from 'src/services/user.service';
import { Crypto } from 'src/utils/crypto';
import { Validator } from 'src/utils/validator';

@Module({
  imports: [Validator, Crypto],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('sign-in');
  }
}
