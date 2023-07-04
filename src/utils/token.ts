import { sign, decode, verify, JwtPayload } from 'jsonwebtoken';
import { jwtSecret } from 'src/constants/env';

interface IAuthToken {
	generateAccessAuth: (oldAccessToken?: string) => string,
	generateRefreshToken: (userId: number) => string,
}

export class AuthToken implements IAuthToken {
	generateAccessAuth (oldAccessToken?: string, refreshToken?: string): string {
		try{
			if(refreshToken){
				const { payload } = verify(refreshToken, jwtSecret, { complete: true });
				const { userId } = payload as JwtPayload;
				const newRefreshToken = this.generateRefreshToken(userId as number);
				return sign(newRefreshToken, jwtSecret, { expiresIn: '7d' });
			}

			if(oldAccessToken){
				const { payload } = verify(oldAccessToken, jwtSecret, { complete: true });
				const { refreshToken } = payload as JwtPayload;

				const decoded = decode(refreshToken, { complete: true });
				const { userId } = decoded.payload as JwtPayload;
				
				const newRefreshToken = this.generateRefreshToken(userId as number);
				return sign(newRefreshToken, jwtSecret, { expiresIn: '7d' });
			}
		} catch(e: any) {
			throw { code: 403, error: e.message };
		}
	}

	generateRefreshToken (userId: number): string {
		try{
			const refreshToken = sign({ userId }, jwtSecret, { expiresIn: '30d' });
			return refreshToken;
		} catch(e: any) {
			throw { code: 403, error: e.message };
		}
	}
}