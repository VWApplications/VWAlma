import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BreakLine } from 'common';
import {
    Main, TabList, Tab, Accordion, Panel, PanelHeader,
    PanelBody, CollapseBody, CollapseFooter, FooterInfo,
    FooterButtonGroup, FooterButton
} from '../styles/profileDisciplines';

class ProfileDisciplines extends Component {

    componentDidMount() {
        console.log("entrei");
    }

    __filterDisciplines(id) {
        console.log(id);
    }

    render() {
        return (
            <Main>
                <TabList>
                    <Tab link="#all" title="Todas as disciplinas" className={"active"} onClick={() => this.__filterDisciplines("all")}>
                        Mostra todas as disciplinas das quais você faz parte.
                    </Tab>

                    <Tab link="#student" title="Disciplinas como estudante" onClick={() => this.__filterDisciplines("student")}>
                        Mostra as disciplinas das quais você faz parte.
                    </Tab>

                    <Tab link="#monitor" title="Disciplinas como monitor" onClick={() => this.__filterDisciplines("monitor")}>
                        Mostra as disciplinas que você é monitor.
                    </Tab>

                    <Tab link="#teacher" title="Disciplinas criadas" onClick={() => this.__filterDisciplines("teacher")}>
                        Mostra as disciplinas que você criou.
                    </Tab>
                </TabList><BreakLine />

                <Accordion>
                    {/* Percorrer as disciplinas */}
                    <Panel>
                        <PanelHeader id="1" classroom="Turma A">
                            Teste de Software
                        </PanelHeader>

                        <PanelBody id="1">
                            <CollapseBody qtdStudents="30" totalStudents="60">
                                Descrição muito doida da disciplina.
                            </CollapseBody>

                            <CollapseFooter>
                                <FooterInfo teacher="Fulano de tal" course="Engenharia de Software" />

                                <FooterButtonGroup>
                                    <FooterButton icon="fa-eye" type="primary" title="Entrar" onClick={() => console.log("Entrar")} />
                                    <FooterButton icon="fa-trophy" type="primary" title="Hall da fama" onClick={() => console.log("Hall da fama")} />
                                    <FooterButton icon="fa-edit" type="primary" title="Editar" onClick={() => console.log("Editar")} />
                                    <FooterButton icon="fa-trash" type="danger" title="Deletar" onClick={() => console.log("Deletar")} />
                                </FooterButtonGroup>
                            </CollapseFooter>
                        </PanelBody>
                    </Panel>
                </Accordion>
            </Main>
        )
    }
}

export default connect()(ProfileDisciplines);