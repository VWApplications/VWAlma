import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { choiceAlert } from 'common/alerts';
import { makeURL } from 'common/utils';
import { InputField, EditorField } from 'common/fields';
import { Main, Info, Form, SubmitButton, Fieldset, Pagination, StringToHtml } from 'common';
import { validateCreateSection } from '../validate';
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

        const success = await choiceAlert(
            "Removendo seção",
            "Tem certeza que deseja remover a seção?",
            "Sim", "Não", "Seção removida com sucesso!",
            "", "Operação Cancelada!", ""
        )
        if (success)
            dispatch(deleteSectionsSagas(sectionID));
    }

    __submit(data) {
        const { dispatch, sectionForm } = this.props;

        if (sectionForm)
            dispatch(updateSectionsSagas(data, sectionForm.id));
        else
            dispatch(createSectionsSagas(data));

        dispatch(reset("SectionForm"));
        this.setState({opened: false, formTitle: "Criar nova seção"});
    }

    __toogleForm() {
        const { dispatch, sectionForm } = this.props;

        if (sectionForm) dispatch(updateFormAction(null));

        this.setState({opened: !this.state.opened, formTitle: "Criar nova seção"})
    }

    render() {
        const { state, handleSubmit, submitting, invalid, pagination, sections } = this.props;
        const discipline = state.discipline;

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state },
            {title: "Seções", url: `/profile/${makeURL(discipline.title)}/sections`, state }
        ]

        const AddButton = <AddSectionButton opened={this.state.opened} onClick={() => this.__toogleForm()} />

        return (
            <Main navigation={navigator} menu="discipline" title="Lista de Seções" rightComponent={AddButton}>
                {this.state.opened ? 
                    <Form onSubmit={handleSubmit((data) => this.__submit(data))}>
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
                                component={EditorField}
                                name="description"
                                placeholder="Insira a ementa da disciplina aqui!"
                            />

                            <SubmitButton disabled={submitting || invalid}>Enviar</SubmitButton>
                        </Fieldset>
                    </Form>
                : null}

                <SectionContainer>
                    {sections.length === 0 ? <Info>Não há seções nessa disciplina.</Info> : null}
                    {sections.map((section, index) => (
                        <SectionPanel key={index}>
                            <SectionPanelHeader
                                statusTitle={section.is_provided ? "Seção liberada" : "Seção não liberada"}
                                statusType={section.is_provided ? "success" : "danger"}
                                id={section.id}>
                                {section.title}
                            </SectionPanelHeader>

                            <SectionPanelBody id={section.id}>
                                <SectionPanelContent>
                                    <StringToHtml>{section.description}</StringToHtml>
                                </SectionPanelContent>

                                <SectionPanelFooter
                                    isProvided={section.is_provided}
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

const form = reduxForm({
    form: "SectionForm",
    validate: validateCreateSection,
    enableReinitialize: true
})(SectionList);

const mapStateToProps = state => {
    const { location } = state.router;
    const { list, pagination, form } = state.section;

    let initialValues = {};
    if (form) {
        initialValues = {
            title: form.title || "",
            description: form.description || ""
        }
    }

    return {state: location.state, sections: list, pagination, initialValues, sectionForm: form}
}

export default connect(mapStateToProps)(form);