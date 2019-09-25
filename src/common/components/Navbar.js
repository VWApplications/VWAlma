import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import {
    NavbarBrand, CollapseButton, NavbarStyled, NavbarUL,
    NavbarLink, Space
} from '../styles/navbar';

class Navbar extends Component {

    __redirectToHomePage() {
        const { dispatch } = this.props;
        dispatch(push("/"))
    }

    render() {
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
                                {/* Se o usuário tiver deslogado e na home */}
                                <NavbarLink icon="fa-puzzle-piece" link="#features">Funcionalidades</NavbarLink>
                                <NavbarLink icon="fa-newspaper-o" link="#news">Novidades</NavbarLink>
                                <NavbarLink icon="fa-envelope-o" link="#contact">Contato</NavbarLink>
                                <NavbarLink icon="fa-user-plus" link="#url">Cadastrar</NavbarLink>
                                <NavbarLink icon="fa-sign-in" link="#ulr">Entrar</NavbarLink>
                                {/* Se o usuário tiver logado e na home */}
                                {/* <NavbarLink icon="fa-user" link="#url">Perfil</NavbarLink> */}
                                {/* Se o usuário tiver logado e não tiver na home */}
                                {/* <NavbarLink icon="fa-question-circle-o" link="#url">Ajuda</NavbarLink> */}
                                {/* <NavbarLink icon="fa-sign-out" link="#ulr">Sair</NavbarLink> */}
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