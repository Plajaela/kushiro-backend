import { Request, Response, NextFunction } from "express";
import { DefaultResponse } from "../../../types";
import { supabase } from "../..";
import joi from "joi";

const reviewbody = joi.object({
	stars: joi.number().min(0).max(5).required(),
	review: joi.string().min(5).max(100).required(),
	location: joi.string().valid("AKAN", "MARSH", "MASHU", "IO").required(),
});

const Add = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const review = reviewbody.validate(req.body);
		if (review.error) throw review.error;
		if (!res.locals.user) throw new Error("User object not found");

		const { data, error } = await supabase.from("reviews").insert({
			user_id: res.locals.user.id,
			stars: review.value.stars,
			review: review.value.review,
			location: review.value.location,
		});
		if (error) throw error;

		return res.status(200).json({
			status: 200,
			valid: true,
			code: "OK",
			message: "OK",
			data: data,
		} as DefaultResponse);
	} catch (e) {
		next(e);
	}
};

export default Add;
