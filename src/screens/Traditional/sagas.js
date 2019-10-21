import { all } from 'redux-saga/effects';
import detailSagas from './Details/sagas';

export default function* rootSaga() {
    yield all([detailSagas()]);
}