import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Components/Navbar";
import SignUpForm from "./Components/SignUpForm";
import LogInForm from "./Components/LogInForm";
import Game from "./Components/Game";
import CategoryList from "./Components/CategoryList";
import PortalQuestionsList from "./Components/PortalQuestionsList";
import Users from "./Components/PortalUsers";
import * as ROUTES from "./Constants/Routes";
import { withAuthentication } from "./Components/Session";
import "./App.css";

function App (props) {
	const [ allData, setAllData ] = useState(null);
	const [ isDataLoading, setDataLoading ] = useState(false);
	const [ fetchData, setFetchData ] = useState(false);
	const [ userIsAdmin, setUserIsAdmin ] = useState(false);

	useEffect(
		() => {
			let currUser = props.firebase.auth.currentUser;
			if (currUser) {
				props.firebase.db
					.collection("users")
					.get()
					.then(function (querySnapshot) {
						querySnapshot.forEach(function (doc) {
							if (
								doc.data().email === currUser.email &&
								doc.data().isAdmin === true
							) {
								setUserIsAdmin(true);
								console.log("ADMIN LOGGED IN!");
							}
							else if (
								doc.data().email === currUser.email &&
								doc.data().isAdmin === false
							) {
								setUserIsAdmin(false);
								console.log("USER LOGGED IN!");
							}
						});
					});
			}
		},
		[ props.firebase.auth.currentUser ]
	);

	useEffect(
		() => {
			if (allData == null) setDataLoading(true);
			props.firebase.db
				.collection("categories")
				.get()
				.then(function (querySnapshot) {
					var newList = [];
					querySnapshot.forEach(function (doc) {
						// console.log(doc.id, " => ", doc.data());
						newList.push({ key: doc.id, ...doc.data() });
					});
					newList = newList.sort((a, b) => a.name.localeCompare(b.name));
					console.log(newList);
					setAllData(newList);
					setDataLoading(false);
				})
				.catch(function (error) {
					console.log("Error getting documents: ", error);
				});
		},
		[ fetchData ]
	);

	const toggleFetchData = () => {
		setFetchData((oldData) => !oldData);
	};

	const addCtg = (newItemName) => {
		props.firebase.db.collection("categories").add({
			name: newItemName,
			questions: []
		});
		toggleFetchData();
	};

	const addQuestion = (docId, questions) => {
		let newDoc;
		allData.filter((ctg) => {
			if (ctg.key === docId) {
				ctg.questions = questions;
				ctg.nextKey++;
				newDoc = ctg;
			}
			return ctg;
		});
		newDoc = {
			name: newDoc.name,
			nextKey: newDoc.nextKey,
			questions: newDoc.questions
		};
		// console.log("newDoc", newDoc);
		props.firebase.db.collection("categories").doc(docId).set(newDoc);
		toggleFetchData();
	};

	const deleteQuestion = (docId, queskey) => {
		let newDoc;
		allData.filter((ctg) => {
			if (ctg.key === docId) {
				ctg.questions = ctg.questions.filter((ques) => ques.key != queskey);
				newDoc = ctg;
			}
		});
		newDoc = {
			name: newDoc.name,
			nextKey: newDoc.nextKey,
			questions: newDoc.questions
		};
		// console.log("newDoc", newDoc);
		props.firebase.db.collection("categories").doc(docId).set(newDoc);
		toggleFetchData();
	};

	const updateQuestion = (docId, newQues) => {
		let newDoc;
		allData.filter((ctg) => {
			if (ctg.key === docId) {
				ctg.questions = ctg.questions.map((ques) => {
					if (ques.key === newQues.key) return newQues;
					else return ques;
				});
				newDoc = ctg;
			}
		});
		newDoc = {
			name: newDoc.name,
			nextKey: newDoc.nextKey,
			questions: newDoc.questions
		};
		// console.log("newDoc", newDoc);
		props.firebase.db.collection("categories").doc(docId).set(newDoc);
		toggleFetchData();
	};

	return (
		<HashRouter>
			<Navbar userIsAdmin={userIsAdmin} />
			<div className="App">
				{!isDataLoading ? (
					<Switch>
						<Route
							exact
							path={ROUTES.HOME}
							render={(routeProps) => (
								<CategoryList
									ctgList={allData}
									userIsAdmin={userIsAdmin}
									addCtg={addCtg}
									toggleFetchData={toggleFetchData}
									{...routeProps}
								/>
							)}
						/>
						<Route exact path={ROUTES.SIGN_UP} component={SignUpForm} />
						<Route
							exact
							path={ROUTES.LOG_IN}
							render={(routeProps) => (
								<LogInForm setUserIsAdmin={setUserIsAdmin} {...routeProps} />
							)}
						/>
						<Route
							exact
							path={ROUTES.PORTAL_USERS}
							component={Users}
							render={(routeProps) => (
								<Users userIsAdmin={userIsAdmin} {...routeProps} />
							)}
						/>
						<Route
							exact
							path={ROUTES.QUESTIONS}
							render={(routeProps) => (
								<PortalQuestionsList
									ctgList={allData}
									userIsAdmin={userIsAdmin}
									addQuestion={addQuestion}
									deleteQuestion={deleteQuestion}
									updateQuestion={updateQuestion}
									toggleFetchData={toggleFetchData}
									{...routeProps}
								/>
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
				) : (
					<h2>LOADING DATA</h2>
				)}
			</div>
		</HashRouter>
	);
}
export default withAuthentication(App);
