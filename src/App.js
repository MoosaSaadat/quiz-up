import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Components/Navbar";
import SignUpForm from "./Components/SignUpForm";
import LogInForm from "./Components/LogInForm";
import CategoryList from "./Components/CategoryList";
import Questions from "./Components/Questions";
import * as ROUTES from "./Constants/Routes";
import "./App.css";

function App () {
	const [ hasAccount, setHasAccount ] = useState(true);

	const formComponent = !hasAccount ? LogInForm : SignUpForm;
	return (
		<HashRouter>
			<Navbar />
			<div className="App">
				<Switch>
					<Route exact path={ROUTES.HOME} component={formComponent} />
					<Route exact path={ROUTES.CATEGORY} component={CategoryList} />
					<Route exact path={ROUTES.QUESTIONS} component={Questions} />
				</Switch>
			</div>
		</HashRouter>
	);
}

export default App;
