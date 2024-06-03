import { Request, Response, NextFunction } from "express";
import { DefaultResponse } from "../../types";
const ErrorHandler = async (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return res.status(400).json({
		status: 400,
		valid: false,
		message: err.message,
		code: err.name,
		data: {
			path: req.path,
			error: err,
		},
	} as DefaultResponse);
};

export default ErrorHandler;
