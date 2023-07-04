import { Injectable } from '@nestjs/common';
import { request, response } from 'express';
import { IAuthApp } from 'src/entities/auth';
import { AuthToken } from 'src/utils/token';

@Injectable()
export class AppService {
	getAuth(): string {
		const { authorization } = request.headers;
		if(!authorization) {
			response.status(401).send('You don\'t have permission to access this page.');
			return "";
		}

		const auth = authorization.split(" ");
		if(auth[0].toLowerCase() !== "bearer") {
			response.status(401).send('Invalid auth format.');	
			return "";
		}
		
		const token = new AuthToken();
		const accessToken = token.generateAccessAuth(auth[1]);
		return accessToken;
	}
}
