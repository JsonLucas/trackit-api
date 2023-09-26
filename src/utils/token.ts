import { sign, decode, verify, JwtPayload } from 'jsonwebtoken';
import { jwtSecret } from 'src/constants/env';
import { IAuth } from 'src/entities/auth';
import { IGenericError } from 'src/entities/generic-object';

interface IAuthToken {
	decode: (accessToken: string) => number;
	generateAccessAuth: (userId?: number, oldAccessToken?: string, refreshToken?: string) => string | IAuth | IGenericError,
	generateRefreshToken: (userId: number) => string | IGenericError,
}

export class AuthToken implements IAuthToken {
	public decode(accessToken: string): number {
		const { refreshToken } = decode(accessToken, jwtSecret, { complete: true });
		const { userId } = decode(refreshToken, jwtSecret, { complete: true });
		return userId;
	}

	public generateAccessAuth (userId?: number, oldAccessToken?: string, refreshToken?: string): string | IAuth | IGenericError {
		try{
			if(refreshToken){
				const { payload } = verify(refreshToken, jwtSecret, { complete: true });
				const { userId } = payload as JwtPayload;
				const newRefreshToken = this.generateRefreshToken(userId as number);
				return sign({ refreshToken: newRefreshToken }, jwtSecret, { expiresIn: '7d' });
			}

			if(oldAccessToken){
				const { payload } = verify(oldAccessToken, jwtSecret, { complete: true });
				const { refreshToken } = payload as JwtPayload;

				const decoded = decode(refreshToken, { complete: true });
				const { userId } = decoded.payload as JwtPayload;
				
				const newRefreshToken = this.generateRefreshToken(userId as number);
				return sign({ refreshToken: newRefreshToken }, jwtSecret, { expiresIn: '7d' });
			}

			if(userId){
				const refreshToken = this.generateRefreshToken(userId) as string;
				const accessToken = sign({ refreshToken }, jwtSecret, { expiresIn: '7d' }) as string;
				return { refreshToken, accessToken };
			}
		} catch(e: any) {
			console.log(e);
			return { code: 403, message: e.message, error: e };
		}
	}

	public generateRefreshToken (userId: number): string | IGenericError {
		try{
			const refreshToken = sign({ userId }, jwtSecret, { expiresIn: '30d' });
			return refreshToken;
		} catch(e: any) {
			console.log(e);
			return { code: 403, message: e.message, error: e };
		}
	}
}