import { LIST_DISCIPLINE, LIST_ALL_DISCIPLINES } from './types';

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
		obj: null,
		pagination: {
			totalItemsCount: 0,
			itemsCountPerPage: 5,
			pageRangeDisplayed: 10,
			activePage: 1
		}
	}
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
					obj: null,
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

		default:
			return state;
  }
}

export default disciplinesReducer;