import React, { useState, useEffect } from "react";

import { withAuthorization } from "./Session";
import "./Styles/Users.css";

function PortalUsers (props) {
	const [ users, setUsers ] = useState([]);

	useEffect(() => {
		props.firebase.db
			.collection("users")
			.get()
			.then(function (querySnapshot) {
				var newList = [];
				querySnapshot.forEach(function (doc) {
					// console.log(doc.id, " => ", doc.data());
					newList.push({ key: doc.id, ...doc.data() });
				});
				setUsers(newList);
				// console.log(newList);
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});
	}, []);

	console.log(users);
	const usersList = users.map((user) => (
		<li className="user-item">
			<h3>Name: {user.name}</h3>
			<h3>Email: {user.email}</h3>
			<h3>High Score: {user.highScore}</h3>
		</li>
	));

	return (
		<div className="users-container">
			<h1 class="users-heading">Users</h1>
			{!!users && users.length !== 0 ? (
				<ul className="users-list">{usersList}</ul>
			) : (
				"LOADING..."
			)}
		</div>
	);
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(PortalUsers);
