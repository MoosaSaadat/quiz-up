import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { withAuthorization } from "./Session";
import * as ROUTES from "../Constants/Routes";
import "./Styles/Game.css";

function Game (props) {
	const currCtg = useParams().category;
	const questions = props.ctgList.filter(
		(ctg) => ctg.name.toLowerCase() === currCtg.toLowerCase()
	)[0].questions;

	const [ time, setTime ] = useState(10);
	const [ score, setScore ] = useState(0);
	const [ currQues, setCurrQues ] = useState(0);

	useEffect(() => {
		var myTimer = setInterval(() => {
			setTime((old) => old - 1);
		}, 1000);

		return () => clearInterval(myTimer);
	}, []);

	useEffect(
		() => {
			if (time <= -3) props.history.push(ROUTES.HOME);
			else if (time <= 0) {
				var user = props.firebase.auth.currentUser;
				if (user) {
					console.log(user);
					updateUserData(user);
					// props.firebase.db.
				}
			}
		},
		[ time ]
	);

	const updateUserData = (user) => {
		props.firebase.db
			.collection("users")
			.get()
			.then(function (querySnapshot) {
				var newList = [];
				querySnapshot.forEach(function (doc) {
					// console.log(doc.id, " => ", doc.data());
					newList.push({ key: doc.id, ...doc.data() });
				});
				newList = newList.filter((item) => item.email === user.email);
				console.log(newList);
				updateDocument(newList[0].key);
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});
	};

	const updateDocument = (documentId) => {
		props.firebase.db.collection("users").doc(documentId).update({
			highScore: score
		});
	};

	const handleClick = (e) => {
		if (e.target.name === questions[currQues].correctAns) {
			setScore((oldScore) => oldScore + 10);
		}
		changeQuestion();
	};

	const changeQuestion = () => {
		if (currQues === questions.length - 1) setCurrQues(0);
		else setCurrQues((old) => old + 1);
	};

	const answersList = questions[currQues].answers.map((ans, idx) => (
		<button onClick={handleClick} key={idx} name={idx} className="answer">
			{ans}
		</button>
	));

	return time > 0 ? (
		<div className="game-container">
			<div className="info-container">
				<h2 className="time">Remaining Time: {time}s</h2>
				<h2 className="score">Score: {score}</h2>
			</div>
			<div className="question">{questions[currQues].ques}</div>
			<div className="answer-container">{answersList}</div>
		</div>
	) : (
		<div className="game-container">
			<h2 className="score">Score: {score}</h2>
			<div className="question">GAME OVER!</div>
		</div>
	);
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Game);
