export interface IHabit {
	id: number
	name: string
	week_days: Array<number>
	userId: number
	createdAt?: Date
	updatedAt?: Date
}
export type Habit = Omit<IHabit, 'id' | 'createdAt' | 'updatedAt'>;