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
        const { user } = this.props;

        const navigator = [
            {title: "Home", url: "/"},
            {title: "Perfil", url: "/profile"}
        ]

        return (
            <Main navigation={navigator} menu="profile" title="Perfil" icon="fa-user">
                <Information>
                    <UserImage src={user.photo} />
                    <UserPanel
                        name={user.short_name}
                        type={user.permission === TEACHER ? "Professor" : user.permission === ADMIN ? "Administrador" : "Aluno"}
                        updateAt={user.updated_at_formated}>
                        {user.identifier ?
                            <UserInfo icon="fa-key" label="Matrícula">{user.identifier}</UserInfo>
                        : null}
                        <UserInfo icon="fa-envelope" label="Email">{user.email}</UserInfo>
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

    return { user }
}

export default connect(mapStateToProps)(Profile);