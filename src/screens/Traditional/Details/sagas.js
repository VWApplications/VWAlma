import { all } from 'redux-saga/effects';
import finishSection from './sagas/finishSection';

export default function* rootSaga() {
    yield all([finishSection()]);
}