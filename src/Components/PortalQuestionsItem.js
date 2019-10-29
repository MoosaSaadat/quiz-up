import React, { useState } from "react";

import { withFirebase } from "./Firebase";
import "./Styles/Questions.css";

function PortalQuestionsItem (props) {
	const [ ques, setQues ] = useState(props.ques);
	const [ answers, setAnswers ] = useState(props.answers);
	const [ corrAns, setCorrAns ] = useState("0");
	const [ isEditing, setIsEditing ] = useState(false);

	const submitForm = () => {
		setIsEditing(false);
		props.updateQuestions(props.idx, ques, answers, corrAns);
		//DO ACTION
	};

	const makeAnswersArray = (fullString) => {
		let newAnswers = fullString.split(",", 4);
		setAnswers(newAnswers);
	};

	const completeComponent = !isEditing ? (
		<div className="question-wrapper">
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
				<button className="question-edit" onClick={() => setIsEditing(false)}>
					<i className="fas fa-plus" />
				</button>
			</div>
			<input
				type="text"
				className="question-input"
				value={ques}
				onChange={(event) => setQues(event.target.value)}
				onBlur={submitForm}
			/>
			<hr />
			<textarea
				type="textarea"
				className="name-input"
				value={answers}
				onChange={(event) => makeAnswersArray(event.target.value)}
				onBlur={submitForm}
			/>
			<hr />
			<input
				type="text"
				className="question-input"
				value={"Correct Answer: " + corrAns}
				onChange={(event) =>
					setCorrAns(event.target.value[event.target.value.length - 1])}
				onBlur={submitForm}
			/>
		</div>
	);

	return completeComponent;
}

export default withFirebase(PortalQuestionsItem);
