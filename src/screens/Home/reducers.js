import { LIST_NEWS, GET_NEWS } from './types';

const initialState = {
    news_list: [],
    news: null
}

function homeReducer(state=initialState, action) {
    let payload;
    switch(action.type) {
        case LIST_NEWS:
            payload = action.payload;

            return {...state, news_list: payload};

        case GET_NEWS:
            payload = action.payload;

            return {...state, news: payload};

        default:
            return state;
    }
}

export default homeReducer;