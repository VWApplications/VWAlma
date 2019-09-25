import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { isAuthenticated } from 'common/utils';
import {
    NavbarBrand, CollapseButton, NavbarStyled, NavbarUL,
    NavbarLink, Space
} from '../styles/navbar';

class Navbar extends Component {

    __redirectToHomePage() {
        const { dispatch } = this.props;
        dispatch(push("/"));
    }

    __redirectToProfile() {
        console.log("Perfil");
    }

    __redirectToCreate() {
        console.log("Registro")
    }

    __redirectToLogin() {
        console.log("Login");
    }

    __logout() {
        console.log("Logout");
    }

    __help() {
        console.log("Ajuda");
    }

    render() {
        const { home } = this.props;

      	return (
              <div>
                <NavbarStyled className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <CollapseButton></CollapseButton>
                            <NavbarBrand functionRedirect={() => this.__redirectToHomePage()}>
                                ALMA Plataform
                            </NavbarBrand>
                        </div>

                        <div className="collapse navbar-collapse" id="collapse-navbar">
                            <NavbarUL className="nav navbar-nav navbar-right">
                                {home && !isAuthenticated() ?
                                    <NavbarLink icon="fa-puzzle-piece" link="#features" url={false}>Funcionalidades</NavbarLink>
                                : ""}
                                {home && !isAuthenticated() ?
                                    <NavbarLink icon="fa-newspaper-o" link="#news" url={false}>Novidades</NavbarLink>
                                : ""}
                                {home && !isAuthenticated() ?
                                    <NavbarLink icon="fa-envelope-o" link="#contact" url={false}>Contato</NavbarLink>
                                : ""}
                                {home && isAuthenticated() ?
                                    <NavbarLink icon="fa-user" link={() => this.__redirectToProfile()}>Perfil</NavbarLink>
                                : ""}
                                {!isAuthenticated() ?
                                    <NavbarLink icon="fa-user-plus" link={() => this.__redirectToCreate()}>Cadastrar</NavbarLink>
                                : ""}
                                {!isAuthenticated() ?
                                    <NavbarLink icon="fa-sign-in" link={() => this.__redirectToLogin()}>Entrar</NavbarLink>
                                : ""}
                                {!home && isAuthenticated() ?
                                    <NavbarLink icon="fa-question-circle-o" link={() => this.__help()}>Ajuda</NavbarLink>
                                : ""}
                                {!home && isAuthenticated() ?
                                    <NavbarLink icon="fa-sign-out" link={() => this.__logout()}>Sair</NavbarLink>
                                : ""}
                            </NavbarUL>
                        </div>
                    </div>
                </NavbarStyled>
                <Space />
            </div>
		)
  	}
}

export default connect()(Navbar);