import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { Main, PageHeader, Form, Search } from 'common';
import { stringify } from 'query-string';
import { reduxForm, Field } from 'redux-form';
import {
    Panel, PanelHeader, PanelContainer, PanelBody, CollapseBody,
    CollapseFooter, FooterInfo, FooterPassword, InputGroup, SubmitButton
} from '../styles/searchDisciplines';

class DisciplineSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: undefined,
            order: undefined
        }
    }

    __search(data) {
        const { dispatch } = this.props;

        if (data)
            this.setState({ search: data.search });
        else
            this.setState({ search: undefined });

        const queryString = stringify({page: 1, search: data.search, order: this.state.order});

        console.log(queryString);

        dispatch(reset("SearchForm"));
        // dispatch(listAllDisciplinesSagas(pagination.activePage, queryString));
    }

    __filter(value) {
        if (value)
            this.setState({ order: value });
        else
            this.setState({ order: undefined });

        const queryString = stringify({page: 1, search: this.state.search, order: value});

        console.log(queryString);
        // dispatch(listAllDisciplinesSagas(pagination.activePage, queryString));
    }

    __enterDisciplineSubmit(data) {
        console.log(data);
        // dispatch(enterDisciplineSagas(pagination.activePage, queryString));
    } 

    render() {
        const { user, handleSubmit, submitting, invalid } = this.props;

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
                    {/* Loop de disciplinas */}
                    <PanelContainer>
                        <PanelHeader id={1} classroom="Turma A">
                            Teste de Software
                        </PanelHeader>

                        <PanelBody id="1">
                            <CollapseBody qtdStudents={5} totalStudents={60}>
                                Descrição da disciplina
                            </CollapseBody>

                            <CollapseFooter>
                                <FooterInfo teacher="Ricardo Ajax" course="Engenharia de Software" />
                                <FooterPassword>
                                    <Form onSubmit={handleSubmit((data) => this.__enterDisciplineSubmit(data))}>
                                        <InputGroup>
                                            <Field
                                                component={"input"}
                                                type="password"
                                                className="form-control"
                                                name="discipline_password"
                                                placeholder="Senha para entrar na disciplina."
                                            />
                                            <SubmitButton disabled={submitting || invalid} /> 
                                        </InputGroup>
                                    </Form>
                                </FooterPassword>
                            </CollapseFooter>
                        </PanelBody>
                    </PanelContainer>
                </Panel>
                {/* Paginação */}
            </Main>
        )
    }
}

const form = reduxForm({
    form: "SearchDisciplineForm",
    // validate: validateDiscipline,
    enableReinitialize: true
})(DisciplineSearch);

const mapStateToProps = state => {
    const { user } = state.account;

    return { user }
}

export default connect(mapStateToProps)(form);