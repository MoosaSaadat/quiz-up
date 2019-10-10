import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Components/Navbar";
import "./App.css";

function App () {
	return (
		<HashRouter>
			<Navbar />
			<div className="App">
				<Switch>
					<Route exact path="/" />
					<Route exact path="/" />
					<Route exact path="/" />
				</Switch>
			</div>
		</HashRouter>
	);
}

export default App;
