import { LOGIN, USER_FETCH, LOGOUT } from './types';

const initialState = {
  	token: JSON.parse(localStorage.getItem("alma-token")),
	user: null,
	authenticated: false
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
				token: token,
				authenticated: true
			};

		case LOGOUT:
			localStorage.removeItem("alma-token");

			return {
				...state,
				token: null,
				user: null,
				authenticated: false
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