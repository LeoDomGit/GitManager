import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	const Logout = () => {
		localStorage.clear();
		window.location.replace("/");
	};
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<Link className="navbar-brand" to="#">
						<img src="https://marketplace.canva.com/EAE85VgPq3E/1/0/1600w/canva-v%E1%BA%BD-tay-h%C3%ACnh-tr%C3%B2n-logo-c3Jw1yOiXJw.jpg" className="rounded-circle" style={{ height: "50px" }} alt="" />
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link className="nav-link active" aria-current="page" to="/manager">
									Trang chủ
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link active" aria-current="page" to="/thanh-toan">
									Thanh toán
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link active" aria-current="page" to="#" onClick={(e) => Logout()}>
									Đăng xuất
								</Link>
							</li>
						</ul>
						<form className="d-flex">
							<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
							<button className="btn btn-outline-success" type="submit">
								Search
							</button>
						</form>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
