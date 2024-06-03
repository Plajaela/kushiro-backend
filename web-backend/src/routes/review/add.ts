import { Request, Response, NextFunction } from "express";
import { DefaultResponse } from "../../../types";
import joi from "joi";
import reviewSchema from "../../schemas/review";

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
		const reviewObject = new reviewSchema({
			stars: review.value.stars,
			review: review.value.review,
			user_id: res.locals.user.id,
			location: review.value.location,
		});
		const dbUpload = await reviewObject.save().catch(() => null);
		if (dbUpload === null)
			throw new Error("Something went wrong when trying to save");
		return res.status(200).json({
			status: 200,
			valid: true,
			code: "OK",
			message: "OK",
			data: dbUpload,
		} as DefaultResponse);
	} catch (e) {
		next(e);
	}
};

export default Add;
