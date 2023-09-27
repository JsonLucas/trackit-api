import { Habit } from "./habit";

export interface IAssignment {
    id: number,
    assignDate: Date,
    habitId: number
}

export type Assignment = Omit<IAssignment, 'id'>;
export type AssignHabit = IAssignment & { habit: Habit }; 

export interface IAssigmentRepository {
    create: (body: Assignment) => Promise<IAssignment>,
    getByHabitUserId: (userId: number) => Promise<Array<AssignHabit>>
    getByWeekDay: (userId: number, weekDay: number) => Promise<Array<AssignHabit>>
    getAssignmentSequenceCount: (habitId: number) => Promise<number>
}