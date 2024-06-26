import express from "express";
import dotenv from "dotenv";
import consola from "consola";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
// import mongoose from "mongoose";
import { createClient } from "@supabase/supabase-js";

import CatchAll from "./middlewares/catchall";
import ErrorHandler from "./middlewares/error";
import router from "./routes/router";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// if (MONGODB_URI === undefined)
// 	throw new Error("MONGODB_URI Not Provided. Aborting Startup");
if (SUPABASE_URL === undefined)
	throw new Error("SUPABASE_URL Not Provided. Aborting Startup");
if (SUPABASE_KEY === undefined)
	throw new Error("SUPABASE_KEY Not Provided. Aborting Startup");

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(
	cors({
		credentials: true,
		origin(requestOrigin, callback) {
			callback(null, requestOrigin);
		},
	})
);
app.use(router);
app.use("*", CatchAll);
app.use(ErrorHandler);

app.listen(PORT, async () => {
	console.clear();
	consola.ready(`Listening on PORT ${PORT}`);
	// mongoose.connection.on("error", (err) => consola.error(err));
	// mongoose.connection.on("connecting", () =>
	// 	consola.info("Connecting to MongoDB")
	// );
	// mongoose.connection.on("connected", () =>
	// 	consola.success("Connected to MongoDB")
	// );
	// mongoose.connection.on("disconnecting", () =>
	// 	consola.info("Disconnecting from MongoDB")
	// );
	// mongoose.connection.on("disconnected", () =>
	// 	consola.success("Disconnected from MongoDB")
	// );
	// await mongoose.connect(MONGODB_URI);
});

process.on("SIGINT", async () => {
	// await mongoose.connection.close();
	process.exit();
});

export { supabase };
