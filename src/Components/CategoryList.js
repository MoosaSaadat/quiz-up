import React from "react";

import CategoryItem from "./CategoryItem";
import { withAuthorization } from "./Session";
import "./Styles/Category.css";

function CategoryList (props) {
	const allCategories = props.ctgList.map((item) => (
		<CategoryItem key={item.key} docId={item.key} name={item.name} />
	));

	return (
		<div className="category-wrapper">
			<h1 className="category-heading">Categories</h1>
			<ul className="category-list">{allCategories}</ul>
			<button onClick={props.addCtg} className="category-addnew">
				Add New
			</button>
		</div>
	);
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(CategoryList);
