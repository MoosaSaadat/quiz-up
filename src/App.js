import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Components/Navbar";
import SignUpForm from "./Components/SignUpForm";
import LogInForm from "./Components/LogInForm";
import Game from "./Components/Game";
import CategoryList from "./Components/CategoryList";
import QuestionsList from "./Components/PortalQuestionsList";
import Users from "./Components/PortalUsers";
import * as ROUTES from "./Constants/Routes";
import { withAuthentication } from "./Components/Session";
import "./App.css";

function App (props) {
	const [ allData, setAllData ] = useState(null);

	useEffect(
		() => {
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
					// console.log(newList);
				})
				.catch(function (error) {
					console.log("Error getting documents: ", error);
				});
		},
		[ allData ]
	);

	const addCtg = () => {
		props.firebase.db.collection("categories").add({
			name: "",
			questions: []
		});
		setAllData((oldData) => [ ...oldData, { name: "" } ]);
	};

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
								<CategoryList
									ctgList={allData}
									addCtg={addCtg}
									{...routeProps}
								/>
							)}
						/>
						<Route exact path={ROUTES.SIGN_UP} component={SignUpForm} />
						<Route exact path={ROUTES.LOG_IN} component={LogInForm} />
						<Route exact path={ROUTES.PORTAL_USERS} component={Users} />
						<Route
							exact
							path={ROUTES.QUESTIONS}
							render={(routeProps) => (
								<QuestionsList ctgList={allData} {...routeProps} />
							)}
						/>
						<Route
							exact
							path={ROUTES.GAME}
							render={(routeProps) => (
								<Game ctgList={allData} {...routeProps} />
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
