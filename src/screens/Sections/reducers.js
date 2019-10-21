import { LIST_SECTIONS, UPDATE_FORM } from './types';

const initialState = {
	list: [],
	form: null,
    pagination: {
        totalItemsCount: 0,
        itemsCountPerPage: 5,
        pageRangeDisplayed: 10,
        activePage: 1
    }
}

function groupReducer(state=initialState, action) {
	let payload;
	switch(action.type) {
    	case LIST_SECTIONS:
			payload = action.payload;

			return {
				...state,
				list: payload.sections,
				pagination: {
					...state.pagination,
					activePage: payload.activePage,
					totalItemsCount: payload.count
				}
			};

		case UPDATE_FORM:
			payload = action.payload;

			return {
				...state,
				form: payload
			}

		default:
			return state;
  }
}

export default groupReducer;