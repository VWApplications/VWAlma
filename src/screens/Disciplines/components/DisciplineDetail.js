import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeURL } from 'common/utils';
import { Main, StringToHtml, ActionsButton, Label } from 'common';
import { TEACHER } from 'common/constants';
import { TeacherPhoto } from '../styles/disciplineDetail';
import { fetchDisciplineSagas, resetDisciplineSagas, toogleDisciplineStatusSagas } from '../actions';

class DisciplineDetail extends Component {
    componentDidMount() {
        const { dispatch, discipline } = this.props;
        dispatch(fetchDisciplineSagas(discipline.id));
    }

    __resetDiscipline(id) {
        const { dispatch, discipline, state } = this.props;
        dispatch(resetDisciplineSagas(id, `/profile/${makeURL(discipline.title)}/detail`, state));
    }

    __closeDiscipline(id) {
        const { dispatch, discipline, state } = this.props;
        dispatch(toogleDisciplineStatusSagas(id, `/profile/${makeURL(discipline.title)}/detail`, state));
    }

    render() {
        const { user, discipline, state } = this.props;

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state: state }
        ]

        let actionTitle = "Fechar Disciplina";
        if (discipline.is_closed)
            actionTitle = "Abrir Disciplina";

        const actions = [
            {title: "Resetar Disciplina", icon: "fa-backward", run: () => this.__resetDiscipline(discipline.id)},
            {title: actionTitle, icon: "fa-eye-slash", run: () => this.__closeDiscipline(discipline.id)},
        ]

        return (
            <Main
                navigation={navigator}
                menu="discipline"
                title="Detalhes da disciplina"
                rightComponent={<TeacherPhoto src={discipline.teacher.photo}>{discipline.teacher.short_name}</TeacherPhoto>}>
                {discipline.is_closed ? <Label type="danger">Disciplina Fechada</Label> : <Label type="success">Disciplina Aberta</Label>}
                {user.permission === TEACHER ? <ActionsButton actions={actions}>Ações</ActionsButton> : null}
                <StringToHtml>{discipline.description}</StringToHtml>
            </Main>
        )
    }
}

const mapStateToProps = state => {
    const { user } = state.account;
    const { location } = state.router;

    return { user, discipline: location.state.discipline, state: location.state }
}

export default connect(mapStateToProps)(DisciplineDetail);