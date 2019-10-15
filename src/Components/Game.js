import React, { useState, useEffect } from "react";

import { withAuthorization } from "./Session";
import * as ROUTES from "../Constants/Routes";
import "./Styles/Game.css";

function Game (props) {
	const [ questions ] = useState([
		{
			answers: [ "Hello", "How are you?", "Bye", "See you Soon" ],
			correctAns: "0",
			ques: "How to great someone?"
		},
		{
			answers: [ "Hello", "How are you?", "Bye", "See you Soon" ],
			correctAns: "0",
			ques: "Question number 2?"
		},
		{
			answers: [ "Hello", "How are you?", "Bye", "See you Soon" ],
			correctAns: "0",
			ques: "Question number 3?"
		},
		{
			answers: [ "Hello", "How are you?", "Bye", "See you Soon" ],
			correctAns: "0",
			ques: "Question number 4?"
		},
		{
			answers: [ "Hello", "How are you?", "Bye", "See you Soon" ],
			correctAns: "0",
			ques: "Question number 5?"
		}
	]);
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
		},
		[ time ]
	);

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
