import React from "react";
import { Link } from "react-router-dom";

import "./Styles/Navbar.css";

function Navbar () {
	return (
		<nav className="navbar">
			<Link to="/" className="navbar-link">
				Home
			</Link>
			<Link to="/" className="navbar-link logo">
				Quiz Up
			</Link>
			<Link to="/" className="navbar-link">
				Log Out
			</Link>
		</nav>
	);
}

export default Navbar;
