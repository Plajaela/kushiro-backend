import { Request, Response, NextFunction } from "express";
import { DefaultResponse } from "../../types";
import { supabase } from "..";
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
		res.locals.user = data.user;
		return next();
	} catch (e) {
		next(e);
	}
};

export default Authenticate;
