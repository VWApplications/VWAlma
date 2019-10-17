import { LIST_DISCIPLINE, LIST_ALL_DISCIPLINES, FETCH_DISCIPLINE } from './types';

const initialState = {
	all: {
		list: [],
		pagination: {
			totalItemsCount: 0,
			itemsCountPerPage: 5,
			pageRangeDisplayed: 10,
			activePage: 1
		}
	},
	profile: {
		list: [],
		pagination: {
			totalItemsCount: 0,
			itemsCountPerPage: 5,
			pageRangeDisplayed: 10,
			activePage: 1
		}
	},
	obj: null
}

function disciplinesReducer(state=initialState, action) {
	let payload;
	switch(action.type) {
    	case LIST_DISCIPLINE:
			payload = action.payload;

			return {
				...state,
				profile: {
					list: payload.disciplines,
					pagination: {
						...state.pagination,
						activePage: payload.activePage,
						totalItemsCount: payload.count
					}
				}
			};

		case LIST_ALL_DISCIPLINES:
			payload = action.payload;

			return {
				...state,
				all: {
					list: payload.disciplines,
					pagination: {
						...state.pagination,
						activePage: payload.activePage,
						totalItemsCount: payload.count
					}
				}
			};

		case FETCH_DISCIPLINE:
			payload = action.payload;

			return {...state, obj: payload};

		default:
			return state;
  }
}

export default disciplinesReducer;