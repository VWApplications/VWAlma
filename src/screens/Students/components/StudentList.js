import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'query-string';
import { makeURL, formatWithLeftZero } from 'common/utils';
import { Main, Info, ActionsButton, Search, Pagination } from 'common';
import { listStudentsSagas, removeStudentSagas } from '../actions';
import { StudentContainer, StudentBox, StudentHeader, StudentBody } from '../styles/studentList';

class StudentList extends Component {

    constructor(props) {
        super(props);
        this.state = {"filter": undefined}
    }

    componentDidMount() {
        const { dispatch, state, pagination } = this.props;
        dispatch(listStudentsSagas(state.discipline, pagination.activePage));
    }

    __changeStudentStatus(studentID) {
        console.log(studentID);
    }

    __removeStudentFromClass(studentID) {
        const { dispatch, state, pagination } = this.props;
        const queryString = stringify({page: pagination.activePage, filter: this.state.filter});
        dispatch(removeStudentSagas(state.discipline, studentID, queryString));
    }

    __addStudent(data) {
        console.log(data);
    }

    __formatFilter(discipline, type) {
        if (type === "students") {
            return `${formatWithLeftZero(discipline.students.length)}/${formatWithLeftZero(discipline.students_limit)}`;
        } else {
            return `${formatWithLeftZero(discipline.monitors.length)}/${formatWithLeftZero(discipline.monitors_limit)}`;
        }
    }

    __filterStudents(filter) {
        const { dispatch, state, pagination } = this.props;

        if (filter)
            this.setState({ filter });
        else
            this.setState({ filter: undefined });

        const queryString = stringify({page: pagination.activePage, filter});

        dispatch(listStudentsSagas(state.discipline, pagination.activePage, queryString));
    }

    render() {
        const { state, students, pagination } = this.props;
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
            <Main navigation={navigator} menu="discipline" title="Lista de Estudantes" rightComponent={FilterComponent}>
                <Search
                    onSubmit={data => this.__addStudent(data)}
                    name="email"
                    placeholder="Insira o email do estudante."
                    icon="fa-plus"
                />

                <StudentContainer>
                    {students.length === 0 ? <Info>Não há estudantes nessa disciplina.</Info> : null}
                    {students.map((student, index) => (
                        <StudentBox key={index}>
                            <StudentHeader src={student.photo} onClick={() => this.__changeStudentStatus(student)}>
                                Estudante
                            </StudentHeader>

                            <StudentBody email={student.email} id={student.identifier} onClose={() => this.__removeStudentFromClass(student)}>
                                {student.short_name}
                            </StudentBody>
                        </StudentBox>
                    ))}
                </StudentContainer>
                <Pagination
                    pagination={pagination}
                    listObjectAction={listStudentsSagas}
                    object={discipline}
                    filters={{filter: this.state.filter}}
                />
            </Main>
        )
    }
}

const mapStateToProps = state => {
    const { location } = state.router;
    const { list, pagination } = state.student;

    return { state: location.state, students: list, pagination };
}

export default connect(mapStateToProps)(StudentList);