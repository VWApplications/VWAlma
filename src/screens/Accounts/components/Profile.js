import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Main, BreakLine } from 'common';
import { TEACHER, ADMIN } from 'common/constants';
import ProfileDisciplines from 'screens/Disciplines/components/ProfileDisciplines';
import {
    Information, UserImage, UserPanel, UserInfo
} from '../styles/profile';

class Profile extends Component {
    render() {
        const { account } = this.props;

        const navigator = [
            {title: "Home", url: "/"},
            {title: "Perfil", url: "/profile"}
        ]

        return (
            <Main navigation={navigator} menu="profile" title="Perfil" icon="fa-user">
                <Information>
                    <UserImage src={account.photo} />
                    <UserPanel
                        name={account.user.short_name}
                        type={account.permission === TEACHER ? "Professor" : account.permission === ADMIN ? "Administrador" : "Aluno"}
                        updateAt={account.user.updated_at_formated}>
                        {account.identifier ?
                            <UserInfo icon="fa-key" label="Matrícula">{account.identifier}</UserInfo>
                        : null}
                        <UserInfo icon="fa-envelope" label="Email">{account.user.email}</UserInfo>
                    </UserPanel>
                </Information>
                <BreakLine />
                <ProfileDisciplines />
            </Main>
        )
    }
}

const mapStateToProps = state => {
    const { user } = state.account;

    return { account: user }
}

export default connect(mapStateToProps)(Profile);