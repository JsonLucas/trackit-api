export interface IUser {
	id: number;
	name: string;
	email: string;
	password: string;
	picture?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
export type User = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;

export interface IUserRepository {
	create: (body: User) => Promise<IUser>;
	getById: (id: number) => Promise<IUser | null>;
	getByEmail: (email: string) => Promise<IUser | null>;
}

export interface IUserValidator {
	create: (body: User) => Promise<IUser>;
	getById: (id: number) => Promise<IUser>;
	getByEmail: (email: string) => Promise<IUser>;
}
