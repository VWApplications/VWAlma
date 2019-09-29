import React, { Component } from 'react';
import { Main, PageHeader } from 'common';
import {
    Information, Status, LastLogin,
    UpdatedAt, UserImage, UserPanel, UserInfo
} from '../styles/profile';

class Profile extends Component {
    render() {
        const navigator = [
            {title: "Home", url: "/"},
            {title: "Perfil", url: "/profile"}
        ]

        return (
            <Main navigation={navigator} menu="profile">
                <PageHeader>Perfil</PageHeader>

                <Information>
                    <UserImage src="" />
                    <UserPanel name="Victor Deon" type="Professor">
                        <UserInfo icon="fa-key" label="Matrícula">13/0136484</UserInfo>
                        <UserInfo icon="fa-envelope" label="Email">victorhad@gmail.com</UserInfo>
                    </UserPanel>
                </Information>

                <Status>
                    <LastLogin>28 de Setembro de 2019 às 20:50</LastLogin>
                    <UpdatedAt>Atualizado há 2 semanas e 4 dias atrás</UpdatedAt>
                </Status>
                {/* Discipline Collapse */}
            </Main>
        )
    }
}

export default Profile;