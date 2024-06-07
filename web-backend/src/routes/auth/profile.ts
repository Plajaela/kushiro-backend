import { Request, Response, NextFunction } from "express";
import { DefaultResponse } from "../../../types";
import { supabase } from "../..";
import joi from "joi";

const body = joi.object({
	first_name: joi.string().min(3).max(10),
	last_name: joi.string().min(3).max(10),
	phone: joi
		.string()
		.min(10)
		.max(15)
		.regex(/^\+?[1-9]\d{1,14}$/),
	location_1: joi.string().min(3).max(10),
	location_2: joi.string().min(3).max(10),
});

const Profile = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const bodyValidate = body.validate(req.body);
		if (bodyValidate.error) throw bodyValidate.error;
		const { error, data } = await supabase
			.from("users")
			.update(bodyValidate.value)
			.eq("user_id", res.locals.user.id);
		if (error) throw error;
		const newdata = await supabase
			.from("users")
			.select("*")
			.eq("user_id", res.locals.user.id);
		if (newdata.error) throw newdata.error;
		const updatemetadata = await supabase.auth.admin.updateUserById(
			res.locals.user.id,
			{
				user_metadata: bodyValidate.value,
			}
		);
		if (updatemetadata.error) throw updatemetadata.error;

		return res.status(200).json({
			status: 200,
			message: "OK",
			valid: true,
			code: "OK",
			data: updatemetadata.data.user,
		} as DefaultResponse);
	} catch (e) {
		next(e);
	}
};

export default Profile;
