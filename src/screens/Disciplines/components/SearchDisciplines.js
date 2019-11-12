import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'query-string';
import { Form, Field } from 'react-final-form';
import { validateEnterDiscipline } from '../validate';
import { Main, FormStyled, Search, Pagination, Info, StringToHtml } from 'common';
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

    __search(data, form) {
        const { dispatch, pagination } = this.props;

        if (data)
            this.setState({ search: data.search });
        else
            this.setState({ search: undefined });

        const queryString = stringify({page: pagination.activePage, search: data.search, order: this.state.order});

        setTimeout(form.reset);
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

    __enterDisciplineSubmit(data, disciplineID, form) {
        const { dispatch } = this.props;
        setTimeout(form.reset);
        dispatch(enterDisciplineSagas(data, disciplineID));
    } 

    render() {
        const { pagination, disciplines } = this.props;

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
            <Main navigation={navigator} menu="profile" title="Procurar Disciplinas" icon="fa-search">
                <Search
                    onSubmit={(data, form) => this.__search(data, form)}
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
                                    <FooterInfo teacher={discipline.teacher.user.short_name} course={discipline.course} />
                                    <FooterPassword>
                                        <Form
                                            onSubmit={(data, form) => this.__enterDisciplineSubmit(data, discipline.id, form)}
                                            initialValues={this.state.initialValues}
                                            validate={validateEnterDiscipline}
                                            render={({handleSubmit, submitting, invalid}) => (
                                                <FormStyled onSubmit={handleSubmit}>
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
                                                </FormStyled>
                                            )}
                                        />
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

const mapStateToProps = state => {
    const { list, pagination } = state.discipline.all;

    return { disciplines: list, pagination }
}

export default connect(mapStateToProps)(DisciplineSearch);