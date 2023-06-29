import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from 'src/services/user.service';

//forma de definir um endpoint
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  signUp(): string {
    return this.userService.getHello();
  }
}