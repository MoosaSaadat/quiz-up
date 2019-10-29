import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import QuestionsItem from "./PortalQuestionsItem";
import { withAuthorization } from "./Session";
import "./Styles/Questions.css";

function PortalQuestionsList (props) {
	const currCtg = useParams().category;

	const [ updateDb, setUpdateDb ] = useState(false);
	const [ isEditing, setIsEditing ] = useState(false);
	const [ newQues, setNewQues ] = useState("Question?");
	const [ newAns, setNewAns ] = useState([ "ans1", "ans2", "ans3", "ans4" ]);
	const [ newCorrAns, setNewCorrAns ] = useState("0");
	const [ questions, setQuestions ] = useState(
		props.ctgList.filter(
			(ctg) => ctg.name.toLowerCase() === currCtg.toLowerCase()
		)[0].questions
	);

	const ctgDocId = props.ctgList.filter(
		(ctg) => ctg.name.toLowerCase() === currCtg.toLowerCase()
	)[0].key;

	useEffect(
		() => {
			console.log("Updating ", ctgDocId);
			props.firebase.db.collection("categories").doc(ctgDocId).update({
				questions
			});
			console.log(questions);
		},
		[ updateDb ]
	);

	const updateQuestions = (idx, ques, answers, correctAns) => {
		let newQuestion = {
			ques,
			answers,
			correctAns
		};
		setQuestions((oldQuestions) =>
			oldQuestions.map((ques, qidx) => {
				console.log("updating", qidx, idx);
				if (idx === qidx) {
					console.log(newQuestion);
					return newQuestion;
				}
				else return ques;
			})
		);
		setUpdateDb((currVal) => !currVal);
	};

	const deleteQuestion = (idx) => {
		setQuestions((oldQuestions) =>
			oldQuestions.filter((ques, qidx) => qidx !== idx)
		);
		setUpdateDb((currVal) => !currVal);
	};

	const makeAnswersArray = (fullString) => {
		let newAnswers = fullString.split(",", 4);
		setNewAns(newAnswers);
	};

	const addQuestion = () => {
		let newQuestion = {
			key: questions.length,
			answers: newAns,
			correctAns: newCorrAns,
			ques: newQues
		};
		let newList = [ newQuestion, ...questions ];
		console.log(newList);
		setIsEditing(false);
		setNewCorrAns("0");
		setNewQues("Question?");
		setNewAns([ "ans1", "ans2", "ans3", "ans4" ]);
		setQuestions(newList);
		setUpdateDb((currVal) => !currVal);
	};

	const questionsList = questions.map((ques, idx) => (
		<QuestionsItem
			key={ques.key}
			idx={idx}
			ques={ques.ques}
			answers={ques.answers}
			updateQuestions={updateQuestions}
			deleteQuestion={deleteQuestion}
		/>
	));

	const newQuesForm = !isEditing ? (
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
				onBlur={addQuestion}
			/>
			<hr />
			<textarea
				type="textarea"
				className="name-input"
				value={newAns}
				onChange={(event) => makeAnswersArray(event.target.value)}
				onBlur={addQuestion}
			/>
			<hr />
			<input
				type="text"
				className="question-input"
				value={"Correct Answer: " + newCorrAns}
				onChange={(event) =>
					setNewCorrAns(event.target.value[event.target.value.length - 1])}
				onBlur={addQuestion}
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
