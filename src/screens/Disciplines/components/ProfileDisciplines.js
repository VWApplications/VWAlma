import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'query-string';
import { BreakLine } from 'common';
import { listDisciplinesSagas } from '../actions';
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
        dispatch(listDisciplinesSagas(1, stringify(this.state)));
    }

    __filterDisciplines(filter) {
        const { dispatch, pagination } = this.props;
        this.setState({page: pagination.activePage, filter});
        const queryString = stringify({page: pagination.activePage, filter});
        dispatch(listDisciplinesSagas(pagination.activePage, queryString));
    }

    render() {
        const { disciplines, pagination, user } = this.props;

        return (
            <Main>
                <TabList>
                    <Tab link="#all" title="Todas as disciplinas" className={"active"} onClick={() => this.__filterDisciplines("all")}>
                        Mostra todas as disciplinas das quais você faz parte.
                    </Tab>

                    <Tab link="#monitor" title="Disciplinas como monitor" onClick={() => this.__filterDisciplines("monitor")}>
                        Mostra as disciplinas que você é monitor.
                    </Tab>

                    {user.is_teacher ?
                        <Tab link="#teacher" title="Disciplinas criadas" onClick={() => this.__filterDisciplines("created")}>
                            Mostra as disciplinas que você criou.
                        </Tab>
                    :
                        <Tab link="#student" title="Disciplinas como estudante" onClick={() => this.__filterDisciplines("student")}>
                            Mostra as disciplinas das quais você faz parte.
                        </Tab>
                    }
                </TabList>
                <BreakLine />

                <Accordion>
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
                                        <FooterButton icon="fa-eye" type="primary" title="Entrar" onClick={() => console.log("Entrar")} />
                                        <FooterButton icon="fa-trophy" type="primary" title="Hall da fama" onClick={() => console.log("Hall da fama")} />
                                        <FooterButton icon="fa-edit" type="primary" title="Editar" onClick={() => console.log("Editar")} />
                                        <FooterButton icon="fa-trash" type="danger" title="Deletar" onClick={() => console.log("Deletar")} />
                                    </FooterButtonGroup>
                                </CollapseFooter>
                            </PanelBody>
                        </Panel>
                    ))}
                </Accordion>
                <CustomPagination
                    pagination={pagination}
                    listObjectAction={listDisciplinesSagas}
                    filter={this.state.filter}
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