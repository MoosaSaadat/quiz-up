import React, { useState } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import SignUpForm from "./Components/SignUpForm";
import LogInForm from "./Components/LogInForm";
import CategoryList from "./Components/CategoryList";
import Questions from "./Components/Questions";
import * as ROUTES from "./Constants/Routes";
import { withAuthentication } from "./Components/Session";
import "./App.css";

function App () {
	const [ hasAccount, setHasAccount ] = useState(true);

	return (
		<HashRouter>
			<Navbar />
			<div className="App">
				<Switch>
					<Route exact path={ROUTES.HOME} component={Home} />
					<Route exact path={ROUTES.SIGN_UP} component={SignUpForm} />
					<Route exact path={ROUTES.LOG_IN} component={LogInForm} />
					<Route exact path={ROUTES.CATEGORY} component={CategoryList} />
					<Route exact path={ROUTES.QUESTIONS} component={Questions} />
				</Switch>
			</div>
		</HashRouter>
	);
}

export default withAuthentication(App);
