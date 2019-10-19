import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeURL, formatWithLeftZero } from 'common/utils';
import { Main, Info, ActionsButton, Search } from 'common';
import { StudentContainer, StudentBox, StudentHeader, StudentBody } from '../styles/studentList';

class StudentList extends Component {

    componentDidMount() {
        console.log("Pegar a lista de estudates/monitores da disciplina")
    }

    __changeStudentStatus(studentID) {
        console.log(studentID);
    }

    __removeStudentFromClass(studentID) {
        console.log(studentID);
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

    __filterStudents(type, discipline) {
        console.log(type, discipline);
    }

    render() {
        const { state } = this.props;
        const discipline = state.discipline;
        const students = discipline.students;

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state },
            {title: "Estudantes", url: `/profile/${makeURL(discipline.title)}/students`, state }
        ]

        const filters = [
            {title: "Todos", run: () => this.__filterStudents("all", discipline)},
            {title: `${this.__formatFilter(discipline, "students")} Estudantes`, run: () => this.__filterStudents("students", discipline)},
            {title: `${this.__formatFilter(discipline, "monitors")} Monitores`, run: () => this.__filterStudents("monitors", discipline)}
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
            </Main>
        )
    }
}

const mapStateToProps = state => {
    const { location } = state.router;

    return { state: location.state };
}

export default connect(mapStateToProps)(StudentList);