import { Request, Response, NextFunction } from "express";
import { DefaultResponse } from "../../../types";
import { supabase } from "../..";
import joi from "joi";

const loginparam = joi.object({
	email: joi.string().email().required(),
	password: joi.string().min(8).required(),
});

const Login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = loginparam.validate(req.body);
		if (body.error) throw body.error;
		const { error, data } = await supabase.auth.signInWithPassword({
			email: body.value.email,
			password: body.value.password,
		});
		if (error) throw error;

		return res.status(200).json({
			status: 200,
			valid: true,
			message: "OK",
			code: "OK",
			data: data.session,
		} as DefaultResponse);
	} catch (e) {
		next(e);
	}
};
export default Login;
