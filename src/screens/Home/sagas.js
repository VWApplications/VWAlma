import { all } from 'redux-saga/effects';
import getNews from './sagas/getNews';
import listNews from './sagas/listNews';
import contact from './sagas/contact';

export default function* rootSaga() {
    yield all([
        getNews(),
        listNews(),
        contact()
    ]);
}