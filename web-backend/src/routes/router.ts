import { Request, Response, NextFunction, Router } from "express";
import { DefaultResponse } from "../../types";

import AuthRouter from "./auth/authrouter";
import ReviewRouter from "./review/reviewrouter";
const router = Router();

router.use("/auth", AuthRouter);
router.use("/review", ReviewRouter);

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
