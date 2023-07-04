import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { IAuthApp } from 'src/entities/auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getAuth();
  }
}
