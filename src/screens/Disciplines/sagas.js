import { all } from 'redux-saga/effects';
import profileDisciplines from './sagas/profileDisciplines';

export default function* rootSaga() {
    yield all([
        profileDisciplines()
    ]);
}