import { Request, Response, NextFunction } from "express";
import { DefaultResponse } from "../../../types";
import { supabase } from "../..";
import joi from "joi";

const Authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers.authorization;
		if (token === undefined) throw new Error("Authorization header not found");

		const { error, data } = await supabase.auth.getUser(token);
		if (error) throw error;

		return res.status(200).json({
			status: 200,
			valid: true,
			message: "OK",
			code: "OK",
			data: data.user,
		} as DefaultResponse);
	} catch (e) {
		next(e);
	}
};
export default Authenticate;
