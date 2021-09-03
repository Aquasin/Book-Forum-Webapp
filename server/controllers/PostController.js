import Post from "../models/Post.js";

// Get all Post and sort it by the time it was created
const post_get_all_post = (req, res) => {
	Post.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			res.send({ title: "Result of getting all Post", result: result });
		})
		.catch((error) => {
			console.log(error);
		});
};

// Create New Post
const post_create_post = (req, res) => {
	const post = new Post({
		title: req.body.title,
		description: req.body.description,
		body: req.body.body,
		createdBy: req.token.username,
	});

	post.save()
		.then((result) => {
			res.send({
				title: "New Post created",
				result: result,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// Get all Post of a particular Username
const post_get_all_post_username = (req, res) => {
	console.log(req.token.username);

	Post.find({ createdBy: req.token.username })
		.sort({ createdAt: -1 })
		.then((result) => {
			res.send({
				title: `Result of getting all Post of ${req.token.username}`,
				result: result,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

// Get One Post by ID
const post_get_one = (req, res) => {
	const id = req.params.id;
	Post.findById(id)
		.then((result) => {
			res.send({
				title: `Result of One Post of ${req.params.id}`,
				result: result,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// Delete a Post
const post_delete_one = (req, res) => {
	const id = req.params.id;
	Post.findByIdAndDelete(id)
		.then((result) => {
			res.send({
				title: `Result of deleting Post of ${req.params.id}`,
				result: result,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

export default {
	post_get_all_post,
	post_create_post,
	post_get_all_post_username,
	post_get_one,
	post_delete_one,
};
