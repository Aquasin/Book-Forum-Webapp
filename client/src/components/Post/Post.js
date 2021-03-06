import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router";

const Post = () => {
	const { state } = useLocation();

	useEffect(() => {
		getDetailOne();
		// eslint-disable-next-line
	}, []);

	const [singlePost, setSinglePost] = useState({
		title: "",
		description: "",
		body: "",
	});

	const getDetailOne = () => {
		let uri =
			process.env.REACT_APP_BASE_URL_SERVER + `/post/${state.singleLink}`;
		axios
			.get(uri, {
				headers: {
					"auth-token": Cookies.get("token"),
				},
			})
			.then((result) => {
				const postDetails = result.data.result;
				setSinglePost({
					title: postDetails.title,
					description: postDetails.description,
					body: postDetails.body,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<div className="container mt-5">
				<div className="row border-bottom border-danger border-3 py-3 fs-1 text-primary">
					Details of the Post :
				</div>
				<div className="row mt-4 fs-2">Title : {singlePost.title}</div>
				<div className="row mt-3 fs-4">
					Description : {singlePost.description}
				</div>
				<div className="row mt-4 fs-5">{singlePost.body}</div>
			</div>
		</div>
	);
};

export default Post;
