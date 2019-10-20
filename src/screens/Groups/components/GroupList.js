import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { makeURL } from 'common/utils';
import { InputField } from 'common/fields';
import { Main, Info, Search, Form, SubmitButton, Fieldset, Pagination } from 'common';
import { validateCreateGroup } from '../validate';
import { listGroupsSagas } from '../actions';
import {
    StudentContainer, StudentBox, StudentHeader, StudentBody,
    GroupContainer, GroupPanel, GroupPanelHeader, GroupPanelBody,
    GroupPanelContent, GroupPanelFooter, AddGroupButton
} from '../styles/groupList';

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {form: false, formTitle: "Criar novo grupo"};
    }

    componentDidMount() {
        const { dispatch, pagination, state } = this.props;
        dispatch(listGroupsSagas(state.discipline, pagination.activePage));
    }

    __addStudent(data) {
        const { dispatch } = this.props;
        console.log(data);
        dispatch(reset("SearchForm"));
    }

    __removeStudent(data) {
        console.log(data);
    }

    __provideGroup(data) {
        console.log(data);
    }

    __editGroup(data) {
        console.log(data);
        this.setState({form: true, formTitle: "Editar grupo"});
    }

    __deleteGroup(data) {
        console.log(data);
    }

    __addGroup(data) {
        const { dispatch } = this.props;
        console.log(data);
        dispatch(reset("GroupForm"));
        this.setState({form: false, formTitle: "Criar novo grupo"});
    }

    render() {
        const { state, handleSubmit, submitting, invalid, pagination, groups } = this.props;
        const discipline = state.discipline;

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state },
            {title: "Grupos", url: `/profile/${makeURL(discipline.title)}/groups`, state }
        ]

        const AddButton = <AddGroupButton opened={this.state.form} onClick={() => this.setState({form: !this.state.form, formTitle: "Criar novo grupo"})} />

        // const students = [
        //     {id: 1, short_name: "Aluno1", email: "aluno1@gmail.com", identifier: "13/0129348"},
        //     {id: 2, short_name: "Aluno2", email: "aluno2@gmail.com"},
        //     {id: 3, short_name: "Aluno3", email: "aluno3@gmail.com"},
        //     {id: 4, short_name: "Aluno4", email: "aluno4@gmail.com"},
        //     {id: 5, short_name: "Aluno5", email: "aluno5@gmail.com"},
        //     {id: 6, short_name: "Aluno6", email: "aluno6@gmail.com"},
        //     {id: 7, short_name: "Aluno7", email: "aluno7@gmail.com"}
        // ];

        // const groups = [
        //     {id: 1, title: "Cavaleiros do zodiaco", students: [...students], students_limit: 6}
        // ];

        return (
            <Main navigation={navigator} menu="discipline" title="Lista de Grupos" rightComponent={AddButton}>
                {this.state.form ? 
                    <Form onSubmit={handleSubmit((data) => this.__addGroup(data))}>
                        <Fieldset title={this.state.formTitle}>
                            <Field
                                component={InputField}
                                type="text"
                                label="Título"
                                className="form-control"
                                name="title"
                                placeholder="Título da disciplina."
                            />
                            <Field
                                component={InputField}
                                type="number"
                                label="Quantidade de estudantes"
                                className="form-control"
                                name="students_limit"
                                placeholder="Quantidade de estudantes limite do grupo."
                            />

                            <SubmitButton disabled={submitting || invalid}>Enviar</SubmitButton>
                        </Fieldset>
                    </Form>
                : null}

                <GroupContainer>
                    {groups.length === 0 ? <Info>Não há grupos nessa disciplina.</Info> : null}
                    {groups.map((group, index) => (
                        <GroupPanel key={index}>
                            <GroupPanelHeader
                                qtdStudent={group.students.length}
                                totalStudent={group.students_limit}
                                statusTitle="Grupo Liberado"
                                statusType="success"
                                id={group.id}>
                                {group.title}
                            </GroupPanelHeader>

                            <GroupPanelBody id={group.id}>
                                <GroupPanelContent>
                                    <Search
                                        onSubmit={data => this.__addStudent(data)}
                                        name="email"
                                        placeholder="Insira o email do estudante para adicioná-lo ao grupo."
                                        icon="fa-plus"
                                    />
                                    <StudentContainer>
                                        {group.students.length === 0 ? <Info>Não há estudantes nesse grupo.</Info> : null}
                                        {group.students.map((student, index) => (
                                            <StudentBox key={index}>
                                                <StudentHeader src={student.photo} />

                                                <StudentBody email={student.email} id={student.identifier} onClose={() => this.__removeStudent({"id": student.id})}>
                                                    {student.short_name}
                                                </StudentBody>
                                            </StudentBox>
                                        ))}
                                    </StudentContainer>
                                </GroupPanelContent>

                                <GroupPanelFooter
                                    sendClick={() => this.__provideGroup({"id": group.id})}
                                    editClick={() => this.__editGroup({"id": group.id})}
                                    deleteClick={() => this.__deleteGroup({"id": group.id})}
                                />
                            </GroupPanelBody>
                        </GroupPanel>
                    ))}
                </GroupContainer>
                <Pagination
                    pagination={pagination}
                    listObjectAction={listGroupsSagas}
                    object={discipline}
                />
            </Main>
        )
    }
}

const form = reduxForm({
    form: "GroupForm",
    validate: validateCreateGroup,
    enableReinitialize: true
})(GroupList);

const mapStateToProps = state => {
    const { location } = state.router;
    const { list, pagination } = state.group;

    return { state: location.state, groups: list, pagination };
}

export default connect(mapStateToProps)(form);