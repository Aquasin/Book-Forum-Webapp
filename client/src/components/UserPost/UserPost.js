import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const UserPost = () => {
	const [posts, setPosts] = useState([]);
	const [postid, setPostid] = useState("");

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
				setPosts(result.data.result);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getUserPost();
	}, []);

	const openModal = (id) => {
		setPostid(id);
	};

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
				<div className="container mt-5 px-1">
					<div className="row p-2 m-2 fs-1">
						<div className="col">My Posts</div>
						<div className="col text-end">
							<Link to="/create" className="no-link-underline">
								<i className="fas fa-plus-circle me-2"></i>
								<span className="d-none d-sm-inline">
									New Post
								</span>
							</Link>
						</div>
					</div>
					<div className="border-top border-danger border-2 m-2 p-2">
						{/* Modal */}
						<div
							className="modal fade"
							id="DeletePost"
							tabIndex="-1"
							aria-labelledby="DeletePostModalLabel"
							aria-hidden="true"
						>
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h5
											className="modal-title"
											id="DeletePostModalLabel"
										>
											Confirm Deletion
										</h5>
										<button
											type="button"
											className="btn-close"
											data-bs-dismiss="modal"
											aria-label="Close"
										></button>
									</div>
									<div className="modal-body">
										Are you sure you want to delete this
										post?
									</div>
									<div className="modal-footer">
										<button
											type="button"
											className="btn btn-primary"
											data-bs-dismiss="modal"
										>
											Close
										</button>
										<button
											type="button"
											className="btn btn-danger"
											data-bs-dismiss="modal"
											onClick={() => {
												deletePost(postid);
											}}
										>
											Delete For Sure
										</button>
									</div>
								</div>
							</div>
						</div>
						{/* Posts */}
						{posts.map((post) => (
							<React.Fragment key={post._id}>
								<div className="row flex p-1 m-3 border-start border-5 border-primary">
									<div className="col-12 d-flex flex-row justify-content-between">
										<Link
											className="no-link-underline "
											to={{
												pathname: `/details/${post._id}`,
												state: {
													singleLink: `${post._id}`,
												},
											}}
										>
											Title : {post.title}
										</Link>
										<div className="d-flex">
											<Link
												className="btn btn-primary btn-sm me-2"
												title="Edit Post"
												to={{
													pathname: `/edit/${post._id}`,
													state: {
														linkEditPost: `${post._id}`,
													},
												}}
											>
												<i className="fas fa-edit"></i>
											</Link>
											<button
												type="button"
												className="btn btn-danger btn-sm"
												data-bs-toggle="modal"
												data-bs-target="#DeletePost"
												onClick={() => {
													openModal(post._id);
												}}
											>
												<i className="fas fa-trash-alt"></i>
											</button>
										</div>
									</div>
									<div className="col-12 py-1">
										Description : {post.description}
									</div>
									<div className="col-12 py-1 postDesc">
										{post.body}
									</div>
									<div className="col-12 text-end fst-italic">
										Post Written by {post.createdBy}
									</div>
								</div>
								<div className="row justify-content-center">
									<div className="col-6 border-top border-2 border-dark"></div>
								</div>
							</React.Fragment>
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
