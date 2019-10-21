import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import { stringify } from 'query-string';
import { LIST_SECTIONS_SAGAS } from '../types';
import { listSectionsAction } from '../actions';
import { getSectionsAPI } from '../api';
import { validateError } from 'common/utils';

function* listSections(action) {
    const { activePage } = action.payload;

    let queryString = stringify({page: activePage});
    const discipline = yield select(state => state.router.location.state.discipline);
    const data = {disciplineID: discipline.id};

    try {
        const response = yield call(getSectionsAPI, data, queryString);

        yield put(listSectionsAction(response.data.results, activePage, response.data.count));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(LIST_SECTIONS_SAGAS, listSections);
}

export default function* rootSaga() {
    yield all([watch()]);
}