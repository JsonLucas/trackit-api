import "dotenv/config";
import { v4 as uuid } from 'uuid';

export const port = process.env.PORT || 5000;
export const jwtSecret = process.env.JWT_SECRET || uuid();
export const cryptoSecretKey = process.env.CRYPTO_SECRET || uuid();
export const cryptoIvKey = process.env.CRYPTO_IV_SECRET || uuid();
export const cryptoAlgorithm = process.env.CRYPTO_ALGORITHM || "AES-256-CBC";