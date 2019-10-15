import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { stringify } from 'query-string';
import { reduxForm, Field } from 'redux-form';
import { validateEnterDiscipline } from '../validate';
import { Main, PageHeader, Form, Search, Pagination, Info, StringToHtml } from 'common';
import {
    Panel, PanelHeader, PanelContainer, PanelBody, CollapseBody,
    CollapseFooter, FooterInfo, FooterPassword, InputGroup, SubmitButton
} from '../styles/searchDisciplines';
import { listAllDisciplinesSagas, enterDisciplineSagas } from '../actions';

class DisciplineSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: undefined,
            order: undefined
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(listAllDisciplinesSagas(1, ""));
    }

    __search(data) {
        const { dispatch, pagination } = this.props;

        if (data)
            this.setState({ search: data.search });
        else
            this.setState({ search: undefined });

        const queryString = stringify({page: pagination.activePage, search: data.search, order: this.state.order});

        dispatch(reset("SearchForm"));
        dispatch(listAllDisciplinesSagas(pagination.activePage, queryString));
    }

    __filter(value) {
        const { dispatch, pagination } = this.props;

        if (value)
            this.setState({ order: value });
        else
            this.setState({ order: undefined });

        const queryString = stringify({page: pagination.activePage, search: this.state.search, order: value});

        dispatch(listAllDisciplinesSagas(pagination.activePage, queryString));
    }

    __enterDisciplineSubmit(data, disciplineID) {
        const { dispatch } = this.props;
        dispatch(reset("EnterDisciplineForm"));
        dispatch(enterDisciplineSagas(data, disciplineID));
    } 

    render() {
        const { pagination, handleSubmit, submitting, invalid, disciplines } = this.props;

        const navigator = [
            {title: "Home", url: "/"},
            {title: "Procurar Disciplinas", url: "/profile/discipline-search"}
        ]

        const filter = [
            {title: "Curso", value: "course"},
            {title: "Disciplina", value: "discipline"},
            {title: "Professor", value: "teacher"}
        ]

        return (
            <Main navigation={navigator} menu="profile">
                <PageHeader>Procurar Disciplinas</PageHeader>

                <Search
                    onSubmit={data => this.__search(data)}
                    filterList={filter}
                    filterTitle="Ordenar"
                    filterSubmit={data => this.__filter(data)}
                />

                <Panel>
                    {disciplines.length === 0 ? <Info>Não há disciplinas disponível.</Info> : null}
                    {disciplines.map((discipline, index) => (
                        <PanelContainer key={index}>
                            <PanelHeader id={index} classroom={discipline.classroom}>
                                {discipline.title}
                            </PanelHeader>

                            <PanelBody id={index}>
                                <CollapseBody qtdStudents={discipline.students.length} totalStudents={discipline.students_limit}>
                                    <StringToHtml>{discipline.description}</StringToHtml>
                                </CollapseBody>

                                <CollapseFooter>
                                    <FooterInfo teacher={discipline.teacher.short_name} course={discipline.course} />
                                    <FooterPassword>
                                        <Form onSubmit={handleSubmit((data) => this.__enterDisciplineSubmit(data, discipline.id))}>
                                            <InputGroup>
                                                <Field
                                                    component={"input"}
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    placeholder="Senha para entrar na disciplina."
                                                />
                                                <SubmitButton disabled={submitting || invalid} /> 
                                            </InputGroup>
                                        </Form>
                                    </FooterPassword>
                                </CollapseFooter>
                            </PanelBody>
                        </PanelContainer>
                    ))}
                </Panel>
                <Pagination
                    pagination={pagination}
                    listObjectAction={listAllDisciplinesSagas}
                    filters={{search: this.state.search, order: this.state.order}}
                />
            </Main>
        )
    }
}

const form = reduxForm({
    form: "EnterDisciplineForm",
    validate: validateEnterDiscipline,
    enableReinitialize: true
})(DisciplineSearch);

const mapStateToProps = state => {
    const { list, pagination } = state.discipline.all;
    const { user } = state.account;

    return { disciplines: list, pagination, user }
}

export default connect(mapStateToProps)(form);