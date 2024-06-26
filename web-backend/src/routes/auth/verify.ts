import { Request, Response, NextFunction } from "express";
import { DefaultResponse } from "../../../types";
import { supabase } from "../..";
import joi from "joi";

const Verify = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.query.token;
		const email = req.query.email;
		const verifyToken = joi
			.string()
			.length(6)
			.regex(/^[0-9]{6}$/)
			.required()
			.validate(token);
		const verifyEmail = joi.string().email().required().validate(email);
		if (verifyToken.error) throw verifyToken.error;
		if (verifyEmail.error) throw verifyEmail.error;

		const { data, error } = await supabase.auth.verifyOtp({
			email: verifyEmail.value,
			token: verifyToken.value,
			type: "email",
		});
		if (error) throw error;
		if (!data.user) throw new Error("User not found");

		const writeDatabase = await supabase.from("users").insert({
			user_id: data.user?.id,
			email: data.user?.email,
			username: data.user?.user_metadata.username,
			first_name: data.user.user_metadata.first_name,
			last_name: data.user.user_metadata.last_name,
			location_1: data.user.user_metadata.location_1,
			location_2: data.user.user_metadata.location_2,
			profile_picture_url: data.user.user_metadata.profile_picture_url,
		});
		if (writeDatabase.error) throw writeDatabase.error;

		return res.status(200).json({
			status: 200,
			valid: true,
			message: "OK",
			code: "OK",
			data,
		} as DefaultResponse);
	} catch (e) {
		next(e);
	}
};
export default Verify;
