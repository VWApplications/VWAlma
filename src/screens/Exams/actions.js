import {
    LIST_QUESTIONS, LIST_QUESTIONS_SAGAS, CREATE_QUESTION_SAGAS,
    UPDATE_QUESTION_SAGAS, DELETE_QUESTION_SAGAS, FETCH_QUESTION,
    SUBMIT_SAGAS, RESULT_SAGAS, RESULT_ACTION
} from './types';

export function listQuestionsAction(questions, activePage, count) {
    return {type: LIST_QUESTIONS, payload: {questions, activePage, count}};
}

export function listQuestionsSagas(activePage, queryString=null, test=false) {
    return {type: LIST_QUESTIONS_SAGAS, payload: {activePage, queryString, test}};
}

export function fetchQuestion(question) {
    return {type: FETCH_QUESTION, payload: question}
}

export function createQuestionSagas(data) {
    return {type: CREATE_QUESTION_SAGAS, payload: data};
}

export function updateQuestionSagas(data, questionID) {
    return {type: UPDATE_QUESTION_SAGAS, payload: {data, questionID}};
}

export function deleteQuestionSagas(questionID) {
    return {type: DELETE_QUESTION_SAGAS, payload: questionID};
}

export function submitExamSagas(data, form) {
    return {type: SUBMIT_SAGAS, payload: { data, form }};
}

export function resultAction(data) {
    return {type: RESULT_ACTION, payload: data};
}

export function resultSagas() {
    return {type: RESULT_SAGAS};
}