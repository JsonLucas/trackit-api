import Joi from "joi";
import { IGenericError, IGenericObject } from "src/entities/generic-object";
import { INVALID_SCHEMA_ERROR } from "src/errors";

export interface IValidator<S, O>{
	validate: (payload: IGenericObject, schema: S, options?: O) => Promise<boolean | IGenericError>;
}

export class Validator implements IValidator<Joi.ObjectSchema, Joi.AsyncValidationOptions> {
	async validate(payload: IGenericObject, schema: Joi.ObjectSchema, options?: Joi.AsyncValidationOptions) {
		try {
			await schema.validateAsync(payload, options);
			return true;
		} catch(e: any) {
			console.log(e);
			return { ...INVALID_SCHEMA_ERROR, error: e };
		}
	}
}