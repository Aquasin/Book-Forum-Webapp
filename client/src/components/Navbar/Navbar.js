import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
	const userLogout = () => {
		Cookies.remove("token");
		localStorage.removeItem("Username");
		window.location.replace("/login");
	};

	const userPost = () => {
		const userName = localStorage.getItem("Username");
		window.location = `/${userName}`;
	};

	return (
		<>
			<nav className="navbar navbar-expand navbar-dark bg-dark p-2">
				<div className="container-fluid">
					<div className="row justify-content-center align-items-center">
						<div className="col">
							<Link
								className="btn btn-dark navbar-brand ms-5"
								to="/"
							>
								<i className="fas fa-book-reader fa-2x text-primary"></i>
							</Link>
						</div>
						<div className="col text-primary fs-3 d-none d-sm-block">
							BookForum
						</div>
					</div>
					<ul className="navbar-nav">
						<li className="nav-item dropdown me-5">
							<button
								className="btn btn-dark text-light nav-link dropdown-toggle"
								id="navbarDropdown"
								data-bs-toggle="dropdown"
							>
								{localStorage.getItem("Username")
									? localStorage.getItem("Username")
									: "User"}
							</button>
							<ul
								className="dropdown-menu p-1"
								aria-labelledby="navbarDropdown"
							>
								{localStorage.getItem("Username") && (
									<>
										<button
											className="btn dropdown-item"
											onClick={userPost}
										>
											My Posts
										</button>
										<hr className="dropdown-divider" />
									</>
								)}
								<button
									className="btn dropdown-item"
									onClick={userLogout}
								>
									Logout
								</button>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
