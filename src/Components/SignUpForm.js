import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";

import { withFirebase } from "./Firebase";
import * as ROUTES from "../Constants/Routes";
import "./Styles/Form.css";

function SignUpForm (props) {
	const [ name, setName ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ error, setError ] = useState(null);

	function submitForm (e) {
		props.firebase
			.doCreateUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				// Create a user in your Firebase realtime database
				return this.props.firebase.user(authUser.user.uid).set({
					name,
					highScore: 0
				});
			})
			.then(() => {
				setName("");
				setEmail("");
				setPassword("");
				props.history.push(ROUTES.HOME);
			})
			.catch((error) => {
				setError(error);
			});
		e.preventDefault();
	}

	return (
		<div className="form-wrapper">
			<h1 className="form-heading">Sign Up</h1>
			<form onSubmit={submitForm} className="form login">
				<div className="input-field">
					<i className="fas fa-user" />
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
				</div>
				<div className="input-field">
					<i className="fas fa-envelope" />
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</div>
				<div className="input-field">
					<i className="fas fa-key" />
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
				<button className="form-btn" type="submit">
					Sign Up
				</button>
				{error && <p className="form-error">{error.message}</p>}
			</form>
			<h4>Already have and account? Log In:</h4>
			<Link to={ROUTES.LOG_IN}>Log In</Link>
		</div>
	);
}

export default withRouter(withFirebase(SignUpForm));
