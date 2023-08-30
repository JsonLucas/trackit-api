import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthToken } from 'src/utils/token';

export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;
		if(!authorization) return res.status(401).send({ message: 'You don\'t have permission to access this page.' });

		const auth = authorization.split(" ");
		if(auth[0].toLowerCase() !== "bearer") return res.status(401).send({ message: 'Invalid auth format.' });	
		
		const token = new AuthToken();
		const accessToken = token.generateAccessAuth(undefined, auth[1]);
		res.locals.accessToken = accessToken;
        next();
    }
}