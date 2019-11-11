import React from 'react';
import { QUESTION_TYPE } from '../constants';
import styled from 'styled-components';

export const FeedbackTable = ({ children }) => (
    <div>
        <h3>Feedback</h3>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Tipo de questão</th>
                    <th>Título da Questão</th>
                    <th>Resposta</th>
                </tr>
            </thead>
            <tbody className="text-justify">
                {children}
            </tbody>
        </table>
    </div>
)

export const TableBody = ({ question, alternatives }) => (
    <tr>
        <td>
            {question.question === QUESTION_TYPE.V_OR_F ?
                "Verdadeiro ou Falso"
            : question.question === QUESTION_TYPE.SHOT ?
                "Aposta"
            : "Multipla Escolha"}
        </td>
        <td>{question.title}</td>
        <td><ul>{alternatives}</ul></td>
    </tr>
)

export const TableAlternatives = ({ alternative, type }) => (
    <li>
        {type === QUESTION_TYPE.SHOT ?
            <span className="label label-primary">
                {alternative.answer}
            </span>
        : type === QUESTION_TYPE.V_OR_F ?
            <span className="label label-primary">
                {alternative.answer === true ? "V" : "F"}
            </span>
        : null}
        {" " + alternative.title}
    </li>
)