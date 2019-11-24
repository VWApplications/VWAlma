import React from 'react';
import styled from 'styled-components';

export const RightButtons = ({ pdfClick, csvClick }) => (
    <div className="btn-group pull-right">
        <button type="button" className="btn btn-primary" onClick={pdfClick}>Baixar PDF</button>
        <button type="button" className="btn btn-primary" onClick={csvClick}>Baixar CSV</button>
    </div>
)

export const Table = ({children, showCorrectAnswers}) => (
    <div className="table-responsive">
        <table className="table">
            <thead>
                <tr>
                    <th>Questão</th>
                    <th>Resposta</th>
                    {showCorrectAnswers ? <th>Resposta Correta</th> : null}
                    {showCorrectAnswers ? <th>Pontuação</th> : null}
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    </div>
)

export const TableFooter = ({ result }) => (
    <div className="panel panel-default">
        <div className="panel-body">
            <div className="row">
                <div className="col-sm-6">
                    {result ?
                        result.grade < 5 ?
                            <div>Nota: <span className="label label-danger">{result ? result.grade : "N/A"}</span></div>
                        :
                            <div>Nota: <span className="label label-success">{result ? result.grade : "N/A"}</span></div>
                    : null}
                </div>
                <div className="col-sm-6">
                    <div className="pull-right">
                        Pontuação: <span className="label label-primary">{result ? `${result.score}/${result.qtd}` : "N/A"}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export const TableLine = ({ children }) => (
    <tr>{children}</tr>
)

export const TableCol = ({ children }) => (
    <td>{children}</td>
)

const TableListStyled = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const TableList = ({ children }) => (
    <TableListStyled>{children}</TableListStyled>
)

export const ListItem = ({ children }) => (
    <li>{children}</li>
)

const ItemLabelStyled = styled.span`
    margin-right: 10px;
`;

export const ItemLabel = ({ children }) => (
    <ItemLabelStyled className="label label-primary">{children}</ItemLabelStyled>
)

export const Icon = ({ children }) => (
    <i className={`fa ${children}`}></i>
)