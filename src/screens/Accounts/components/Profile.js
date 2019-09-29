import React, { Component } from 'react';
import { Main } from 'common';
import {
    PageHeader, Information, Status, LastLogin,
    UpdatedAt, UserImage, UserPanel, UserInfo
} from '../styles/profile';

class Profile extends Component {
    render() {
        return (
            <Main navigation={[]} menu={[]}>
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