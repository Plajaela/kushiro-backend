import { Request, Response, NextFunction } from "express";
import { DefaultResponse } from "../../../types";
import joi from "joi";
import reviewSchema from "../../schemas/review";

const Add = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const location = joi
			.string()
			.valid("AKAN", "MARSH", "MASHU", "IO")
			.required()
			.validate(req.params.location);
		if (location.error) throw location.error;
		// TODO: Figure out if i should migrate review to postgres so i can do innerjoin with the users table
		return res.status(200).json({
			status: 200,
			valid: true,
			code: "OK",
			message: "OK",
			data: null,
		} as DefaultResponse);
	} catch (e) {
		next(e);
	}
};

export default Add;
