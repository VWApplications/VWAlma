import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeURL } from 'common/utils';
import { Main, StringToHtml, Label } from 'common';
import { FinishSectionButton } from '../styles/sectionDetail';
import { finishSectionSagas } from '../actions';
import { choiceAlert } from 'common/alerts';
import { TEACHER, ADMIN } from 'common/constants';

class SectionDetail extends Component {
    async __finishSection() {
        const { dispatch, state } = this.props;

        let text = "Tem certeza que deseja finalizar a seção?";
        if (state.section.is_finished)
            text = "Tem certeza que deseja iniciar a seção?";

        const success = await choiceAlert(
            "Modificando status da seção", text,
            "Sim", "Não", "Status modificado com sucesso!",
            "", "Operação Cancelada!", ""
        )
        if (success)
            dispatch(finishSectionSagas());
    }

    render() {
        const { state, user } = this.props;
        const discipline = state.discipline;
        const section = state.section;

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state: { discipline } },
            {title: "Seções", url: `/profile/${makeURL(discipline.title)}/sections`, state: { discipline } },
            {title: section.title, url: `/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/detail`, state }
        ]

        let finishButton = null;
        if (user.permission === TEACHER || user.permission === ADMIN)
            finishButton = (
                <FinishSectionButton
                    title={section.is_finished ? "Começar seção" : "Finalizar seção"}
                    type={section.is_finished ? "success" : "danger"}
                    onClick={() => this.__finishSection()}
                />
            )

        return (
            <Main icon="fa-puzzle-piece" navigation={navigator} menu="traditional" title="Detalhes da seção" rightComponent={finishButton}>
                {section.is_closed ? <Label type="danger">Seção Fechada</Label> : <Label type="success">Seção Aberta</Label>}
                <StringToHtml>{section.description}</StringToHtml>
            </Main>
        )
    }
}

const mapStateToProps = state => {
    const { location } = state.router;
    const { user } = state.account;

    return { state: location.state, user }
}

export default connect(mapStateToProps)(SectionDetail);