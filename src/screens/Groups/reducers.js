import { LIST_GROUPS } from './types';

const initialState = {
    list: [],
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
    	case LIST_GROUPS:
			payload = action.payload;

			return {
				...state,
				list: payload.groups,
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

export default groupReducer;