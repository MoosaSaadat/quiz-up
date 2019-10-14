import React, { useState, useEffect } from "react";

import { withFirebase } from "./Firebase";

function PortalUsers (props) {
	const [ loading, setLoading ] = useState(false);
	const [ users, setUsers ] = useState([]);

	useEffect(
		() => {
			setLoading(true);
			// props.firebase.users().on("value", (snapshot) => {
			// 	const usersObject = snapshot.val();
			// 	console.log(usersObject);
			// 	const usersList = Object.keys(usersObject).map((key) => ({
			// 		...usersObject[key],
			// 		uid: key
			// 	}));
			// 	setLoading(false);
			// 	setUsers(usersList);
			// });
		},
		[ props.firebase ]
	);

	const usersList = users.map((user) => (
		<li className="user-item">{user.name}</li>
	));

	return (
		<div className="users-container">
			{loading ? "LOADING..." : <ul className="users-list">{usersList}</ul>}
		</div>
	);
}

export default withFirebase(PortalUsers);
