import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'query-string';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import { TEACHER } from 'common/constants';
import { BreakLine, Info, StringToHtml, Pagination } from 'common';
import { requestChoiceAlert } from 'common/alerts';
import { listDisciplinesSagas, deleteDisciplineSagas } from '../actions';
import {
    Main, TabList, Tab, Accordion, Panel, PanelHeader,
    PanelBody, CollapseBody, CollapseFooter, FooterInfo,
    FooterButtonGroup, FooterButton
} from '../styles/profileDisciplines';

class ProfileDisciplines extends Component {

    constructor(props) {
        super(props);
        this.state = {page: "1", filter: "all"}
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(listDisciplinesSagas(1, stringify({...this.state})));
    }

    __filterDisciplines(filter) {
        const { dispatch, pagination } = this.props;
        this.setState({page: pagination.activePage, filter});
        const queryString = stringify({page: pagination.activePage, filter});
        dispatch(listDisciplinesSagas(pagination.activePage, queryString));
    }

    async __deleteDiscipline(discipline) {
        if (await requestChoiceAlert(
            "Deletar disciplina",
            `Tem certeza que deseja deletar a disciplina: ${discipline.title}`,
            "Sim", "Não", "Operação cancelada", ""
        )) {
            const { dispatch } = this.props;
            dispatch(deleteDisciplineSagas(discipline.id));
        }
    }

    __redirectToDisciplineDetail(discipline) {
        const { dispatch } = this.props;
        const state = { discipline };
        dispatch(push(`/profile/${makeURL(discipline.title)}/detail`, state));
    }

    render() {
        const { disciplines, pagination, account, dispatch } = this.props;

        return (
            <Main>
                <TabList>
                    <Tab link="#all" title="Todas as disciplinas" className={"active"} onClick={() => this.__filterDisciplines("all")}>
                        Mostra todas as disciplinas das quais você faz parte.
                    </Tab>

                    {!account.permission === TEACHER ? 
                        <Tab link="#student" title="Disciplinas como estudante" onClick={() => this.__filterDisciplines("student")}>
                            Mostra as disciplinas das quais você faz parte.
                        </Tab>
                    : null}

                    {!account.permission === TEACHER ?
                        <Tab link="#monitor" title="Disciplinas como monitor" onClick={() => this.__filterDisciplines("monitor")}>
                            Mostra as disciplinas que você é monitor.
                        </Tab>
                    : null}
                </TabList>
                <BreakLine />

                <Accordion>
                    {disciplines.length === 0 ? <Info>Não há disciplinas disponível.</Info> : null}
                    {disciplines.map((discipline, index) => (
                        <Panel key={index}>
                            <PanelHeader id={index} classroom={discipline.classroom}>
                                {discipline.title}
                            </PanelHeader>

                            <PanelBody id={index}>
                                <CollapseBody qtdStudents={discipline.students.length} totalStudents={discipline.students_limit}>
                                    <StringToHtml resume={true}>{discipline.description}</StringToHtml>
                                </CollapseBody>

                                <CollapseFooter>
                                    <FooterInfo teacher={discipline.teacher.user.short_name} course={discipline.course} />

                                    <FooterButtonGroup>
                                        <FooterButton icon="fa-eye" type="primary" title="Entrar" onClick={() => this.__redirectToDisciplineDetail(discipline)} />
                                        {account.permission === TEACHER ?
                                            <FooterButton icon="fa-edit" type="primary" title="Editar" onClick={() => dispatch(push("/profile/discipline-form", discipline))} />
                                        : null}
                                        {account.permission === TEACHER ?
                                            <FooterButton icon="fa-trash" type="danger" title="Deletar" onClick={() => this.__deleteDiscipline(discipline)} />
                                        : null}
                                    </FooterButtonGroup>
                                </CollapseFooter>
                            </PanelBody>
                        </Panel>
                    ))}
                </Accordion>
                <Pagination
                    pagination={pagination}
                    listObjectAction={listDisciplinesSagas}
                    filters={{filter: this.state.filter}}
                />
            </Main>
        )
    }
}

const mapStateToProps = state => {
    const { list, pagination } = state.discipline.profile;
    const { user } = state.account;
    return { disciplines: list, pagination, account: user };
}

export default connect(mapStateToProps)(ProfileDisciplines);