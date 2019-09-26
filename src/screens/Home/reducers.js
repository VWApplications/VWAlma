import { LIST_NEWS, GET_NEWS } from './types';

const initialState = {
    news_list: [],
    news: null,
    pagination: {
        totalItemsCount: 0,
		itemsCountPerPage: 5,
		pageRangeDisplayed: 10,
		activePage: 1
    }
}

function homeReducer(state=initialState, action) {
    let payload;
    switch(action.type) {
        case LIST_NEWS:
            payload = action.payload;

            return {
                ...state,
                news_list: payload.news,
                pagination: {
                    ...state.pagination,
                    activePage: payload.activePage,
                    totalItemsCount: payload.count
                }
            };

        case GET_NEWS:
            payload = action.payload;

            return {...state, news: payload};

        default:
            return state;
    }
}

export default homeReducer;