import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'query-string';
import { makeURL, formatWithLeftZero, rowMap } from 'common/utils';
import { Main, Info, ActionsButton, Search, Pagination } from 'common';
import { listStudentsSagas, removeStudentSagas, addStudentSagas, changeStudentStatusSagas } from '../actions';
import { StudentContainer, StudentBox, StudentHeader, StudentBody } from '../styles/studentList';
import { requestChoiceAlert } from 'common/alerts';
import { TEACHER, ADMIN } from 'common/constants';

class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {"filter": undefined}
    }

    componentDidMount() {
        const { dispatch, pagination } = this.props;
        dispatch(listStudentsSagas(pagination.activePage));
    }

    __isMonitor(studentID) {
        const { state } = this.props;
        if (state.discipline.monitors.indexOf(studentID) >= 0)
            return true

        return false
    }

    async __changeStudentStatus(data) {
        const { dispatch, pagination } = this.props;
        const queryString = stringify({page: pagination.activePage, filter: this.state.filter});

        let text = "Tem certeza que deseja modificar o status do estudante para monitor?";
        if (this.__isMonitor(data['id']))
            text = "Tem certeza que deseja modificar o status do monitor para estudante?";

        const success = await requestChoiceAlert(
            "Modificando status",
            text, "Sim", "Não",
            "Operação Cancelada!", ""
        )
        if (success)
            dispatch(changeStudentStatusSagas(data, queryString));
    }

    async __removeStudentFromClass(data) {
        const { dispatch, pagination } = this.props;
        const queryString = stringify({page: pagination.activePage, filter: this.state.filter});

        const success = await requestChoiceAlert(
            "Removendo studante",
            "Tem certeza que deseja remover o estudante?",
            "Sim", "Não", "Operação Cancelada!", ""
        )
        if (success)
            dispatch(removeStudentSagas(data, queryString));
    }

    __addStudent(data, form) {
        const { dispatch, pagination } = this.props;
        const queryString = stringify({page: pagination.activePage, filter: this.state.filter});
        dispatch(addStudentSagas(data, queryString));
        setTimeout(form.reset);
    }

    __formatFilter(discipline, type) {
        if (type === "students") {
            return `${formatWithLeftZero(discipline.students.length)}/${formatWithLeftZero(discipline.students_limit)}`;
        } else {
            return `${formatWithLeftZero(discipline.monitors.length)}/${formatWithLeftZero(discipline.monitors_limit)}`;
        }
    }

    __filterStudents(filter) {
        const { dispatch, pagination } = this.props;

        if (filter)
            this.setState({ filter });
        else
            this.setState({ filter: undefined });

        const queryString = stringify({page: pagination.activePage, filter});

        dispatch(listStudentsSagas(pagination.activePage, queryString));
    }

    render() {
        const { state, students, pagination, account } = this.props;
        const discipline = state.discipline;

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state },
            {title: "Estudantes", url: `/profile/${makeURL(discipline.title)}/students`, state }
        ]

        const filters = [
            {title: "Todos", run: () => this.__filterStudents("all", discipline)},
            {title: `${this.__formatFilter(discipline, "students")} Estudantes`, run: () => this.__filterStudents("students")},
            {title: `${this.__formatFilter(discipline, "monitors")} Monitores`, run: () => this.__filterStudents("monitors")}
        ]

        const FilterComponent = <ActionsButton actions={filters}>Filtros</ActionsButton>

        return (
            <Main navigation={navigator} menu="discipline" title="Lista de Estudantes" icon="fa-slideshare" rightComponent={FilterComponent}>
                {account.permission === TEACHER || account.permission === ADMIN ?
                    <Search
                        onSubmit={(data, form) => this.__addStudent(data, form)}
                        name="email"
                        placeholder="Insira o email do estudante para adicioná-lo a turma."
                        icon="fa-plus"
                    />
                : null}

                <StudentContainer>
                    {students.length === 0 ? <Info>Não há estudantes nessa disciplina.</Info> : null}
                    {rowMap(students, 3, (student, index, col) => (
                        <StudentBox key={index} col={col}>
                            <StudentHeader
                                src={student.photo}
                                onClick={() => this.__changeStudentStatus({"id": student.id})}>
                                {this.__isMonitor(student.id) ? "Monitor" : "Estudante"}
                            </StudentHeader>

                            <StudentBody
                                user={account}
                                email={student.user.email}
                                id={student.identifier}
                                onClose={() => this.__removeStudentFromClass({"id": student.id})}>
                                {student.user.short_name}
                            </StudentBody>
                        </StudentBox>
                    ))}
                </StudentContainer>
                <Pagination
                    pagination={pagination}
                    listObjectAction={listStudentsSagas}
                    filters={{filter: this.state.filter}}
                />
            </Main>
        )
    }
}

const mapStateToProps = state => {
    const { location } = state.router;
    const { list, pagination } = state.student;
    const { user } = state.account;

    return { state: location.state, students: list, pagination, account: user };
}

export default connect(mapStateToProps)(StudentList);