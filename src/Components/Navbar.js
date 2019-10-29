import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../Constants/Routes";
import { withFirebase } from "./Firebase";
import { AuthUserContext } from "./Session";
import "./Styles/Navbar.css";

function Navbar (props) {
	return (
		<nav className="navbar">
			<ul className="navbar-list">
				<li className="navbar-item logo">
					<Link to={ROUTES.HOME} className="navbar-link">
						QUIZ UP
					</Link>
				</li>
				{props.userIsAdmin && (
					<li className="navbar-item">
						<Link to={ROUTES.PORTAL_USERS} className="show-user-btn">
							Show Users
						</Link>
					</li>
				)}{" "}
				<AuthUserContext.Consumer>
					{(authUser) =>
						authUser && (
							<li className="navbar-item">
								<button type="button" onClick={props.firebase.doSignOut}>
									Log Out
								</button>
							</li>
						)}
				</AuthUserContext.Consumer>
			</ul>
		</nav>
	);
}

export default withFirebase(Navbar);
