import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "./Firebase";
import "./Styles/Category.css";

function CategoryItem (props) {
	const [ name, setName ] = useState(props.name);
	const [ isEditing, setIsEditing ] = useState(false);

	useEffect(
		() => {
			if (name !== props.name)
				props.firebase.db.collection("categories").doc(props.docId).update({
					name
				});
		},
		[ name ]
	);

	const deleteItem = () => {
		props.firebase.db.collection("categories").doc(props.docId).delete();
		props.setFetchData((data) => !data);
	};

	const nameInput = isEditing ? (
		<input
			type="text"
			className="name-input"
			value={name}
			onChange={(event) => setName(event.target.value)}
			onBlur={() => setIsEditing(false)}
			onKeyDown={(event) => {
				if (event.keyCode === 13) setIsEditing(false);
			}}
			autoFocus
		/>
	) : (
		<h2 className="name">{name}</h2>
	);
	return (
		<li className="category-item">
			<Link className="category-link" to={`/${props.name.toLowerCase()}`}>
				{nameInput}
			</Link>
			<div className="actions">
				<button className="edit" onClick={() => setIsEditing(true)}>
					<i className="fas fa-pen" />
				</button>
				<button className="delete" onClick={deleteItem}>
					<i className="fas fa-trash-alt" />
				</button>
			</div>
		</li>
	);
}

export default withFirebase(CategoryItem);
