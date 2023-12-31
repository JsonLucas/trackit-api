import { Habit, IHabit, IHabitRepository, UpdateHabit } from "src/entities/habit";
import { prisma } from "../constants/prisma";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HabitRepository implements IHabitRepository {
    public async create (body: Habit): Promise<IHabit> {
        return await prisma.habits.create({ data: body });
    }

    public async updateById (id: number, body: UpdateHabit): Promise<IHabit | null> {
        return await prisma.habits.update({ data: body, where: { id } });
    }
    
    public async deleteById (id: number): Promise<void> {
        await prisma.habits.delete({ where: { id } });
        return;
    }
    
    public async getAllByUserId (userId: number): Promise<Array<IHabit | null>> {
        return await prisma.habits.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
    }
    
    public async getById (id: number): Promise<IHabit | null> {
        return await prisma.habits.findUnique({ where: { id } });
    }
    
    public async getByWeekDay (userId: number, day: number): Promise<Array<IHabit> | null> {
        return await prisma.habits.findMany({ 
            where: { 
                week_days: { 
                    has: day 
                }, 
                userId 
            },
            include: {
                assignment: {
                    select: {
                        assignDate: true,
                    }
                },
                records: {
                    select: {
                        currentRecord: true,
                        previousRecord: true
                    }
                }
            }
        });
    }
}