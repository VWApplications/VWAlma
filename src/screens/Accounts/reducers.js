import { LOGIN, USER_FETCH, LOGOUT } from './types';

const initialState = {
  	token: JSON.parse(localStorage.getItem("alma-token")),
	user: JSON.parse(localStorage.getItem("user"))
}

function accountsReducer(state=initialState, action) {
	switch(action.type) {
    	case LOGIN:
			const { token, remember } = action.payload;

			localStorage.setItem("alma-token", JSON.stringify(token));

			if (remember)
				localStorage.setItem("remembered", JSON.stringify(remember));
			else
				localStorage.removeItem("remembered");

			return {
				...state,
				token: token
			};

		case LOGOUT:
			localStorage.removeItem("alma-token");
			localStorage.removeItem("user")

			return {
				...state,
				token: null,
				user: null
			}

		case USER_FETCH:
			const user = action.payload;

			localStorage.setItem("user", JSON.stringify(user));

			return {
				...state,
				user: user
			}

		default:
			return state;
  }
}

export default accountsReducer;