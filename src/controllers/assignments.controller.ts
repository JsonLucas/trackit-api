import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AssignmentService } from "src/services/assignment.service";
import { AuthToken } from "src/utils/token";

@Controller('assignment')
export class AssignmentsController {
    public token = new AuthToken();
    constructor(private readonly assignmentService: AssignmentService){}

    @Get('sequence/:habitId')
    public async getAssignmentSequenceCount(@Req() req: Request, @Res() res: Response) {
        const { habitId } = req.params;
        if(isNaN(Number(habitId)) || !habitId) return res.status(400).send({ message: 'invalid param format.' });

        const response = await this.assignmentService.getAssignmentSequenceCount(Number(habitId));
        res.status(response.code).send(response);
    }

    @Get()
    public async getAssignmentByUserId(@Req() req: Request, @Res() res: Response){
        const accessToken = req.headers.authorization.split(' ')[1];
        const userId = this.token.decode(accessToken);

        const response = await this.assignmentService.getAssignmentByUserId(userId);
        res.status(response.code).send(response);
    }

    @Get('/:weekDay')
    public async getAssignmentByWeekDay(@Req() req: Request, @Res() res: Response){
        const { weekDay } = req.params;
        const accessToken = req.headers.authorization.split(' ')[1];
        const userId = this.token.decode(accessToken);
        if(isNaN(Number(weekDay)) || !weekDay) return res.status(400).send({ message: 'invalid param format.' });

        const response = await this.assignmentService.getAssignmentByWeekDay(userId, Number(weekDay));
        res.status(response.code).send(response);
    }
    
    @Post('create/:habitId')
    public async createAssignment(@Req() req: Request, @Res() res: Response) {
        const { habitId } = req.params;
        if(isNaN(Number(habitId)) || !habitId) return res.status(400).send({ message: 'missing a required param.' });

        const body = { habitId: Number(habitId), assignDate: new Date() };
        const response = await this.assignmentService.createAssignment(body);
        res.status(response.code).send(response);
    }
}