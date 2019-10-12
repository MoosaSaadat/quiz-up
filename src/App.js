import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Components/Navbar";
import SignUpForm from "./Components/SignUpForm";
import LogInForm from "./Components/LogInForm";
import "./App.css";

function App () {
	const [ hasAccount, setHasAccount ] = useState(true);

	const formComponent = !hasAccount ? LogInForm : SignUpForm;
	return (
		<HashRouter>
			<Navbar />
			<div className="App">
				<Switch>
					<Route exact path="/" component={formComponent} />
					<Route exact path="/" />
				</Switch>
			</div>
		</HashRouter>
	);
}

export default App;
