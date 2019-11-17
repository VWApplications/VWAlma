import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeURL } from 'common/utils';
import { Main } from 'common';
import { QUESTION_EXAM } from '../constants';

class Result extends Component {
    constructor(props) {
        super(props);
        this.showCorrectAnswers = true;
        this.menu = "traditional";
    }

    render() {
        const { state } = this.props;
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

        if (section.methodology === QUESTION_EXAM.TBL) {
            this.menu = "tbl";
            this.showCorrectAnswers = false;
        }

        const rightButtons = (
            <div className="btn-group">
                <button type="button" className="btn btn-primary">Baixar PDF</button>
                <button type="button" className="btn btn-primary">Baixar CSV</button>
            </div>
        )

        return (
            <Main navigation={navigator} menu={this.menu} title="Resultados" icon="fa fa-area-chart" rightComponent={rightButtons}>
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
                            <tr>
                                <td>Titulo muito doido da questão de aposta</td>
                                <td>
                                    <ul>
                                        <li><span className="label label-primary">2</span> Alternativa 1</li>
                                        <li><span className="label label-primary">0</span> Alternativa 2</li>
                                        <li><span className="label label-primary">0</span> Alternativa 3</li>
                                        <li><span className="label label-primary">2</span> Alternativa 4</li>
                                    </ul>
                                </td>
                                {this.showCorrectAnswers ? <td>Alternativa 3</td> : null}
                                {this.showCorrectAnswers ? <td>0</td> : null}
                            </tr>
                            <tr>
                                <td>Titulo muito doido da questão de V ou F</td>
                                <td>
                                    <ul>
                                        <li><span className="label label-primary">V</span> Alternativa 0</li>
                                        <li><span className="label label-primary">V</span> Alternativa 2</li>
                                        <li><span className="label label-primary">F</span> Alternativa 0</li>
                                        <li><span className="label label-primary">F</span> Alternativa 2</li>
                                    </ul>
                                </td>
                                {this.showCorrectAnswers ?
                                    <td>
                                        <ul>
                                            <li><span className="label label-primary">F</span> Alternativa 0</li>
                                            <li><span className="label label-primary">V</span> Alternativa 2</li>
                                            <li><span className="label label-primary">F</span> Alternativa 0</li>
                                            <li><span className="label label-primary">V</span> Alternativa 2</li>
                                        </ul>
                                    </td>
                                : null}
                                {this.showCorrectAnswers ? <td>8</td> : null}
                            </tr>
                            <tr>
                                <td>Titulo muito doido da questão de multipla escolha</td>
                                <td>
                                    <ul>
                                        <li><span className="label label-primary"><i className="fa fa-circle-thin"></i></span> Alternativa 1</li>
                                        <li><span className="label label-primary"><i className="fa fa-circle"></i></span> Alternativa 2</li>
                                        <li><span className="label label-primary"><i className="fa fa-circle-thin"></i></span> Alternativa 3</li>
                                        <li><span className="label label-primary"><i className="fa fa-circle-thin "></i></span> Alternativa 4</li>
                                    </ul>
                                </td>
                                {this.showCorrectAnswers ? <td>Alternativa 02</td> : null}
                                {this.showCorrectAnswers ? <td>4</td> : null}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="panel panel-default">
                    <div className="panel-body">Nota: <span className="label label-success">6.0</span></div>
                </div>
            </Main>
        )
    }
}

const mapStateToProps = state => {
    const { location } = state.router;
    const { user } = state.account;

    return { state: location.state, account: user }
}

export default connect(mapStateToProps)(Result);