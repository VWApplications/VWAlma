import { LIST_DISCIPLINE } from './types';

const initialState = {
  	list: [],
	obj: null,
	pagination: {
        totalItemsCount: 0,
		itemsCountPerPage: 5,
		pageRangeDisplayed: 10,
		activePage: 1
    }
}

function disciplinesReducer(state=initialState, action) {
	let payload;
	switch(action.type) {
    	case LIST_DISCIPLINE:
			payload = action.payload;

			return {
				...state,
				list: payload.disciplines,
				obj: null,
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

export default disciplinesReducer;