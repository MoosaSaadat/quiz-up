import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { withFirebase } from "./Firebase";
import * as ROUTES from "../Constants/Routes";
import "./Styles/Form.css";

function LogInForm (props) {
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ error, setError ] = useState(null);

	function submitForm (e) {
		props.firebase
			.doSignInWithEmailAndPassword(email, password)
			.then((authUser) => {
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
			<h1 className="form-heading">Log In</h1>
			<form onSubmit={submitForm} className="form login">
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
					Log In
				</button>
				{error && <p className="form-error">{error.message}</p>}
			</form>
		</div>
	);
}

export default withRouter(withFirebase(LogInForm));
