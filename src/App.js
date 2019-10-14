import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Components/Navbar";
import SignUpForm from "./Components/SignUpForm";
import LogInForm from "./Components/LogInForm";
import Game from "./Components/Game";
import CategoryList from "./Components/CategoryList";
import Questions from "./Components/PortalQuestions";
import Users from "./Components/PortalUsers";
import * as ROUTES from "./Constants/Routes";
import { withAuthentication } from "./Components/Session";
import "./App.css";

function App () {
	return (
		<HashRouter>
			<Navbar />
			<div className="App">
				<Switch>
					{/* USER ROUTES */}
					<Route exact path={ROUTES.HOME} component={CategoryList} />
					<Route exact path={ROUTES.SIGN_UP} component={SignUpForm} />
					<Route exact path={ROUTES.LOG_IN} component={LogInForm} />
					<Route exact path={ROUTES.GAME} component={Game} />
					{/* PORTAL ROUTES */}
					{/* <Route exact path={ROUTES.PORTAL_HOME} component={CategoryList} />
					<Route exact path={ROUTES.PORTAL_QUESTION} component={Questions} />
					<Route exact path={ROUTES.PORTAL_USERS} component={Users} /> */}
					<Route path={ROUTES.HOME} component={CategoryList} />
				</Switch>
			</div>
		</HashRouter>
	);
}
export default withAuthentication(App);
