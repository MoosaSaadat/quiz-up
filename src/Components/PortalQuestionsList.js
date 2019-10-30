import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import PortalQuestionsItem from "./PortalQuestionsItem";
import { withAuthorization } from "./Session";
import "./Styles/Questions.css";

function PortalQuestionsList (props) {
	const currCtg = useParams().category;
	const ctgDoc = props.ctgList.filter(
		(ctg) => ctg.name.toLowerCase() === currCtg.toLowerCase()
	)[0];
	const ctgDocId = ctgDoc.key;

	const [ isEditing, setIsEditing ] = useState(false);
	const [ newQues, setNewQues ] = useState("Question?");
	const [ newAns, setNewAns ] = useState([ "ans1", "ans2", "ans3", "ans4" ]);
	const [ newCorrAns, setNewCorrAns ] = useState("0");
	const [ questions, setQuestions ] = useState(ctgDoc.questions);

	const updateQuestion = (newQues) => {
		props.updateQuestion(ctgDocId, newQues);
	};

	const deleteQuestion = (idx) => {
		setQuestions(questions.filter((ques) => ques.key != idx));
		props.deleteQuestion(ctgDocId, idx);
	};
	const makeAnswersArray = (fullString) => {
		let newAnswers = fullString.split(",", 4);
		setNewAns(newAnswers);
	};

	const addQuestion = () => {
		let newQuestion = {
			key: ctgDoc.nextKey,
			answers: newAns,
			correctAns: newCorrAns,
			ques: newQues
		};
		let newList = [ newQuestion, ...questions ];
		setQuestions(newList);
		props.addQuestion(ctgDocId, newList);
		console.log(newList);
		setIsEditing(false);
		setNewCorrAns("0");
		setNewQues("Question?");
		setNewAns([ "ans1", "ans2", "ans3", "ans4" ]);
	};

	const questionsList = questions.map((ques) => (
		<PortalQuestionsItem
			key={ques.key}
			idx={ques.key}
			ques={ques.ques}
			answers={ques.answers}
			corrAns={ques.correctAns}
			userIsAdmin={props.userIsAdmin}
			updateQuestion={updateQuestion}
			deleteQuestion={deleteQuestion}
		/>
	));

	const newQuesForm =
		props.userIsAdmin && !isEditing ? (
			<button className="questions-addnew" onClick={() => setIsEditing(true)}>
				Add New Question
			</button>
		) : (
			<div className="question-wrapper">
				<div className="question-actions">
					<button className="question-edit" onClick={addQuestion}>
						<i className="fas fa-plus" />
					</button>
				</div>
				<input
					type="text"
					className="question-input"
					value={newQues}
					onChange={(event) => setNewQues(event.target.value)}
				/>
				<hr />
				<textarea
					type="textarea"
					className="name-input"
					value={newAns}
					onChange={(event) => makeAnswersArray(event.target.value)}
				/>
				<hr />
				<input
					type="text"
					className="question-input"
					value={"Correct Answer: " + newCorrAns}
					onChange={(event) =>
						setNewCorrAns(event.target.value[event.target.value.length - 1])}
				/>
			</div>
		);

	return (
		<div className="questions-list">
			<h2 className="questions-heading">Questions Stored in {currCtg}</h2>
			<Link to={`/${currCtg.toLowerCase()}/game`} className="play-game">
				Click to Play Game for this Category
			</Link>
			{newQuesForm}
			{questionsList}
		</div>
	);
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(PortalQuestionsList);
