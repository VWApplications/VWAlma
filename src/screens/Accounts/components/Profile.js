import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Main, PageHeader, BreakLine } from 'common';
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
            <Main navigation={navigator} menu="profile">
                <PageHeader>Perfil</PageHeader>

                <Information>
                    <UserImage src={user.photo} />
                    <UserPanel
                        name={user.short_name}
                        type={user.is_teacher ? "Professor" : "Aluno"}
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