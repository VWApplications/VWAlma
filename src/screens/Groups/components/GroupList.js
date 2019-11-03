import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { choiceAlert } from 'common/alerts';
import { makeURL, rowMap } from 'common/utils';
import { InputField } from 'common/fields';
import { Main, Info, Search, FormStyled, SubmitButton, Fieldset, Pagination } from 'common';
import { validateCreateGroup } from '../validate';
import {
    listGroupsSagas, createGroupsSagas, updateFormAction,
    updateGroupsSagas, deleteGroupsSagas, provideGroupsSagas,
    addStudentGroupsSagas, removeStudentGroupsSagas
} from '../actions';
import {
    StudentContainer, StudentBox, StudentHeader, StudentBody,
    GroupContainer, GroupPanel, GroupPanelHeader, GroupPanelBody,
    GroupPanelContent, GroupPanelFooter, AddGroupButton
} from '../styles/groupList';
import { TEACHER, ADMIN } from 'common/constants';

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {opened: false, formTitle: "Criar novo grupo"};
    }

    componentDidMount() {
        const { dispatch, pagination } = this.props;
        dispatch(listGroupsSagas(pagination.activePage));
    }

    __addStudent(groupID, data, form) {
        const { dispatch } = this.props;
        dispatch(addStudentGroupsSagas(groupID, data));
        setTimeout(form.reset);
        
    }

    async __removeStudent(groupID, data) {
        const { dispatch } = this.props;

        const success = await choiceAlert(
            "Removendo estudante do grupo",
            "Tem certeza que deseja remover o estudante do grupo?",
            "Sim", "Não", "Estudante removido com sucesso!",
            "", "Operação Cancelada!", ""
        )
        if (success)
            dispatch(removeStudentGroupsSagas(groupID, data));
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

    __submit(data, form) {
        const { dispatch, groupForm } = this.props;

        if (groupForm)
            dispatch(updateGroupsSagas(data, groupForm.id));
        else
            dispatch(createGroupsSagas(data));

        setTimeout(form.reset);
        this.setState({opened: false, formTitle: "Criar novo grupo"});
    }

    __toogleForm() {
        const { dispatch, groupForm } = this.props;

        if (groupForm) dispatch(updateFormAction(null));

        this.setState({opened: !this.state.opened, formTitle: "Criar novo grupo"})
    }

    render() {
        const { state, initialValues, pagination, groups, account } = this.props;
        const discipline = state.discipline;

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state },
            {title: "Grupos", url: `/profile/${makeURL(discipline.title)}/groups`, state }
        ]

        let AddButton = null;
        if (account.permission === TEACHER || account.permission === ADMIN)
            AddButton = <AddGroupButton opened={this.state.opened} onClick={() => this.__toogleForm()} />

        return (
            <Main navigation={navigator} menu="discipline" title="Lista de Grupos" icon="fa-group" rightComponent={AddButton}>
                {this.state.opened ?
                    <Form
                        onSubmit={(data, form) => this.__submit(data, form)}
                        initialValues={initialValues}
                        validate={validateCreateGroup}
                        render={({handleSubmit, submitting, invalid}) => (
                            <FormStyled onSubmit={handleSubmit}>
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
                            </FormStyled>
                        )}
                    />
                : null}

                <GroupContainer>
                    {groups.length === 0 ? <Info>Não há grupos disponíveis nessa disciplina.</Info> : null}
                    {groups.map((group, index) => (
                        <GroupPanel key={index}>
                            <GroupPanelHeader
                                qtdStudent={group.students.length}
                                totalStudent={group.students_limit}
                                statusTitle={group.is_provided ? "Grupo liberado" : "Grupo não liberado"}
                                statusType={group.is_provided ? "success" : "danger"}
                                id={group.id}>
                                {group.title}
                            </GroupPanelHeader>

                            <GroupPanelBody id={group.id}>
                                <GroupPanelContent>
                                    {account.permission === TEACHER || account.permission === ADMIN ?
                                        <Search
                                            onSubmit={(data, form) => this.__addStudent(group.id, data, form)}
                                            name="email"
                                            placeholder="Insira o email do estudante para adicioná-lo ao grupo."
                                            icon="fa-plus"
                                        />
                                    : null}

                                    <StudentContainer>
                                        {group.students.length === 0 ? <Info>Não há estudantes nesse grupo.</Info> : null}
                                        {rowMap(group.students, 3, (student, index, col) => (
                                            <StudentBox key={index} col={col}>
                                                <StudentHeader src={student.photo} />

                                                <StudentBody
                                                    user={account}
                                                    email={student.email}
                                                    id={student.identifier}
                                                    onClose={() => this.__removeStudent(group.id, {"id": student.id})}>
                                                    {student.short_name}
                                                </StudentBody>
                                            </StudentBox>
                                        ))}
                                    </StudentContainer>
                                </GroupPanelContent>

                                {account.permission === TEACHER || account.permission === ADMIN ?
                                    <GroupPanelFooter
                                        isProvided={group.is_provided}
                                        sendClick={() => this.__provideGroup(group.id)}
                                        editClick={() => this.__editGroup(group)}
                                        deleteClick={() => this.__deleteGroup(group.id)}
                                    />
                                : null}
                            </GroupPanelBody>
                        </GroupPanel>
                    ))}
                </GroupContainer>
                <Pagination pagination={pagination} listObjectAction={listGroupsSagas} />
            </Main>
        )
    }
}

const mapStateToProps = state => {
    const { location } = state.router;
    const { list, pagination, form } = state.group;
    const { user } = state.account;

    let initialValues = {};
    if (form) {
        initialValues = {
            title: form.title || "",
            students_limit: form.students_limit || ""
        }
    }

    return {state: location.state, groups: list, pagination, initialValues, groupForm: form, account: user}
}

export default connect(mapStateToProps)(GroupList);