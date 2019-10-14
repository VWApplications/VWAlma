import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Main, PageHeader } from 'common';

class DisciplineSearch extends Component {
    render() {
        const { user } = this.props;

        const navigator = [
            {title: "Home", url: "/"},
            {title: "Procurar Disciplinas", url: "/profile/discipline-search"}
        ]

        return (
            <Main navigation={navigator} menu="profile">
                <PageHeader>Procurar Disciplinas</PageHeader>
            </Main>
        )
    }
}

const mapStateToProps = state => {
    const { user } = state.account;

    return { user }
}

export default connect(mapStateToProps)(DisciplineSearch);