import { Request, Response, NextFunction } from "express";
import { DefaultResponse } from "../../../types";
import { supabase } from "../..";
import joi from "joi";

const signupform = joi.object({
	email: joi.string().email().required(),
	password: joi.string().min(8).required(),
	username: joi.string().min(3).max(15).required(),
});

const Signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { error, value } = signupform.validate(req.body);
		if (error) throw error;
		const verify = await supabase
			.from("users")
			.select("*")
			.eq("email", value.email);
		if (verify.error) throw verify.error;
		if (verify.data.length !== 0) throw new Error("User already exists");
		const signup = await supabase.auth.signUp({
			email: value.email,
			password: value.password,
			options: {
				data: {
					email: value.email,
					username: value.username,
					first_name: "John",
					last_name: "Doe",
					location_1: "Hokkaido",
					location_2: "Japan",
					profile_picture_url:
						"https://uyceldzehojijmikgqtl.supabase.co/storage/v1/object/public/profile-pictures/default.png",
				},
			},
		});
		if (signup.error) throw signup.error;

		return res.status(200).json({
			status: 200,
			valid: true,
			message: "OK",
			code: "OK",
			data: signup.data.user,
		} as DefaultResponse);
	} catch (e) {
		next(e);
	}
};
export default Signup;
