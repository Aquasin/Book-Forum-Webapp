import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
	const [user, setUser] = useState({ username: "", email: "", password: "" });

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let uri = process.env.REACT_APP_BASE_URL_SERVER + "/user/register";
		// var uri = "http://localhost:5000/api/v1/user/login";
		console.log(uri);
		const logUser = {
			username: user.username,
			email: user.email,
			password: user.password,
		};
		axios
			.post(uri, logUser)
			.then((result) => {
				console.log(result.data);
				window.location.replace("/login");
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	};

	const loginPage = () => {
		window.location.replace("/login");
	};

	return (
		<div className="container-fluid">
			<div className="row justify-content-center align-items-center row-register">
				<div className="col-sm-5 p-5 rounded">
					<div className="text-center">
						<i className="fas fa-book-reader fa-4x text-primary"></i>
					</div>
					<div className="text-center fs-1">Register</div>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label
								htmlFor="username"
								className="form-label fs-5"
							>
								Username
							</label>
							<input
								type="text"
								className="form-control border-success"
								id="username"
								name="username"
								value={user.username}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="mb-3">
							<label
								htmlFor="emailId"
								className="form-label fs-5"
							>
								Email Address
							</label>
							<input
								type="email"
								className="form-control border-success"
								id="emailId"
								name="email"
								value={user.email}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="mb-3">
							<label
								htmlFor="password"
								className="form-label fs-5"
							>
								Password
							</label>
							<input
								type="text"
								className="form-control border-primary"
								id="password"
								name="password"
								value={user.password}
								onChange={handleChange}
								required
							/>
						</div>
						<button type="submit" className="btn btn-primary me-3">
							Register
						</button>
						<button className="btn btn-primary" onClick={loginPage}>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
