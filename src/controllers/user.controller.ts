import { Controller, Get, Post, Request as Req, Response as Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  public async signUp(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const response = await this.userService.signUp(req.body);
    return res.status(response.code).send(response);
  }

  @Post('sign-in')
  public async signIn(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const response = await this.userService.signIn(req.body);
    return res.status(response.code).send(response);
  }
}