import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import { stringify } from 'query-string';
import { LIST_GROUPS_SAGAS } from '../types';
import { listGroupsAction } from '../actions';
import { getGroupsAPI } from '../api';
import { validateError } from 'common/utils';

function* listGroups(action) {
    const { activePage } = action.payload;

    let queryString = stringify({page: activePage});
    const discipline = yield select(state => state.router.location.state.discipline);
    const data = {disciplineID: discipline.id};

    try {
        const response = yield call(getGroupsAPI, data, queryString);

        yield put(listGroupsAction(response.data.results, activePage, response.data.count));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(LIST_GROUPS_SAGAS, listGroups);
}

export default function* rootSaga() {
    yield all([watch()]);
}