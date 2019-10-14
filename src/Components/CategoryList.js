import React, { useState, useEffect } from "react";

import CategoryItem from "./CategoryItem";
import PortalCategoryItem from "./PortalCategoryItem";
import { withAuthorization } from "./Session";
import { AuthUserContext } from "./Session";
import "./Styles/Category.css";

function CategoryList (props) {
	const [ ctgList, setCtgList ] = useState([]);

	useEffect(() => {
		props.firebase.db
			.collection("categories")
			.get()
			.then(function (querySnapshot) {
				var newList = [];
				querySnapshot.forEach(function (doc) {
					// console.log(doc.id, " => ", doc.data());
					newList.push({ key: doc.id, ...doc.data() });
				});
				setCtgList(newList);
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});
	}, []);

	const allCategories = ctgList.map((item) => (
		// <AuthUserContext.Consumer>
		// {(authUser) =>
		// 	authUser.role === "ADMIN" ? (
		// 		<PortalCategoryItem key={item.key} name={item.name} />
		// 		) : (
		// 			<PortalCategoryItem key={item.key} name={item.name} />
		// 		)}
		// </AuthUserContext.Consumer>
		<PortalCategoryItem key={item.key} name={item.name} />
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
