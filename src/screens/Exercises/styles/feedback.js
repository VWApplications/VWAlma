import React from 'react';
import { QUESTION_TYPE } from '../constants';
import styled from 'styled-components';

const TableHeader = styled.tr`
    background: #343841;
    color: white;
`;

const TableVerticalScroll = styled.div`
    position: relative;
    max-height: 300px;
    overflow: auto;
    display: block;
    padding: 0;
`;

const PanelHeading = styled.div`
    background-color: #343841 !important;
    color: white !important;
`;

export const FeedbackTable = ({ children }) => (
    <div className="panel panel-default">
        <PanelHeading className="panel-heading">
            <h4>Feedback</h4>
        </PanelHeading>
        <TableVerticalScroll className="panel-body">
            <table className="table table-striped table-responsive">
                <thead>
                    <TableHeader>
                        <th>Título da Questão</th>
                        <th>Tipo de questão</th>
                        <th>Resposta</th>
                    </TableHeader>
                </thead>
                <tbody className="text-justify">
                    {children}
                </tbody>
            </table>
        </TableVerticalScroll>
    </div>
)

const StyledUL = styled.ul`
    padding-left: 2px;
`;

const StyledTD = styled.td`
    border-top: none !important;
`;

export const TableBody = ({ question, alternatives }) => (
    <tr>
        <StyledTD>{question.title}</StyledTD>
        <StyledTD>
            {question.question === QUESTION_TYPE.V_OR_F ?
                "Verdadeiro ou Falso"
                : question.question === QUESTION_TYPE.SHOT ?
                    "Aposta"
                    : "Multipla Escolha"}
        </StyledTD>
        <StyledTD><StyledUL>{alternatives}</StyledUL></StyledTD>
    </tr>
)

const StyledLI = styled.li`
    list-style-type: none;
`;

export const TableAlternatives = ({ alternative, type }) => (
    <StyledLI>
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
    </StyledLI>
)