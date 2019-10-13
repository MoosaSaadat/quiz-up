import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Firebase, { FirebaseContext } from "./Components/Firebase";
import Navbar from "./Components/Navbar";
import SignUpForm from "./Components/SignUpForm";
import LogInForm from "./Components/LogInForm";
import CategoryList from "./Components/CategoryList";
import Questions from "./Components/Questions";
import "./App.css";

function App () {
	const [ hasAccount, setHasAccount ] = useState(true);

	const formComponent = !hasAccount ? LogInForm : SignUpForm;
	return (
		<FirebaseContext.Provider value={new Firebase()}>
			<HashRouter>
				<Navbar />
				<div className="App">
					<Switch>
						<Route exact path="/" component={formComponent} />
						<Route exact path="/category" component={CategoryList} />
						<Route exact path="/category/questions" component={Questions} />
					</Switch>
				</div>
			</HashRouter>
		</FirebaseContext.Provider>
	);
}

export default App;
