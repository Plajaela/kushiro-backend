import { Request, Response, NextFunction } from "express";
import { DefaultResponse } from "../../../types";
import joi from "joi";
import { supabase } from "../..";

const Add = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const location = joi
			.string()
			.valid("AKAN", "MARSH", "MASHU", "IO")
			.required()
			.validate(req.params.location);
		if (location.error) throw location.error;
		const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
		const page = req.query.page ? parseInt(req.query.page as string) : 0;

		const query = await supabase
			.from("reviews")
			.select("*, users(first_name, last_name, profile_picture_url) as user")
			.eq("location", location.value)
			.order("created_at", {
				ascending: false,
			})
			.range(page * limit, page * limit + limit - 1);
		if (query.error) throw query.error;
		return res.status(200).json({
			status: 200,
			valid: true,
			code: "OK",
			message: "OK",
			data: query.data,
		} as DefaultResponse);
	} catch (e) {
		next(e);
	}
};

export default Add;
