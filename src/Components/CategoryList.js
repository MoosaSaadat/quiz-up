import React, { useState, useEffect } from "react";

import CategoryItem from "./CategoryItem";
import { withAuthorization } from "./Session";
import { AuthUserContext } from "./Session";
import "./Styles/Category.css";

function CategoryList (props) {
	console.log(props.ctgList);
	const allCategories = props.ctgList.map((item) => (
		<CategoryItem key={item.key} name={item.name} />
	));

	return (
		<div className="category-wrapper">
			<h1 className="category-heading">Categories</h1>
			<ul className="category-list">{allCategories}</ul>
		</div>
	);
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(CategoryList);
