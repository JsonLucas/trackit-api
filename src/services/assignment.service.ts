import { Injectable } from "@nestjs/common";
import { Assignment } from "src/entities/assignment";
import { IGenericError, IGenericResponse } from "src/entities/generic-object";
import { AssignmentRepository } from "src/repositories/assignment.repository";
import { HabitRepository } from "src/repositories/habit.repository";

@Injectable()
export class AssignmentService{
    constructor(
        private readonly assignmentRepository: AssignmentRepository,
        private readonly habitRepository: HabitRepository
    ){}
    
    public async getAssignmentSequenceCount(habitId: number): Promise<IGenericError | IGenericResponse> {
        const habit = await this.habitRepository.getById(habitId);
        if(!habit) return { code: 404, message: 'habit not found.' };

        const assignment = await this.assignmentRepository.getAssignmentSequenceCount(habitId);
        if(!assignment) return { code: 404, message: 'habit not found.' };

        return { code: 200, data: { count: assignment } };
    }

    public async getAssignmentByUserId(userId: number): Promise<IGenericError | IGenericResponse> {
        const assignment = await this.assignmentRepository.getByHabitUserId(userId);
        if(!assignment) return { code: 404, message: 'assignment not found.' };

        return { code: 200, data: assignment };
    }

    public async getAssignmentByWeekDay(userId: number, weekDay: number): Promise<IGenericError | IGenericResponse> {
        const assignment = await this.assignmentRepository.getByWeekDay(userId, weekDay);
        if(!assignment) return { code: 404, message: 'assignment not found.' };

        return { code: 200, data: assignment };
    }
    
    public async createAssignment(body: Assignment): Promise<IGenericError | IGenericResponse> {
        await this.assignmentRepository.create(body);

        return { code: 201, message: 'assignment successfuly created!' };
    }
}