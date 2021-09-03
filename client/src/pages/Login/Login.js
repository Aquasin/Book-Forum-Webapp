import React, { useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import "./Login.css";

const Login = () => {
	const [user, setUser] = useState({ email: "", password: "" });

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let uri = process.env.REACT_APP_BASE_URL_SERVER + "/user/login";
		// var uri = "http://localhost:5000/api/v1/user/login";
		const logUser = {
			email: user.email,
			password: user.password,
		};
		axios
			.post(uri, logUser)
			.then((result) => {
				console.log(result.data);
				Cookie.set("token", result.data.token);
				// <Link to="/"></Link>;
				localStorage.setItem("Username", result.data.username);
				window.location.replace("/");
			})
			.catch((err) => {
				console.log("jhi");
				console.log(err.response);
			});
	};

	const registerPage = () => {
		window.location.replace("/register");
	};

	return (
		<div className="container-fluid">
			<div className="row justify-content-center align-items-center row-login">
				<div className="col-sm-5 p-5 rounded">
					<div className="text-center">
						<i className="fas fa-book-reader fa-4x text-primary"></i>
					</div>
					<div className="text-center fs-1">Login</div>
					<form>
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
						<button
							type="submit"
							onClick={handleSubmit}
							className="btn btn-primary me-3"
						>
							Sign In
						</button>
						<button
							className="btn btn-primary"
							onClick={registerPage}
						>
							Register
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
