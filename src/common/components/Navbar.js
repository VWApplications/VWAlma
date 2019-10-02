import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { isAuthenticated } from 'common/utils';
import { logoutAction } from 'screens/Accounts/actions';
import { successAlert } from 'common/alerts';
import { startHelp } from '../utils';
import {
    NavbarBrand, CollapseButton, NavbarStyled, NavbarLinkList,
    NavbarLink, Space, Container, NavbarHeader
} from '../styles/navbar';

class Navbar extends Component {

    __redirectTo(url) {
        const { dispatch } = this.props;
        dispatch(push(url));
    }

    __logout() {
        const { dispatch } = this.props;
        dispatch(logoutAction())
        successAlert("Usuário desconectado", "Usuário foi desconectado com sucesso!");
        this.__redirectTo("/login")
    }

    render() {
        const { home } = this.props;

      	return (
              <Container>
                <NavbarStyled>
                    <NavbarHeader>
                        <CollapseButton />
                        <NavbarBrand functionRedirect={() => this.__redirectTo("/")}>
                            ALMA Plataform
                        </NavbarBrand>
                    </NavbarHeader>

                    <NavbarLinkList>
                        {home ?
                            <NavbarLink icon="fa-puzzle-piece" link="#features" url={false}>Funcionalidades</NavbarLink>
                        : ""}
                        {home ?
                            <NavbarLink icon="fa-newspaper-o" link="#news" url={false}>Notícias</NavbarLink>
                        : ""}
                        {home ?
                            <NavbarLink icon="fa-envelope-o" link="#contact" url={false}>Contato</NavbarLink>
                        : ""}
                        {home && isAuthenticated() ?
                            <NavbarLink icon="fa-user" link={() => this.__redirectTo("/profile")}>Perfil</NavbarLink>
                        : ""}
                        {!isAuthenticated() ?
                            <NavbarLink icon="fa-user-plus" link={() => this.__redirectTo("register")}>Cadastrar</NavbarLink>
                        : ""}
                        {!isAuthenticated() ?
                            <NavbarLink icon="fa-sign-in" link={() => this.__redirectTo("/login")}>Entrar</NavbarLink>
                        : ""}
                        {!home && isAuthenticated() ?
                            <NavbarLink icon="fa-question-circle-o" link={() => startHelp()}>Ajuda</NavbarLink>
                        : ""}
                        {isAuthenticated() ?
                            <NavbarLink icon="fa-sign-out" link={() => this.__logout()}>Sair</NavbarLink>
                        : ""}
                    </NavbarLinkList>
                </NavbarStyled>
                <Space />
            </Container>
		)
  	}
}

export default connect()(Navbar);