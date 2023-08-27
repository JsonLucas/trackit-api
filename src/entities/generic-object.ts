export interface IGenericObject {
	[key: string]: any
}

export interface IGenericError {
	code: number,
	message: string,
	error?: IGenericObject
}

export interface IGenericResponse {
	code: number,
	message?: string,
	data?: IGenericObject
}