import { all, put, call, takeLatest, take, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import { validateError } from 'common/utils';
import { fetchDisciplineAPI } from 'screens/Disciplines/api';
import { listGroupsSagas } from '../actions';
import { PROVIDE_GROUP_SAGAS, LIST_GROUPS } from '../types';
import { provideGroupAPI } from '../api';

function* provideGroup(action) {
    const groupID = action.payload;

    try {
        yield call(provideGroupAPI, groupID);

        const pagination = yield select(state => state.group.pagination);
        const discipline = yield select(state => state.router.location.state.discipline);
        yield put(listGroupsSagas(pagination.activePage));
        yield take([LIST_GROUPS]);

        const disciplineResponse = yield call(fetchDisciplineAPI, discipline.id);
        const newDiscipline = disciplineResponse.data;
        yield put(push(`/profile/${makeURL(newDiscipline.title)}/groups`, { discipline: newDiscipline }));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(PROVIDE_GROUP_SAGAS, provideGroup);
}

export default function* rootSaga() {
    yield all([watch()]);
}