import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { choiceAlert } from 'common/alerts';
import { makeURL } from 'common/utils';
import { InputField } from 'common/fields';
import { Main, Info, Search, Form, SubmitButton, Fieldset, Pagination } from 'common';
import { validateCreateGroup } from '../validate';
import {
    listGroupsSagas, createGroupsSagas, updateFormAction,
    updateGroupsSagas, deleteGroupsSagas, provideGroupsSagas
} from '../actions';
import {
    StudentContainer, StudentBox, StudentHeader, StudentBody,
    GroupContainer, GroupPanel, GroupPanelHeader, GroupPanelBody,
    GroupPanelContent, GroupPanelFooter, AddGroupButton
} from '../styles/groupList';

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {opened: false, formTitle: "Criar novo grupo"};
    }

    componentDidMount() {
        const { dispatch, pagination } = this.props;
        dispatch(listGroupsSagas(pagination.activePage));
    }

    __addStudent(data) {
        const { dispatch } = this.props;
        console.log(data);
        dispatch(reset("SearchForm"));
    }

    __removeStudent(data) {
        console.log(data);
    }

    __provideGroup(groupID) {
        const { dispatch } = this.props;
        dispatch(provideGroupsSagas(groupID));
    }

    __editGroup(group) {
        const { dispatch } = this.props;
        this.setState({opened: true, formTitle: "Editar grupo"});
        dispatch(updateFormAction(group));
    }

    async __deleteGroup(groupID) {
        const { dispatch } = this.props;

        const success = await choiceAlert(
            "Removendo grupo",
            "Tem certeza que deseja remover o grupo?",
            "Sim", "Não", "Grupo removido com sucesso!",
            "", "Operação Cancelada!", ""
        )
        if (success)
            dispatch(deleteGroupsSagas(groupID));
    }

    __submit(data) {
        const { dispatch, groupForm } = this.props;

        if (groupForm)
            dispatch(updateGroupsSagas(data, groupForm.id));
        else
            dispatch(createGroupsSagas(data));

        dispatch(reset("GroupForm"));
        this.setState({opened: false, formTitle: "Criar novo grupo"});
    }

    __toogleForm() {
        const { dispatch, groupForm } = this.props;

        if (groupForm) dispatch(updateFormAction(null));

        this.setState({opened: !this.state.opened, formTitle: "Criar novo grupo"})
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

        const AddButton = <AddGroupButton opened={this.state.opened} onClick={() => this.__toogleForm()} />

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
                {this.state.opened ? 
                    <Form onSubmit={handleSubmit((data) => this.__submit(data))}>
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
                                statusTitle={group.is_provided ? "Grupo liberado" : "Grupo não liberado."}
                                statusType={group.is_provided ? "success" : "danger"}
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

                                                <StudentBody
                                                    email={student.email}
                                                    id={student.identifier}
                                                    onClose={() => this.__removeStudent({"id": student.id})}>
                                                    {student.short_name}
                                                </StudentBody>
                                            </StudentBox>
                                        ))}
                                    </StudentContainer>
                                </GroupPanelContent>

                                <GroupPanelFooter
                                    sendClick={() => this.__provideGroup(group.id)}
                                    editClick={() => this.__editGroup(group)}
                                    deleteClick={() => this.__deleteGroup(group.id)}
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
    const { list, pagination, form } = state.group;

    let initialValues = {};
    if (form) {
        initialValues = {
            title: form.title || "",
            students_limit: form.students_limit || ""
        }
    }

    return {state: location.state, groups: list, pagination, initialValues, groupForm: form}
}

export default connect(mapStateToProps)(form);