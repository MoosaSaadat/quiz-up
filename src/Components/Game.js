import React, { useState } from "react";

import { withAuthorization } from "./Session";
import "./Styles/Game.css";

function Game (props) {
	return (
		<div className="game-container">
			<div className="time">60s</div>
			<div className="question">What is your Name?</div>
			<div className="answer-container">
				<button className="answer">1. N</button>
				<button className="answer">2. M</button>
				<button className="answer">3. F</button>
				<button className="answer">4. A</button>
			</div>
		</div>
	);
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Game);
