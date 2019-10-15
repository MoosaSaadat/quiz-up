import React, { useState } from "react";

import { withFirebase } from "./Firebase";
import "./Styles/Questions.css";

function QuestionsItem (props) {
	const [ ques, setQues ] = useState(props.ques);
	const [ answers, setAnswers ] = useState(props.answers);

	return (
		<div className="question-wrapper">
			{/* <div className="question-actions">
				<button className="question-edit" onClick={() => setIsEditing(true)}>
					<i className="fas fa-pen" />
				</button>
				<button className="question-delete">
					<i className="fas fa-trash-alt" />
				</button>
			</div> */}
			<h2 className="question">{ques}</h2>
			<ul className="answers-list">
				{answers.map((answer, idx) => (
					<li key={idx} className="answers-item">
						{/* <Link className="answers-link">{answer}</Link> */}
						<div className="answers-link">{answer}</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default withFirebase(QuestionsItem);
