import mongoose from "mongoose";
const Review = new mongoose.Schema(
	{
		stars: {
			type: Number,
			required: true,
		},
		review: {
			type: String,
			required: true,
		},
		user_id: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			enum: ["AKAN", "MARSH", "MASHU", "IO"],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("reviews", Review);
