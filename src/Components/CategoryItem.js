import React, { useState } from "react";

import "./Styles/Category.css";

function CategoryItem (props) {
	const [ name, setName ] = useState(props.name);
	const [ isEditing, setIsEditing ] = useState(false);

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
			{nameInput}
			<div className="actions">
				<button className="edit" onClick={() => setIsEditing(true)}>
					<i className="fas fa-pen" />
				</button>
				<button className="delete" onClick={() => setIsEditing(true)}>
					<i className="fas fa-trash-alt" />
				</button>
			</div>
		</li>
	);
}

export default CategoryItem;
