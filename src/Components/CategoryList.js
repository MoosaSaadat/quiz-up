import React, { useState } from "react";

import CategoryItem from "./CategoryItem";
import { withAuthorization } from "./Session";
import "./Styles/Category.css";

function CategoryList (props) {
	const [ showForm, setShowForm ] = useState(false);
	const [ name, setName ] = useState("");

	const allCategories = props.ctgList.map((item) => (
		<CategoryItem
			key={item.key}
			docId={item.key}
			name={item.name}
			userIsAdmin={props.userIsAdmin}
			toggleFetchData={props.toggleFetchData}
		/>
	));

	const submitForm = () => {
		setShowForm(false);
		props.addCtg(name);
		setName("");
	};

	let newCtgForm;
	if (props.userIsAdmin && showForm) {
		newCtgForm = (
			<li className="category-item">
				<input
					type="text"
					className="name-input"
					value={name}
					onChange={(event) => setName(event.target.value)}
					onBlur={submitForm}
					onKeyDown={(event) => {
						if (event.keyCode === 13) {
							submitForm();
						}
					}}
					autoFocus
				/>
				<div className="actions">
					<button className="edit" onClick={submitForm}>
						<i className="fas fa-plus" />
					</button>
				</div>
			</li>
		);
	}
	else if (props.userIsAdmin && !showForm) {
		newCtgForm = (
			<button onClick={() => setShowForm(true)} className="category-addnew">
				Add New
			</button>
		);
	}

	return (
		<div className="category-wrapper">
			<h1 className="category-heading">Categories</h1>
			<ul className="category-list">{allCategories}</ul>
			{newCtgForm}
		</div>
	);
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(CategoryList);
