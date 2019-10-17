import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeURL } from 'common/utils';
import { Main, StringToHtml, ActionsButton } from 'common';
import { TeacherPhoto } from '../styles/disciplineDetail';

class DisciplineDetail extends Component {

    __resetDiscipline() {
        console.log("Resetar");
    }

    __closeDiscipline() {
        console.log("Fechar");
    }

    render() {
        const { location } = this.props;
        const discipline = location.state;

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state: discipline}
        ]

        const actions = [
            {title: "Resetar Disciplina", icon: "fa-backward", run: () => this.__resetDiscipline()},
            {title: "Fechar Disciplina", icon: "fa-eye-slash", run: () => this.__closeDiscipline()},
        ]

        return (
            <Main
                navigation={navigator}
                menu="discipline"
                title="Detalhes da disciplina"
                rightComponent={<TeacherPhoto>Ricardo Ajax</TeacherPhoto>}>
                <ActionsButton actions={actions}>Ações</ActionsButton>
                <StringToHtml>{discipline.description}</StringToHtml>
            </Main>
        )
    }
}

const mapStateToProps = state => {
    const { user } = state.account;
    const { location } = state.router;

    return { user, location }
}

export default connect(mapStateToProps)(DisciplineDetail);