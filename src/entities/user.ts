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
  getUserById: (id: number) => Promise<IUser | null>;
  getUserByEmail: (email: string) => Promise<IUser | null>;
}
