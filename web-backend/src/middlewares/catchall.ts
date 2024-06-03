import { Request, Response, NextFunction } from "express";
import { DefaultResponse } from "../../types";
const CatchAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.status(404).json({
			status: 404,
			valid: false,
			message: "Not Found",
			code: "NOTFOUND",
			data: {
				path: req.path,
			},
		} as DefaultResponse);
	} catch (e) {
		next(e);
	}
};

export default CatchAll;
