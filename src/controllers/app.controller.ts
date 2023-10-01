import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Request, Response } from 'express';
import { UserService } from 'src/services/user.service';
import { AuthToken } from 'src/utils/token';

@Controller()
export class AppController {
  private token: AuthToken = new AuthToken();
  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  public async mainRoute(@Req() req: Request, @Res() res: Response) {
    const { authorization } = req.headers;
    const userId = this.token.decode(authorization.split(' ')[1]);
    if(!userId) res.status(401).send({ message: 'don\'t have permission.' });

    const response = await this.userService.getUserData(userId);
    res.status(response.code).send(response);
  }
}
