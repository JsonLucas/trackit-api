import { Injectable } from "@nestjs/common";
import { prisma } from "src/constants/prisma";
import { AssignHabit, Assignment, IAssigmentRepository, IAssignment } from "src/entities/assignment";

@Injectable()
export class AssignmentRepository implements IAssigmentRepository{
    async create (body: Assignment): Promise<IAssignment> {
        return await prisma.assignedHabits.create({ data: body });
    }

    async getAssignmentSequenceCount (habitId: number): Promise<number>{
        return await prisma.assignedHabits.count({
            where: { habitId }
        });
    }

    async getByHabitUserId (userId: number): Promise<AssignHabit[]>{
        return await prisma.assignedHabits.findMany({ 
            where: { 
                habit: { 
                    userId 
                } 
            },
            select: {
                id: true,
                habitId: true,
                assignDate: true,
                habit: {
                    select: {
                        name: true,
                        userId: true,
                        week_days: true,
                        createdAt: true
                    }
                }
            } 
        });
    }

    async getByWeekDay (userId: number, weekDay: number): Promise<AssignHabit[]>{
        return await prisma.assignedHabits.findMany({
            where: {
                habit: {
                    userId,
                    week_days: { has: weekDay }
                }
            }, 
            select: {
                id: true,
                habitId: true,
                assignDate: true,
                habit: {
                    select: {
                        name: true,
                        userId: true,
                        week_days: true,
                        createdAt: true
                    }
                }
            }
        });
    }
}