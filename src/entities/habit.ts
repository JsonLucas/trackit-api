export interface IHabit {
	id: number
	name: string
	week_days: Array<number>
	userId: number
	createdAt?: Date
	updatedAt?: Date
}
export type Habit = Omit<IHabit, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateHabit = Pick<IHabit, 'name' | 'week_days'>;

export interface IHabitRepository {
	create: (body: Habit) => Promise<IHabit>;
	updateById: (id: number, body: UpdateHabit) => Promise<IHabit | null>;
	deleteById: (id: number) => Promise<number | void>;
	getAllByUserId: (userId: number) => Promise<Array<IHabit> | null>;
	getById: (id: number) => Promise<IHabit | null>;
	getByWeekDay: (userId: number, day: number) => Promise<Array<IHabit> | null>;
}