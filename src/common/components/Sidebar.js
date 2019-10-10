import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Container, SidebarLink } from '../styles/sidebar';
import { deleteUserSagas } from 'screens/Accounts/actions';
import { choiceAlert } from 'common/alerts';

class Sidebar extends Component {

    __redirectTo(url) {
        const { dispatch } = this.props;
        dispatch(push(url));
    }

    async __deleteAccount() {
        const { dispatch } = this.props;
        if (await choiceAlert(
            "Deletando conta",
            "Tem certeza que deseja deletar sua conta?",
            "Sim", "Não",
            "Conta deletada com sucesso!",
            "", "Operação Cancelada", ""
        )) {
            dispatch(deleteUserSagas());
        }
    }

    __profileMenu() {
        const { user } = this.props;
        return (
            <Container>
                <SidebarLink icon="fa-user" title="Perfil" onClick={() => this.__redirectTo("/profile")}>
                    Perfil do usuário com suas informações e disciplinas.
                </SidebarLink>
                <SidebarLink icon="fa-edit" title="Atualizar Perfil" onClick={() => this.__redirectTo("/profile/update")}>
                    Página para editar suas informações pessoais.
                </SidebarLink>
                <SidebarLink icon="fa-expeditedssl" title="Atualizar Senha" onClick={() => this.__redirectTo("/profile/update-password")}>
                    Página para editar sua senha.
                </SidebarLink>
                {!user.is_teacher ?
                    <SidebarLink icon="fa-search" title="Pesquisar Disciplinas" onClick={() => this.__redirectTo("/profile")}>
                        Página para pesquisar e entrar em uma disciplina específica.
                    </SidebarLink>
                :
                    <SidebarLink icon="fa-book" title="Criar Disciplinas" onClick={() => this.__redirectTo("/profile/discipline-form")}>
                        Página para criar uma nova disciplina.
                    </SidebarLink>
                }
                <SidebarLink icon="fa-envelope" title={"5 Notificações"} onClick={() => this.__redirectTo("/profile")}>
                    Página para ver notificações recebidas.
                </SidebarLink>
                <SidebarLink icon="fa-trash" title="Deletar Conta" onClick={() => this.__deleteAccount()}>
                    Deleta sua conta.
                </SidebarLink>
            </Container>
        )
    }

    __disciplineMenu() {
        return (
            <h1>Menu da disciplina</h1>
        )
    }

    __TBLMenu() {
        return (
            <h1>Menu TBL</h1>
        )
    }

    __runMenu() {
        const { menu } = this.props;

        switch (menu) {
            case "discipline":
                return this.__disciplineMenu();

            case "tbl":
                return this.__TBLMenu();
        
            default:
                return this.__profileMenu();
        }
    }

    render() { return this.__runMenu(); }
}

const mapStateToProps = state => {
    const { user } = state.account;
    return { user };
}

export default connect(mapStateToProps)(Sidebar);