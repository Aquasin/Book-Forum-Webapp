import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		createdBy: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
