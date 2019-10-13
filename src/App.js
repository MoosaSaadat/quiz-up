import React, { useState } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./Components/Navbar";
import SignUpForm from "./Components/SignUpForm";
import LogInForm from "./Components/LogInForm";
import CategoryList from "./Components/CategoryList";
import Questions from "./Components/Questions";
import * as ROUTES from "./Constants/Routes";
import "./App.css";

function App () {
	const [ hasAccount, setHasAccount ] = useState(true);

	return (
		<HashRouter>
			<Navbar />
			<div className="App">
				<Redirect to={ROUTES.LOG_IN} />
				<Switch>
					{/* <Route exact path={ROUTES.HOME} component={<h1>I'M HOME</h1>} /> */}
					<Route exact path={ROUTES.SIGN_UP} component={SignUpForm} />
					<Route exact path={ROUTES.LOG_IN} component={LogInForm} />
					<Route exact path={ROUTES.CATEGORY} component={CategoryList} />
					<Route exact path={ROUTES.QUESTIONS} component={Questions} />
				</Switch>
			</div>
		</HashRouter>
	);
}

export default App;
