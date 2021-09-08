import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router";

const EditPost = () => {
	const [post, setPost] = useState({ title: "", description: "", body: "" });
	const { state } = useLocation();

	useEffect(() => {
		getDetailOne();
		// eslint-disable-next-line
	}, []);

	const getDetailOne = () => {
		let uri =
			process.env.REACT_APP_BASE_URL_SERVER +
			`/post/${state.linkEditPost}`;
		axios
			.get(uri, {
				headers: {
					"auth-token": Cookies.get("token"),
				},
			})
			.then((result) => {
				const postDetails = result.data.result;
				setPost({
					title: postDetails.title,
					description: postDetails.description,
					body: postDetails.body,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setPost({ ...post, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let uri =
			process.env.REACT_APP_BASE_URL_SERVER +
			`/post/${state.linkEditPost}`;
		const createdPost = {
			title: post.title,
			description: post.description,
			body: post.body,
		};
		axios
			.put(uri, createdPost, {
				headers: {
					"auth-token": Cookies.get("token"),
				},
			})
			.then((result) => {
				window.location.replace(`/${localStorage.getItem("Username")}`);
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	return (
		<div className="container-fluid">
			<div className="row justify-content-center align-items-center my-4">
				<div className="col-sm-5 p-4 rounded">
					<div className="text-center fs-1">Update Post</div>
					<form className="p-3">
						<div className="mb-3">
							<label
								htmlFor="titlePost"
								className="form-label fs-5"
							>
								Title
							</label>
							<input
								type="text"
								className="form-control border-success"
								id="titlePost"
								name="title"
								value={post.title}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="mb-3">
							<label
								htmlFor="descPost"
								className="form-label fs-5"
							>
								Desciption
							</label>
							<textarea
								type="text"
								className="form-control border-primary"
								id="descPost"
								name="description"
								value={post.description}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="mb-3">
							<label
								htmlFor="bodyPost"
								className="form-label fs-5"
							>
								Body
							</label>
							<textarea
								rows="5"
								className="form-control border-primary"
								id="bodyPost"
								name="body"
								value={post.body}
								onChange={handleChange}
								required
							/>
						</div>
						<button
							type="submit"
							className="btn btn-primary mt-2 text-center"
							onClick={handleSubmit}
						>
							Update Post
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditPost;
