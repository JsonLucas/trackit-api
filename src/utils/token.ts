import jsonwebtoken from 'jsonwebtoken';
import { jwtSecret } from 'src/constants/env';

interface IAuthToken {
	generateAccessToken: (userId: number, oldAccessToken?: string) => string,
	generateRefreshToken: (userId: number) => string
}

export class AuthToken implements IAuthToken {
	generateAccessToken (userId: number, oldAccessToken?: string): string {
		try{
			if(oldAccessToken){
				//implementar logica de validar o refresh token extraído do accessToken
			}
			return "";
		} catch(e: any) {
			throw { code: 403, error: e.message };
		}
	}

	generateRefreshToken (userId: number): string {
		try{
			const refreshToken = jsonwebtoken.sign({ userId }, jwtSecret, { expiresIn: '1d' });
			return refreshToken;
		} catch(e: any) {
			throw { code: 403, error: e.message };
		}
	}
}