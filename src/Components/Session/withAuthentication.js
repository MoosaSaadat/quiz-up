import React, { useState, useEffect } from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

export const withAuthentication = (Component) =>
	withFirebase((props) => {
		const [ authUser, setAuthUser ] = useState(null);

		useEffect(
			() => {
				props.firebase.auth.onAuthStateChanged((authUser) => {
					authUser ? setAuthUser(authUser) : setAuthUser(null);
				});
			},
			[ props.firebase.auth, authUser ]
		);

		return (
			<AuthUserContext.Provider value={authUser}>
				<Component {...props} />
			</AuthUserContext.Provider>
		);
	});

export default withAuthentication;
