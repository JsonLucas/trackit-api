import { Injectable } from "@nestjs/common";
import { prisma } from "src/constants/prisma";
import { IUser, IUserRepository, User } from "src/entities/user";

@Injectable()
export class UserRepository implements IUserRepository {
	async create (body: User): Promise<IUser>{
		return await prisma.users.create({ data: body });
	}
	
	async getById (id: number): Promise<IUser | null>{
		return await prisma.users.findUnique({ where: { id } });
	}

	async getByEmail (email: string): Promise<IUser | null>{
		return await prisma.users.findUnique({ where: { email } });
	}
}