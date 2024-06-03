import { Request, Response, NextFunction, Router } from "express";
import { DefaultResponse } from "../../types";

import AuthRouter from "./auth/authrouter";
const router = Router();

router.use("/auth", AuthRouter);

router.all("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.status(200).json({
			status: 200,
			valid: true,
			message: "OK",
			code: "OK",
			data: {
				path: req.path,
			},
		} as DefaultResponse);
	} catch (e) {
		next(e);
	}
});

export default router;
