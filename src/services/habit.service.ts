import { Injectable } from "@nestjs/common";
import { IGenericError, IGenericResponse } from "src/entities/generic-object";
import { createHabitSchema, updateHabitSchema } from "src/helpers/schemas/habitSchema";
import { HabitRepository } from "src/repositories/habit.repository";
import { Validator } from "src/utils/validator";

@Injectable()
export class HabitService {
    private validator = new Validator();

    constructor(private readonly HabitRepository: HabitRepository) {}

    public async createHabit(body: any): Promise<IGenericError | IGenericResponse> {
        try{
            const validated = await this.validator.validate(body, createHabitSchema);
            if(typeof(validated) !== 'boolean') return { code: 422, message: 'invalid object format', error: validated.error };

            const habit = await this.HabitRepository.create(body);
            if(!habit) return { code: 400, message: 'was not possible to create the habit' };

            return { code: 201, message: 'Habit successful created!' };
        } catch(e: any){
            console.log(e);
            return { code: 400, message: e.message, error: e };
        }
    }

    public async updateHabit(id: number, userId: number, body: any): Promise<IGenericError | IGenericResponse> {
        try {
            const validated = await this.validator.validate(body, updateHabitSchema);
            if(typeof(validated) !== 'boolean') return { code: 422, message: 'invalid object format', error: validated.error };

            const habit = await this.HabitRepository.getById(id);

            if(!habit) return { code: 404, message: 'Habit not found.' };
            if(habit.userId !== userId) return { code: 403, message: 'Not allowed to do this operation.' };

            const updated = await this.HabitRepository.updateById(id, body);
            if(!updated) return { code: 400, message: 'Was not possible update this habit.' };

            return { code: 200, message: 'Habit successful updated!' };
        } catch (e: any) {
            console.log(e);
            return { code: 400, message: e.message, error: e };
        }
    }

    public async getHabitById(userId: number, id: number): Promise<IGenericError | IGenericResponse> {
        try{
            const habit = await this.HabitRepository.getById(id);
            if(!habit) return { code: 404, message: 'Habit not found.' };

            if(habit.userId !== userId) return { code: 404, message: 'Habit not found.' };

            return { code: 200, data: habit };
        }catch(e: any){
            console.log(e);
            return { code: 400, message: e.message, error: e };
        }
    }

    public async getHabitsByWeekDay(userId: number, day: number): Promise<IGenericError | IGenericResponse> {
        try {
            const habits = await this.HabitRepository.getByWeekDay(userId, day);
            console.log(habits);
            if(!habits) return { code: 404, message: 'Habits not found for this week day.' };

            return { code: 200, data: habits };
        } catch (e: any) {
            console.log(e);
            return { code: 400, message: e.message, error: e };
        }
    }

    public async getHabitsByUserId(userId: number): Promise<IGenericError | IGenericResponse> {
        try {
            const habits = await this.HabitRepository.getAllByUserId(userId);
            if(!habits) return { code: 404, message: 'There is no habits for now.' };

            return { code: 200, data: habits };
        } catch (e: any) {
            console.log(e);
            return { code: 400, message: e.message, error: e };
        }
    }

    public async deleteHabitById(id: number, userId: number): Promise<IGenericError | IGenericResponse> {
        try {
            const habit = await this.HabitRepository.getById(id);

            if(!habit) return { code: 404, message: 'Habit not found.' };
            if(habit.userId !== userId) return { code: 403, message: 'Not allowed to do this operation.' };

            await this.HabitRepository.deleteById(id);
            return { code: 204, message: 'Habit deleted.' };
        } catch (e: any) {
            console.log(e);
            return { code: 400, message: e.message, error: e };
        }
    }
}