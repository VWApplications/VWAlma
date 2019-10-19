import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeURL } from 'common/utils';
import { Main, StringToHtml, ActionsButton, Label } from 'common';
import { TeacherPhoto } from '../styles/disciplineDetail';
import { fetchDisciplineSagas, resetDisciplineSagas, toogleDisciplineStatusSagas } from '../actions';

class DisciplineDetail extends Component {
    componentDidMount() {
        const { dispatch, location } = this.props;
        dispatch(fetchDisciplineSagas(location.state.id));
    }

    __resetDiscipline(id) {
        const { dispatch, location } = this.props;
        dispatch(resetDisciplineSagas(id, `/profile/${makeURL(location.state.title)}/detail`, location.state));
    }

    __closeDiscipline(id) {
        const { dispatch, location } = this.props;
        dispatch(toogleDisciplineStatusSagas(id, `/profile/${makeURL(location.state.title)}/detail`, location.state));
    }

    render() {
        const { location } = this.props;
        const discipline = this.props.discipline ? this.props.discipline : location.state;

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state: discipline}
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
                <ActionsButton actions={actions}>Ações</ActionsButton>
                <StringToHtml>{discipline.description}</StringToHtml>
            </Main>
        )
    }
}

const mapStateToProps = state => {
    const { user } = state.account;
    const { location } = state.router;
    const { obj } = state.discipline;

    return { user, location, discipline: obj }
}

export default connect(mapStateToProps)(DisciplineDetail);