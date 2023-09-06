const joi = require('joi');
// import Joi from 'joi';

export const signUpSchema = joi.object({
	name: joi.string().required(),
	email: joi.string().email().required(),
	password: joi.string().required(),
	confirmPassword: joi.ref('password'),
	picture: joi.string().allow('')
});

export const signInSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required(),
});