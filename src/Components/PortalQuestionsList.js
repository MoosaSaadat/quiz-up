import React from "react";
import { Link, useParams } from "react-router-dom";

import QuestionsItem from "./PortalQuestionsItem";
import { withAuthorization } from "./Session";
import "./Styles/Questions.css";

function QuestionsList (props) {
	const currCtg = useParams().category;
	const questions = props.ctgList.filter(
		(ctg) => ctg.name.toLowerCase() === currCtg.toLowerCase()
	)[0].questions;
	// console.log(questions);

	const questionsList = questions.map((ques, idx) => (
		// <div key={idx} className="question-wrapper">
		// 	<h1 className="question">{ques.ques}</h1>
		// 	<ul className="answers-list">
		// 		{ques.answers.map((answer, idx) => (
		// 			<li key={idx} className="answers-item">
		// 				<Link className="answers-link">{answer}</Link>
		// 			</li>
		// 		))}
		// 	</ul>
		// </div>
		<QuestionsItem key={idx} ques={ques.ques} answers={ques.answers} />
	));

	return (
		<div className="questions-list">
			<h2 className="questions-heading">Questions Stored in {currCtg}</h2>
			<Link to={`/${currCtg.toLowerCase()}/game`} className="play-game">
				Click to Play Game for this Category
			</Link>
			{/* <button className="questions-addnew">Add New Question</button> */}
			{questionsList}
		</div>
	);
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(QuestionsList);
