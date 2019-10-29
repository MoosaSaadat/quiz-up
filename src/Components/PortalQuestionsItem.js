import React, { useState } from "react";

import { withFirebase } from "./Firebase";
import "./Styles/Questions.css";

function PortalQuestionsItem (props) {
	const [ ques, setQues ] = useState(props.ques);
	const [ answers, setAnswers ] = useState(props.answers);
	const [ corrAns, setCorrAns ] = useState(props.corrAns);
	const [ isEditing, setIsEditing ] = useState(false);

	const submitForm = () => {
		setIsEditing(false);
		let newQues = {
			key: props.idx,
			ques: ques,
			answers: answers,
			correctAns: corrAns
		};
		props.updateQuestion(newQues);
	};

	const makeAnswersArray = (fullString) => {
		let newAnswers = fullString.split(",", 4);
		setAnswers(newAnswers);
	};

	const completeComponent = !isEditing ? (
		<div className="question-wrapper">
			{props.userIsAdmin && (
				<div className="question-actions">
					<button className="question-edit" onClick={() => setIsEditing(true)}>
						<i className="fas fa-pen" />
					</button>
					<button
						className="question-delete"
						onClick={() => props.deleteQuestion(props.idx)}>
						<i className="fas fa-trash-alt" />
					</button>
				</div>
			)}{" "}
			<h2 className="question">{ques}</h2>
			<ul className="answers-list">
				{answers.map((answer, idx) => (
					<li key={idx} className="answers-item">
						<div className="answers-link">{answer}</div>
					</li>
				))}
			</ul>
		</div>
	) : (
		<div className="question-wrapper">
			<div className="question-actions">
				<button className="question-edit" onClick={() => submitForm()}>
					<i className="fas fa-plus" />
				</button>
			</div>
			<input
				type="text"
				className="question-input"
				value={ques}
				onChange={(event) => setQues(event.target.value)}
			/>
			<hr />
			<textarea
				type="textarea"
				className="name-input"
				value={answers}
				onChange={(event) => makeAnswersArray(event.target.value)}
			/>
			<hr />
			<input
				type="text"
				className="question-input"
				value={"Correct Answer: " + corrAns}
				onChange={(event) =>
					setCorrAns(event.target.value[event.target.value.length - 1])}
			/>
		</div>
	);

	return completeComponent;
}

export default withFirebase(PortalQuestionsItem);
