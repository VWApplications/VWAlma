import { StringToHtml, Line } from 'common';
import { TEACHER, ADMIN } from 'common/constants';
import React from 'react';

export const QuestionPanel = ({ children, activePage, question }) => (
    <div className="panel panel-default">
        <div className="panel-body">
            <h2>{activePage}) {question.title}</h2>
            {question.description ? <StringToHtml>{question.description}</StringToHtml> : null}
            <Line />
            {children}
        </div>
    </div>
)

export const RightButtons = ({ user, open, feedbackClick, updateClick, deleteClick }) => (
    <div className="btn-group pull-right">
        <button type="button" className="btn btn-primary" onClick={feedbackClick}>
            {open ? "Esconder Feedbacks" : "Mostrar Feedbacks"}
        </button>
        {user.permission === TEACHER || user.permission === ADMIN ?
            <button type="button" className="btn btn-primary" onClick={updateClick}>Atualizar</button>
        : null}
        {user.permission === TEACHER || user.permission === ADMIN ?
            <button type="button" className="btn btn-danger" onClick={deleteClick}>Deletar</button>
        : null}
    </div>
)