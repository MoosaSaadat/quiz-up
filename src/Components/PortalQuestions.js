import React from "react";
import { Link } from "react-router-dom";

import "./Styles/Questions.css";

function Questions () {
	const answers = [ "A", "B", "C", "D" ];
	const answerItems = answers.map((answer) => (
		<li className="answers-item">
			<Link className="answers-link">answer</Link>
		</li>
	));

	return (
		<div className="questions-wrapper">
			<h1 className="question">Question 1</h1>
			<ul className="answers-list">{answerItems}</ul>
		</div>
	);
}

export default Questions;
