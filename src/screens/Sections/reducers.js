import { LIST_SECTIONS, UPDATE_FORM } from './types';
import { TRADITIONAL } from './constants';

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

			let form_data = payload;
			if (payload && payload.methodology === TRADITIONAL) {
				const length = payload.exam_config.length;
				form_data = {
					...payload,
					exam_config: null,
					duration: length > 0 ? payload.exam_config[0].duration : 30,
					datetime: length > 0 ? new Date(payload.exam_config[0].datetime) : new Date()
				}
			}

			return {
				...state,
				form: form_data
			}

		default:
			return state;
  }
}

export default groupReducer;