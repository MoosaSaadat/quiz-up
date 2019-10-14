import React, { useState } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import SignUpForm from "./Components/SignUpForm";
import LogInForm from "./Components/LogInForm";
import CategoryList from "./Components/CategoryList";
import Questions from "./Components/Questions";
import * as ROUTES from "./Constants/Routes";
import { withAuthorization, withAuthentication } from "./Components/Session";
import "./App.css";

function App () {
	return (
		<HashRouter>
			<Navbar />
			<div className="App">
				<Switch>
					<Route exact path={ROUTES.HOME} component={CategoryList} />
					<Route exact path={ROUTES.SIGN_UP} component={SignUpForm} />
					<Route exact path={ROUTES.LOG_IN} component={LogInForm} />
					<Route exact path={ROUTES.QUESTION} component={Questions} />
					<Route path={ROUTES.HOME} component={CategoryList} />
				</Switch>
			</div>
		</HashRouter>
	);
}
export default withAuthentication(App);
