import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'query-string';
import { push } from 'connected-react-router';
import { BreakLine, Info } from 'common';
import { choiceAlert } from 'common/alerts';
import { listDisciplinesSagas, deleteDisciplineSagas } from '../actions';
import CustomPagination from 'common/components/Pagination';
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
        if (await choiceAlert(
            "Deletar disciplina",
            `Tem certeza que deseja deletar a disciplina: ${discipline.title}`,
            "Sim", "Não",
            "Disciplina deletada", "",
            "Operação cancelada", ""
        )) {
            const { dispatch } = this.props;
            dispatch(deleteDisciplineSagas(discipline.id));
        }
    }

    render() {
        const { disciplines, pagination, user, dispatch } = this.props;

        return (
            <Main>
                <TabList>
                    <Tab link="#all" title="Todas as disciplinas" className={"active"} onClick={() => this.__filterDisciplines("all")}>
                        Mostra todas as disciplinas das quais você faz parte.
                    </Tab>

                    {!user.is_teacher ? 
                        <Tab link="#student" title="Disciplinas como estudante" onClick={() => this.__filterDisciplines("student")}>
                            Mostra as disciplinas das quais você faz parte.
                        </Tab>
                    : null}

                    {!user.is_teacher ?
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
                                    {discipline.description}
                                </CollapseBody>

                                <CollapseFooter>
                                    <FooterInfo teacher={discipline.teacher.short_name} course={discipline.course} />

                                    <FooterButtonGroup>
                                        <FooterButton icon="fa-eye" type="primary" title="Entrar" onClick={() => dispatch(push("/profile"))} />
                                        <FooterButton icon="fa-trophy" type="primary" title="Hall da fama" onClick={() => dispatch(push("/profile"))} />
                                        {user.is_teacher ?
                                            <FooterButton icon="fa-edit" type="primary" title="Editar" onClick={() => dispatch(push("/profile/discipline-form", discipline))} />
                                        : null}
                                        {user.is_teacher ?
                                            <FooterButton icon="fa-trash" type="danger" title="Deletar" onClick={() => this.__deleteDiscipline(discipline)} />
                                        : null}
                                    </FooterButtonGroup>
                                </CollapseFooter>
                            </PanelBody>
                        </Panel>
                    ))}
                </Accordion>
                <CustomPagination
                    pagination={pagination}
                    listObjectAction={listDisciplinesSagas}
                    filters={{filter: this.state.filter}}
                />
            </Main>
        )
    }
}

const mapStateToProps = state => {
    const { list, pagination } = state.discipline;
    const { user } = state.account;
    return { disciplines: list, pagination, user };
}

export default connect(mapStateToProps)(ProfileDisciplines);