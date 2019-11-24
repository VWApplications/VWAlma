import { LIST_QUESTIONS, RESULT_ACTION } from './types';

const initialState = {
	list: [],
	result: null,
    pagination: {
        totalItemsCount: 0,
        itemsCountPerPage: 1,
        pageRangeDisplayed: 10,
        activePage: 1
    }
}

function questionReducer(state=initialState, action) {
	let payload;
	switch(action.type) {
    	case LIST_QUESTIONS:
			payload = action.payload;

			return {
				...state,
				list: payload.questions,
				pagination: {
					...state.pagination,
					activePage: payload.activePage,
					totalItemsCount: payload.count
				}
			};

		case RESULT_ACTION:
			payload = action.payload;

			return {
				...state,
				result: payload
			}

		default:
			return state;
  }
}

export default questionReducer;