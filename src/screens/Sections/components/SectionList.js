import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Form, Field } from 'react-final-form';
import { requestChoiceAlert } from 'common/alerts';
import { makeURL } from 'common/utils';
import { InputField, EditorField, SelectField, Condition, DateTimeField } from 'common/fields';
import { Main, Info, FormStyled, SubmitButton, Fieldset, Pagination, StringToHtml } from 'common';
import { TEACHER, ADMIN } from 'common/constants';
import { validateCreateSection } from '../validate';
import { TRADITIONAL } from '../constants';
import {
    listSectionsSagas, createSectionsSagas, updateFormAction,
    updateSectionsSagas, deleteSectionsSagas, provideSectionsSagas
} from '../actions';
import {
    SectionContainer, SectionPanel, SectionPanelHeader, SectionPanelBody,
    SectionPanelContent, SectionPanelFooter, AddSectionButton
} from '../styles/sectionList';

class SectionList extends Component {
    constructor(props) {
        super(props);
        this.state = {opened: false, formTitle: "Criar nova seção"};
    }

    componentDidMount() {
        const { dispatch, pagination } = this.props;
        dispatch(listSectionsSagas(pagination.activePage));
    }

    __redirectToSectionDetail(section) {
        const { dispatch, state } = this.props;
        const discipline = state.discipline;
        const newState = { discipline, section };
        dispatch(push(`/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/detail`, newState));
    }

    __provideSection(sectionID) {
        const { dispatch } = this.props;
        dispatch(provideSectionsSagas(sectionID));
    }

    __editSection(section) {
        const { dispatch } = this.props;
        this.setState({opened: true, formTitle: "Editar seção"});
        dispatch(updateFormAction(section));
    }

    async __deleteSection(sectionID) {
        const { dispatch } = this.props;

        const success = await requestChoiceAlert(
            "Removendo seção",
            "Tem certeza que deseja remover a seção?",
            "Sim", "Não", "Operação Cancelada!", ""
        )
        if (success)
            dispatch(deleteSectionsSagas(sectionID));
    }

    __submit(data, form) {
        const { dispatch, sectionForm } = this.props;

        if (sectionForm)
            dispatch(updateSectionsSagas(data, sectionForm.id));
        else
            dispatch(createSectionsSagas(data));

        setTimeout(form.reset);
        this.setState({opened: false, formTitle: "Criar nova seção"});
    }

    __toogleForm() {
        const { dispatch, sectionForm } = this.props;

        if (sectionForm) dispatch(updateFormAction(null));

        this.setState({opened: !this.state.opened, formTitle: "Criar nova seção"})
    }

    render() {
        const { state, initialValues, pagination, sections, account } = this.props;
        const discipline = state.discipline;

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state },
            {title: "Seções", url: `/profile/${makeURL(discipline.title)}/sections`, state }
        ]

        let AddButton = null;
        if (account.permission === TEACHER || account.permission === ADMIN)
            AddButton = <AddSectionButton opened={this.state.opened} onClick={() => this.__toogleForm()} />

        return (
            <Main navigation={navigator} menu="discipline" title="Lista de Seções" icon="fa-puzzle-piece" rightComponent={AddButton}>
                {this.state.opened ?
                    <Form
                        onSubmit={(data, form) => this.__submit(data, form)}
                        initialValues={initialValues}
                        validate={validateCreateSection}
                        render={({handleSubmit, submitting, invalid}) => (
                            <FormStyled onSubmit={handleSubmit}>
                                <Fieldset title={this.state.formTitle}>
                                    <Field
                                        component={InputField}
                                        type="text"
                                        label="Título"
                                        className="form-control"
                                        name="title"
                                        placeholder="Título da seção."
                                    />

                                    <Field
                                        label="Tipo de metodologia"
                                        name="methodology"
                                        component={SelectField}
                                        options={[
                                            {title: "Tradicional", value: TRADITIONAL}
                                        ]}
                                    />

                                    <Condition when="methodology" is={TRADITIONAL}>
                                        <Fieldset title="Configurações das provas">
                                            <Field
                                                component={InputField}
                                                type="number"
                                                label="Duração em minutos"
                                                className="form-control"
                                                name="duration"
                                                placeholder="Duração da avaliação em minutos."
                                            />

                                            <Field
                                                component={DateTimeField}
                                                name="datetime"
                                                className="form-control"
                                                label="Data da prova"
                                                locale="pt"
                                            />
                                        </Fieldset>
                                    </Condition>

                                    <Field
                                        component={EditorField}
                                        name="description"
                                        placeholder="Insira a ementa da disciplina aqui!"
                                    />

                                    <SubmitButton disabled={submitting || invalid}>Enviar</SubmitButton>
                                </Fieldset>
                            </FormStyled>
                        )}
                    />
                : null}

                <SectionContainer>
                    {sections.length === 0 ? <Info>Não há seções disponíveis nessa disciplina.</Info> : null}
                    {sections.map((section, index) => (
                        <SectionPanel key={index}>
                            <SectionPanelHeader
                                statusTitle={section.is_closed ? "Seção não liberada" : "Seção liberada"}
                                statusType={section.is_closed ? "danger" : "success"}
                                sectionType={section.methodology}
                                id={section.id}>
                                {section.title}
                            </SectionPanelHeader>

                            <SectionPanelBody id={section.id}>
                                <SectionPanelContent>
                                    <StringToHtml resume={true}>{section.description}</StringToHtml>
                                </SectionPanelContent>

                                <SectionPanelFooter
                                    user={account}
                                    isClosed={section.is_closed}
                                    enterClick={() => this.__redirectToSectionDetail(section)}
                                    sendClick={() => this.__provideSection(section.id)}
                                    editClick={() => this.__editSection(section)}
                                    deleteClick={() => this.__deleteSection(section.id)}
                                />
                            </SectionPanelBody>
                        </SectionPanel>
                    ))}
                </SectionContainer>
                <Pagination pagination={pagination} listObjectAction={listSectionsSagas} />
            </Main>
        )
    }
}

const mapStateToProps = state => {
    const { location } = state.router;
    const { list, pagination, form } = state.section;
    const { user } = state.account;

    let initialValues = {methodology: TRADITIONAL, duration: 30, datetime: new Date()};
    if (form) {
        initialValues = {
            title: form.title || "",
            methodology: form.methodology || TRADITIONAL,
            description: form.description || "",
            duration: form.duration || 30,
            datetime: form.datetime || new Date()
        }
    }

    return {state: location.state, sections: list, pagination, initialValues, sectionForm: form, account: user}
}

export default connect(mapStateToProps)(SectionList);