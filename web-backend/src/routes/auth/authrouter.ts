import { Request, Response, NextFunction, Router } from "express";
import { DefaultResponse } from "../../../types";

import Login from "./login";
import Signup from "./signup";
import Verify from "./verify";
import Authenticate from "./authenticate";

const router = Router();

router.post("/login", Login);
router.post("/signup", Signup);
router.post("/verify", Verify);
router.post("/authenticate", Authenticate);

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
