import React, { useState } from "react";

import "./Styles/Form.css";

function SignUpForm () {
	const [ name, setName ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");

	function submitForm (e) {
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
			</form>
		</div>
	);
}

export default SignUpForm;
