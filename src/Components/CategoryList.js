import React, { useState } from "react";

import CategoryItem from "./CategoryItem";
import "./Styles/Category.css";

function CategoryList () {
	const [ ctgList, setCtgList ] = useState([
		{ key: 0, name: "Films" },
		{ key: 1, name: "Football" },
		{ key: 2, name: "Drama" },
		{ key: 3, name: "Cricket" },
		{ key: 4, name: "Television" }
	]);

	const allCategories = ctgList.map((item) => (
		<CategoryItem key={item.key} name={item.name} />
	));

	return (
		<div className="category-wrapper">
			<h1 className="category-heading">Categories</h1>
			<ul className="category-list">{allCategories}</ul>
		</div>
	);
}

export default CategoryList;
