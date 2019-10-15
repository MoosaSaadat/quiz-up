import React, { useEffect, useState } from "react";
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

function App (props) {
	const [ allData, setAllData ] = useState(null);

	useEffect(() => {
		props.firebase.db
			.collection("categories")
			.get()
			.then(function (querySnapshot) {
				var newList = [];
				querySnapshot.forEach(function (doc) {
					// console.log(doc.id, " => ", doc.data());
					newList.push({ key: doc.id, ...doc.data() });
				});
				setAllData(newList);
				console.log(newList);
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});
	}, []);

	return (
		!!allData && (
			<HashRouter>
				<Navbar />
				<div className="App">
					<Switch>
						<Route
							exact
							path={ROUTES.HOME}
							render={(routeProps) => (
								<CategoryList ctgList={allData} {...routeProps} />
							)}
						/>
						<Route exact path={ROUTES.SIGN_UP} component={SignUpForm} />
						<Route exact path={ROUTES.LOG_IN} component={LogInForm} />
						<Route exact path={ROUTES.GAME} component={Game} />
						<Route
							exact
							path={ROUTES.QUESTIONS}
							render={(routeProps) => (
								<Questions ctgList={allData} {...routeProps} />
							)}
						/>
						<Route path={ROUTES.HOME} component={CategoryList} />
					</Switch>
				</div>
			</HashRouter>
		)
	);
}
export default withAuthentication(App);
