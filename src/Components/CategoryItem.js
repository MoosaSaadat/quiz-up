import React, { useState } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "./Firebase";
import "./Styles/Category.css";

function CategoryItem (props) {
	const [ name, setName ] = useState(props.name);
	const [ isEditing, setIsEditing ] = useState(false);

	const deleteItem = () => {
		props.firebase.db.collection("categories").doc(props.docId).delete();
		props.toggleFetchData();
	};

	const updateItem = () => {
		if (name !== props.name)
			props.firebase.db.collection("categories").doc(props.docId).update({
				name
			});
		setIsEditing(false);
		props.toggleFetchData();
	};

	const nameInput = isEditing ? (
		<input
			type="text"
			className="name-input"
			value={name}
			onChange={(event) => setName(event.target.value)}
			onBlur={() => updateItem()}
			onKeyDown={(event) => {
				if (event.keyCode === 13) updateItem();
			}}
			autoFocus
		/>
	) : (
		<h2 className="name">{name}</h2>
	);

	const linktoCatOptions = props.userIsAdmin
		? `/${props.name.toLowerCase()}`
		: `/${props.name.toLowerCase()}/game`;

	return (
		<li className="category-item">
			<Link className="category-link" to={linktoCatOptions}>
				{nameInput}
			</Link>
			{props.userIsAdmin && (
				<div className="actions">
					<button className="edit" onClick={() => setIsEditing(true)}>
						<i className="fas fa-pen" />
					</button>
					<button className="delete" onClick={deleteItem}>
						<i className="fas fa-trash-alt" />
					</button>
				</div>
			)}
		</li>
	);
}

export default withFirebase(CategoryItem);
