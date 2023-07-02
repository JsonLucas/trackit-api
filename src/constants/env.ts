import "dotenv/config";
import { v4 as uuid } from 'uuid';

export const port = process.env.SERVER_PORT || 3000;
export const jwtSecret = process.env.JWT_SECRET || uuid();