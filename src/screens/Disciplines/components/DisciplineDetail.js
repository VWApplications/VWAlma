import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeURL } from 'common/utils';
import { Main, StringToHtml, ActionsButton, Label } from 'common';
import { TEACHER } from 'common/constants';
import { TeacherPhoto } from '../styles/disciplineDetail';
import { fetchDisciplineSagas, resetDisciplineSagas, toogleDisciplineStatusSagas } from '../actions';

class DisciplineDetail extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchDisciplineSagas());
    }

    render() {
        const { user, state, dispatch } = this.props;
        const discipline = state.discipline;

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state: state }
        ]

        let actionTitle = "Fechar Disciplina";
        if (discipline.is_closed)
            actionTitle = "Abrir Disciplina";

        const actions = [
            {title: "Resetar Disciplina", icon: "fa-backward", run: () => dispatch(resetDisciplineSagas())},
            {title: actionTitle, icon: "fa-eye-slash", run: () => dispatch(toogleDisciplineStatusSagas())},
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

    return { user, state: location.state }
}

export default connect(mapStateToProps)(DisciplineDetail);