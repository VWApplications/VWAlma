import { LIST_STUDENTS } from './types';

const initialState = {
    list: [],
    pagination: {
        totalItemsCount: 0,
        itemsCountPerPage: 5,
        pageRangeDisplayed: 10,
        activePage: 1
    }
}

function studentReducer(state=initialState, action) {
	let payload;
	switch(action.type) {
    	case LIST_STUDENTS:
			payload = action.payload;

			return {
				...state,
				list: payload.students,
				pagination: {
					...state.pagination,
					activePage: payload.activePage,
					totalItemsCount: payload.count
				}
			};

		default:
			return state;
  }
}

export default studentReducer;