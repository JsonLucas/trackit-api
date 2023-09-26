import { Controller, Post, Get, Request as Req, Response as Res, Put, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import { HabitService } from 'src/services/habit.service';
import { AuthToken } from 'src/utils/token';

// verificar a causa do não funcionamento do middleware

@Controller('habit')
export class HabitController {
    private token = new AuthToken();
    constructor(private readonly HabitService: HabitService){ }

    @Get()
    public async getHabitByUserId(@Req() req: Request, @Res() res: Response){
        try{
            // const { accessToken } = res.locals;
            const accessToken = req.headers.authorization.split(' ')[1];
            const userId = this.token.decode(accessToken);
            const response = await this.HabitService.getHabitsByUserId(userId );
            return res.status(response.code).send(response);
        } catch(e: any){
            console.log(e);
            res.status(500).send(e);
        }
    }

    @Post('create')
    public async createHabit(@Req() req: Request, @Res() res: Response) {
        try{
            // const { accessToken } = res.locals;
            const accessToken = req.headers.authorization.split(' ')[1];
            console.log(accessToken);
            const userId = this.token.decode(accessToken);
            const responseHabit = await this.HabitService.createHabit({ ...req.body, userId });
            return res.status(responseHabit.code).send(responseHabit);
        } catch(e: any){
            console.log(e);
            res.status(500).send(e);
        }
    }

    @Put('/update/:id')
    public async updateHabit(@Req() req: Request, @Res() res: Response) {
        try {
            const { id } = req.params
            if(isNaN(Number(id))) return res.status(400).send({ message: 'Invalid param format' });

            // const { accessToken } = res.locals;
            const accessToken = req.headers.authorization.split(' ')[1];
            const userId = this.token.decode(accessToken);
            const response = await this.HabitService.updateHabit(Number(id), userId, req.body);
            return res.status(response.code).send(response);
        } catch (e: any) {
            console.log(e);
            res.status(500).send(e);
        }
    }

    @Get('/:id')
    public async getHabitById(@Req() req: Request, @Res() res: Response) {
        try{
            const { id } = req.params;
            if(isNaN(Number(id))) return res.status(400).send({ message: 'invalid param format.' });
            
            // const { accessToken } = res.locals;
            const accessToken = req.headers.authorization.split(' ')[1];
            const userId = this.token.decode(accessToken);
            const response = await this.HabitService.getHabitById(userId, Number(id));
            
            return res.status(response.code).send(response);
        } catch(e: any){
            console.log(e);
            res.status(500).send(e);
        }
    }

    @Get('/:weekday')
    public async getHabitsByWeekDay(@Req() req: Request, @Res() res: Response) {
        try {
            const { weekday } = req.params;
            if(isNaN(Number(weekday))) return res.status(400).send({ message: 'invalid param format.' });
            
            // const { accessToken } = res.locals;
            const accessToken = req.headers.authorization.split(' ')[1];
            const userId = this.token.decode(accessToken);
            const response = await this.HabitService.getHabitsByWeekDay(userId, Number(weekday));

            return res.status(response.code).send(response);
        } catch (e: any) {
            console.log(e);
            res.status(500).send(e);
        }
    }

    @Delete('/:id')
    public async deleteHabit(@Req() req: Request, @Res() res: Response) {
        try {
            const { id } = req.params;
            if(isNaN(Number(id))) return res.status(400).send({ message: 'invalid param format.' });
            
            // const { accessToken } = res.locals;
            const accessToken = req.headers.authorization.split(' ')[1];
            const userId = this.token.decode(accessToken);
            const response = await this.HabitService.deleteHabitById(userId, Number(id));

            return res.status(response.code).send(response);
        } catch (e: any) {
            console.log(e);
            res.status(500).send(e);
        }
    }
}