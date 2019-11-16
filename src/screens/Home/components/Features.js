import React, { Component } from 'react';
import { Timeline, TimelineItem, PageHeader, Container } from '../styles/features';

class Features extends Component {
    render() {
        return (
            <Container>
                <PageHeader>Funcionalidades</PageHeader>

                <Timeline>
                    <TimelineItem title="Gerenciar disciplinas e alunos" color="primary" icon="fa-graduation-cap">
                        O professor pode adicionar, remover, criar e editar disciplinas e fornecer a senha para eles entrarem.
                        Além de poder remover os alunos da disciplina, adicioná-los quando quiser e gerenciar
                        suas notas.
                    </TimelineItem>

                    <TimelineItem title="Funcionalidades de metodologias ativas" color="warning" icon="fa-users" inverted={true}>
                        Funções relacionadas as metodologias ativas de aprendizado, por exemplo, O TBL tem a fases de preparação,
                        garantia de preparação ou RAT, iRAT, gRAT e recursos, Aplicação de conceitos e avaliação em pares.
                    </TimelineItem>

                    <TimelineItem title="Relatórios" color="danger" icon="fa-bar-chart">
                        O professor terá um painel com relatórios de desempenho do aluno em cada pergunta da avaliação,
                        feedback de questões que mais gerou erros para o que o professor possa focar mais em sala de aula
                        e gerará um CSV das provas dos alunos com suas respectivas respostas.
                    </TimelineItem>

                    <TimelineItem title="Rank e Gamificação" color="success" icon="fa-gamepad" inverted={true}>
                        Também haverá um rank de grupo em que o 3 primeiros colocados ganharam bonificações definidas
                        pelo professor, não há classificação individual, pois o objetivo não é a competição, mas a colaboração.
                        Além de ter uma gameficação na lista de exercícios, entre outros locais do software.
                    </TimelineItem>
                </Timeline>
            </Container>
        )
    }
}

export default Features;