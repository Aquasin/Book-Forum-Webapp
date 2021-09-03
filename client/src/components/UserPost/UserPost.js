import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const UserPost = () => {
	const [posts, setPosts] = useState([]);

	const getCookie = Cookies.get("token");

	const getUserPost = () => {
		let uri = process.env.REACT_APP_BASE_URL_SERVER + "/post/username";

		axios
			.get(uri, {
				headers: {
					"auth-token": Cookies.get("token"),
				},
			})
			.then((result) => {
				console.log(result.data);
				setPosts(result.data.result);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getUserPost();
	}, []);

	const deletePost = (id) => {
		let uri = process.env.REACT_APP_BASE_URL_SERVER + `/post/${id}`;
		axios
			.delete(uri, {
				headers: {
					"auth-token": Cookies.get("token"),
				},
			})
			.then((result) => {
				getUserPost();
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	return (
		<section>
			{getCookie && (
				<div className="container mt-5 px-5">
					<div className="row p-2 m-2 fs-1">
						<div className="col">My Posts</div>
						<div className="col text-end">
							<Link to="/create" className="no-link-underline">
								<i className="fas fa-plus-circle me-2"></i>
								New Post
							</Link>
						</div>
					</div>
					<div className="border-top border-danger border-2 m-2">
						{posts.map((post) => (
							<div
								key={post._id}
								className="row flex p-2 m-3 border-start border-5 border-primary"
							>
								<div className="col-12 d-flex flex-row justify-content-between">
									<Link
										className="no-link-underline "
										to={`/details/${post._id}`}
									>
										Title : {post.title}
									</Link>
									<div>
										<button
											className="btn btn-danger btn-sm"
											onClick={() => deletePost(post._id)}
										>
											<i className="fas fa-trash-alt"></i>
										</button>
									</div>
								</div>
								<div className="col-10 py-1">
									Description : {post.description}
								</div>
								<div className="col-10 py-1">{post.body}</div>
								<div className="col-12 text-end fst-italic">
									Post Written by {post.createdBy}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
			{!getCookie && (
				<div className="container mt-5 px-5">
					<div className="row justify-content-center align-item-center">
						<div className="col-8 text-center fs-1 text-danger">
							Please Login First
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default UserPost;
