import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./Body.css";

const Body = () => {
	const [posts, setPosts] = useState([]);

	const getCookie = Cookies.get("token");

	useEffect(() => {
		let uri = process.env.REACT_APP_BASE_URL_SERVER + "/post";

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
	}, []);

	return (
		<section>
			{getCookie && (
				<div className="container mt-5 px-5">
					<div className="row p-2 m-2 fs-1">
						<div className="col">Posts</div>
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
								<Link
									className="no-link-underline"
									to={`/details/${post._id}`}
								>
									<div className="col-8">
										Title : {post.title}
									</div>
									<div className="col-8">
										Description : {post.description}
									</div>
									<div className="col-8">{post.body}</div>
									<div className="col-12 text-end fst-italic">
										Post Written by {post.createdBy}
									</div>
								</Link>
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

export default Body;
