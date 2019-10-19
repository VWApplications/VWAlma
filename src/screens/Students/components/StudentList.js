import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeURL } from 'common/utils';
import { Main } from 'common';

class StudentList extends Component {

    render() {
        const { discipline, state } = this.props;

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state }
        ]

        const filter = [
            {title: "Todos", value: "all"},
            {title: "0/60 Estudantes", value: "students"},
            {title: "0/10 Monitores", value: "monitors"}
        ]

        return (
            <Main navigation={navigator} menu="discipline" title="Lista de Estudantes">
            </Main>
        )
    }
}

const mapStateToProps = state => {
    const { location } = state.router;

    return { discipline: location.state.discipline, state: location.state };
}

export default connect(mapStateToProps)(StudentList);