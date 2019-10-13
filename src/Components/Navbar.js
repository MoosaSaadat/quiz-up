import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../Constants/Routes";
import { withFirebase } from "./Firebase";
import "./Styles/Navbar.css";

function Navbar (props) {
	function logOut () {
		props.firebase.doSignOut();
		props.history.push(ROUTES.LOG_IN);
	}
	return (
		<nav className="navbar">
			<ul className="navbar-list">
				<li className="navbar-item">
					<Link to={ROUTES.HOME} className="navbar-link">
						Home
					</Link>
				</li>
				<li className="navbar-item logo">
					<Link to={ROUTES.HOME} className="navbar-link">
						QUIZ UP
					</Link>
				</li>
				<li className="navbar-item">
					<button type="button" onClick={props.firebase.doSignOut}>
						Log Out
					</button>
				</li>
			</ul>
		</nav>
	);
}

export default withFirebase(Navbar);
