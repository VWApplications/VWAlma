import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import { Container, SidebarLink } from '../styles/sidebar';
import { TEACHER, ADMIN } from 'common/constants';
import { deleteUserSagas } from 'screens/Accounts/actions';
import { choiceAlert, infoAlert } from 'common/alerts';

class Sidebar extends Component {

    __redirectTo(url, state=null) {
        const { dispatch } = this.props;
        if (state.hasOwnProperty('form'))
            delete state['form']

        dispatch(push(url, state));
        window.scrollTo(0, 0);
        window.location.reload();
    }

    async __deleteAccount() {
        const { dispatch } = this.props;
        if (await choiceAlert(
            "Deletando conta",
            "Tem certeza que deseja deletar sua conta?",
            "Sim", "Não",
            "Conta deletada com sucesso!",
            "", "Operação Cancelada", ""
        )) { dispatch(deleteUserSagas()); }
    }

    __developing() {
        infoAlert("Em desenvolvimento", "Funcionalidade ainda está em desenvolvimento.");
    }

    __profileMenu() {
        const { account } = this.props;
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
                {account.permission === ADMIN ?
                    <SidebarLink icon="fa-search" title="Pesquisar Disciplinas" onClick={() => this.__redirectTo("/profile/discipline-search")}>
                        Página para pesquisar e entrar em uma disciplina específica.
                    </SidebarLink>
                : null}
                {account.permission !== TEACHER && account.permission !== ADMIN ?
                    <SidebarLink icon="fa-search" title="Pesquisar Disciplinas" onClick={() => this.__redirectTo("/profile/discipline-search")}>
                        Página para pesquisar e entrar em uma disciplina específica.
                    </SidebarLink>
                :
                    <SidebarLink icon="fa-book" title="Criar Disciplinas" onClick={() => this.__redirectTo("/profile/discipline-form")}>
                        Página para criar uma nova disciplina.
                    </SidebarLink>
                }
                <SidebarLink icon="fa-envelope" title={"5 Notificações"} onClick={() => this.__developing()}>
                    Página para ver notificações recebidas.
                </SidebarLink>
                <SidebarLink icon="fa-trash" title="Deletar Conta" onClick={() => this.__deleteAccount()}>
                    Deleta sua conta.
                </SidebarLink>
            </Container>
        )
    }

    __disciplineMenu() {
        const { location } = this.props;
        const discipline = location.state.discipline

        return (
            <Container>
                <SidebarLink
                    icon="fa-book"
                    title="Ementa"
                    onClick={() => this.__redirectTo(`/profile/${makeURL(discipline.title)}/detail`, location.state)}>
                    Ementa da disciplina.
                </SidebarLink>
                <SidebarLink
                    icon="fa-slideshare"
                    title="Lista de Estudantes"
                    onClick={() => this.__redirectTo(`/profile/${makeURL(discipline.title)}/students`, location.state)}>
                    Lista de estudantes e monitores da disciplina.
                </SidebarLink>
                <SidebarLink
                    icon="fa-graduation-cap"
                    title="Notas Finais"
                    onClick={() => this.__developing()}>
                    Notas finais da disciplina.
                </SidebarLink>
                <SidebarLink
                    icon="fa-group"
                    title="Grupos"
                    onClick={() => this.__redirectTo(`/profile/${makeURL(discipline.title)}/groups`, location.state)}>
                    Formação de grupos para respectivas atividades.
                </SidebarLink>
                <SidebarLink
                    icon="fa-trophy"
                    title="Rank de grupos"
                    onClick={() => this.__developing()}>
                    Rank de grupos da disciplina.
                </SidebarLink>
                <SidebarLink
                    icon="fa-puzzle-piece"
                    title="Seções"
                    onClick={() => this.__redirectTo(`/profile/${makeURL(discipline.title)}/sections`, location.state)}>
                    Seções da disciplina.
                </SidebarLink>
                <SidebarLink
                    icon="fa-folder-open-o"
                    title="Arquivos"
                    onClick={() => this.__developing()}>
                    Arquivos da disciplina.
                </SidebarLink>
                <SidebarLink
                    icon="fa-comments-o"
                    title="Forum"
                    onClick={() => this.__developing()}>
                    Fórum de dúvidas da disciplina.
                </SidebarLink>
            </Container>
        )
    }

    __TraditionalMenu() {
        const { location, account } = this.props;
        const discipline = location.state.discipline;
        const section = location.state.section;

        return (
            <Container>
                <SidebarLink
                    icon="fa-puzzle-piece"
                    title="Seção"
                    onClick={() => this.__redirectTo(`/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/detail`, location.state)}>
                    Descrição da seção.
                </SidebarLink>
                <SidebarLink
                    icon="fa-leanpub"
                    title="Conteúdo"
                    onClick={() => this.__developing()}>
                    Conteúdo em formato de livro.
                </SidebarLink>
                {account.permission === TEACHER || account.permission === ADMIN ?
                    <SidebarLink
                        icon="fa-clipboard"
                        title="Questões"
                        onClick={() => this.__redirectTo(`/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/questions`, location.state)}>
                        Formulário de Questões.
                    </SidebarLink>
                : null}
                <SidebarLink
                    icon="fa-gamepad"
                    title="Exercícios"
                    onClick={() => this.__redirectTo(`/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/exercises`, location.state)}>
                    Exercícios.
                </SidebarLink>
                <SidebarLink
                    icon="fa-graduation-cap"
                    title="Notas da seção"
                    onClick={() => this.__developing()}>
                    Notas da seção.
                </SidebarLink>
                {account.permission === TEACHER || account.permission === ADMIN ?
                    <SidebarLink
                        icon="fa-bar-chart"
                        title="Relatório"
                        onClick={() => this.__developing()}>
                        Relatório das avaliações.
                    </SidebarLink>
                :
                    <SidebarLink
                        icon="fa-bar-chart"
                        title="Dashboard"
                        onClick={() => this.__developing()}>
                        Dashboard do aluno para gamificação.
                    </SidebarLink>
                }
                <SidebarLink
                    icon="fa-street-view"
                    title="Avaliação"
                    onClick={() => this.__developing()}>
                    Avaliação.
                </SidebarLink>
            </Container>
        )
    }

    __TBLMenu() {
        const { location } = this.props;
        const discipline = location.state.discipline;
        const section = location.state.section;

        return (
            <Container>
                <SidebarLink
                    icon="fa-puzzle-piece"
                    title="Seção"
                    onClick={() => this.__redirectTo(`/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/detail`, location.state)}>
                    Descrição da seção.
                </SidebarLink>
                <SidebarLink
                    icon="fa-leanpub"
                    title="Conteúdo"
                    onClick={() => this.__developing()}>
                    Conteúdo em formato de livro.
                </SidebarLink>
                <SidebarLink
                    icon="fa-gamepad"
                    title="Exercícios"
                    onClick={() => this.__developing()}>
                    Exercícios.
                </SidebarLink>
                <SidebarLink
                    icon="fa-graduation-cap"
                    title="Notas da seção"
                    onClick={() => this.__developing()}>
                    Notas da seção.
                </SidebarLink>
                <SidebarLink
                    icon="fa-bar-chart"
                    title="Relatório"
                    onClick={() => this.__developing()}>
                    Relatório das avaliações.
                </SidebarLink>
                <SidebarLink
                    icon="fa-bar-chart"
                    title="Dashboard"
                    onClick={() => this.__developing()}>
                    Dashboard do aluno para gamificação.
                </SidebarLink>
                <SidebarLink
                    icon="fa-street-view"
                    title="Avaliação iRAT"
                    onClick={() => this.__developing()}>
                    Avaliação iRAT.
                </SidebarLink>
                <SidebarLink
                    icon="fa-group"
                    title="Avaliação gRAT"
                    onClick={() => this.__developing()}>
                    Avaliação gRAT.
                </SidebarLink>
                <SidebarLink
                    icon="fa-crosshairs"
                    title="Avaliação Prática"
                    onClick={() => this.__developing()}>
                    Avaliação prática.
                </SidebarLink>
                <SidebarLink
                    icon="fa-vcard-o"
                    title="Avaliação em Pares"
                    onClick={() => this.__developing()}>
                    Avaliação em pares.
                </SidebarLink>
                <SidebarLink
                    icon="fa-gavel"
                    title="Apelação"
                    onClick={() => this.__developing()}>
                    Apelação.
                </SidebarLink>
            </Container>
        )
    }

    __runMenu() {
        const { menu } = this.props;

        switch (menu) {
            case "discipline":
                return this.__disciplineMenu();

            case "tbl":
                return this.__TBLMenu();

            case "traditional":
                return this.__TraditionalMenu();
        
            default:
                return this.__profileMenu();
        }
    }

    render() { return this.__runMenu(); }
}

const mapStateToProps = state => {
    const { user } = state.account;
    const { location } = state.router;

    return { account: user, location };
}

export default connect(mapStateToProps)(Sidebar);