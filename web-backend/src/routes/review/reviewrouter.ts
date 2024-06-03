import { Request, Response, NextFunction, Router } from "express";
import { DefaultResponse } from "../../../types";
import Authenticate from "../../middlewares/authenticate";
import Add from "./add";
import List from "./list";
const ReviewRouter = Router();
ReviewRouter.post("/add", Authenticate, Add);
ReviewRouter.get("/list/:location", List);
ReviewRouter.all(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
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
	}
);

export default ReviewRouter;
