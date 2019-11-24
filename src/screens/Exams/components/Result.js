import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeURL } from 'common/utils';
import { Main, Info } from 'common';
import { QUESTION_EXAM } from '../constants';
import { resultSagas } from '../actions';
import {
    RightButtons, Table, TableFooter, TableLine,
    TableCol, TableList, ListItem, ItemLabel, Icon
} from '../styles/result';

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

        const rightButtons = <RightButtons pdfClick={() => this.__pdfDownload()} csvClick={() => this.__csvDownload()} />

        return (
            <Main navigation={navigator} menu={this.menu} title="Resultados" icon="fa fa-area-chart" rightComponent={rightButtons}>
                {questions.length === 0 ? <Info>Não há submissões</Info> :
                    <Table showCorrectAnswers={this.showCorrectAnswers}>
                        {questions.map((obj, index) => (
                            <TableLine key={index}>
                                <TableCol>{obj.question}</TableCol>
                                <TableCol>
                                    <TableList>
                                        {obj.alternatives.map((alternative, index) => (
                                            <ListItem key={index}>
                                                <ItemLabel>
                                                    {typeof alternative.answer !== "boolean" ?
                                                        alternative.answer :
                                                        alternative.answer ?
                                                            <Icon>fa-circle</Icon>
                                                        :
                                                            <Icon>fa-circle-thin</Icon>
                                                    }
                                                </ItemLabel>
                                                {alternative.title}
                                            </ListItem>
                                        ))}
                                    </TableList>
                                </TableCol>
                                {this.showCorrectAnswers ?
                                    <TableCol>
                                        {typeof obj.correct_answer === "string" ? obj.correct_answer :
                                            <TableList>
                                                {obj.correct_answer.map((alternative, index) => (
                                                    <ListItem key={index}>
                                                        <ItemLabel>{alternative.answer}</ItemLabel> {alternative.title}
                                                    </ListItem>
                                                ))}
                                            </TableList>
                                        }
                                    </TableCol>
                                : null}
                                {this.showCorrectAnswers ?
                                    <TableCol>
                                        <span className="label label-primary">{obj.score}</span>
                                    </TableCol>
                                : null}
                            </TableLine>
                        ))}
                    </Table>
                }
                <TableFooter result={result} />
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