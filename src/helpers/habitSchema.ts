// import joi from 'joi';
const joi = require('joi');

export const createHabitSchema = joi.object({
    name: joi.string().required(),
    week_days: joi.array().required(),
    userId: joi.number().required()
});

export const updateHabitSchema = joi.object({
    name: joi.string().required(),
    week_days: joi.array().required(),
});