import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeURL } from 'common/utils';
import { Main, Info } from 'common';
import { QUESTION_EXAM } from '../constants';
import { resultSagas } from '../actions';

class Result extends Component {
    constructor(props) {
        super(props);
        this.showCorrectAnswers = true;
        this.menu = "traditional";
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(resultSagas());
    }

    __pdfDownload() {
        console.log("Baixando PDF");
    }

    __csvDownload() {
        console.log("Baixando CSV");
    }

    render() {
        const { state, result } = this.props;
        const discipline = state.discipline;
        const section = state.section;

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state: { discipline } },
            {title: "Seções", url: `/profile/${makeURL(discipline.title)}/sections`, state: { discipline } },
            {title: section.title, url: `/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/detail`, state },
            {title: "Resultados", url: `/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/results`, state }
        ]

        const questions = result ? result.questions : []; 

        if (section.methodology === QUESTION_EXAM.TBL) {
            this.menu = "tbl";
            this.showCorrectAnswers = false;
        }

        const rightButtons = (
            <div className="btn-group pull-right">
                <button type="button" className="btn btn-primary" onClick={() => this.__pdfDownload()}>Baixar PDF</button>
                <button type="button" className="btn btn-primary" onClick={() => this.__csvDownload()}>Baixar CSV</button>
            </div>
        )

        return (
            <Main navigation={navigator} menu={this.menu} title="Resultados" icon="fa fa-area-chart" rightComponent={rightButtons}>
                {questions.length === 0 ? <Info>Não há submissões</Info> :
                    <div className="table-responsive">
                        <table className="table">
                        <thead>
                                <tr>
                                    <th>Questão</th>
                                    <th>Resposta</th>
                                    {this.showCorrectAnswers ? <th>Resposta Correta</th> : null}
                                    {this.showCorrectAnswers ? <th>Pontuação</th> : null}
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((obj, index) => (
                                    <tr key={index}>
                                        <td>{obj.question}</td>
                                        <td>
                                            <ul style={{"listStyleType": "none", "padding": "0"}}>
                                                {obj.alternatives.map((alternative, index) => (
                                                    <li key={index}>
                                                        <span className="label label-primary" style={{"marginRight": "10px"}}>
                                                            {typeof alternative.answer !== "boolean" ?
                                                                alternative.answer :
                                                                alternative.answer ?
                                                                    <i className="fa fa-circle"></i>
                                                                :
                                                                    <i className="fa fa-circle-thin"></i>
                                                            }
                                                        </span>
                                                        {alternative.title}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        {this.showCorrectAnswers ?
                                            <td>
                                                {typeof obj.correct_answer === "string" ? obj.correct_answer :
                                                    <ul style={{"listStyleType": "none", "padding": "0"}}>
                                                        {obj.correct_answer.map((alternative, index) => (
                                                            <li key={index}>
                                                                <span className="label label-primary" style={{"marginRight": "10px"}}>
                                                                    {alternative.answer}
                                                                </span>
                                                                {alternative.title}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                }
                                            </td>
                                        : null}
                                        {this.showCorrectAnswers ? <td><span className="label label-primary">{obj.score}</span></td> : null}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
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
            </Main>
        )
    }
}

const mapStateToProps = state => {
    const { location } = state.router;
    const { result } = state.exam;

    return { state: location.state, result }
}

export default connect(mapStateToProps)(Result);