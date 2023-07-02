import { prisma } from "src/constants/prisma";
import { IUser, IUserRepository, User } from "src/entities/user";

export class UserRepository implements IUserRepository {
	async create (body: User): Promise<IUser>{
		return await prisma.User.create({data: body});
	}
	
	async getById (id: number): Promise<IUser | null>{
		return await prisma.User.findUnique({ where: { id } });
	}

	async getByEmail (email: string): Promise<IUser | null>{
		return await prisma.User.findUnique({ where: { email } });
	}
}