import React, { Component } from 'react';
import { Timeline, TimelineItem, PageHeader, Container } from '../styles/features';

class Features extends Component {
    render() {
        return (
            <Container>
                <PageHeader>Funcionalidades</PageHeader>

                <Timeline>
                    <TimelineItem title="Gerenciar disciplinas e alunos" color="primary" icon="fa-graduation-cap">
                        O professor pode adicionar, remover, criar e editar cursos e turmas e fornecer a senha para eles entrarem.
                        Além de poder remover os alunos da disciplina e adicioná-la a outras disciplinas próprias e gerenciar
                        suas notas.
                    </TimelineItem>

                    <TimelineItem title="Funcionalidades de metodologias ativas" color="warning" icon="fa-users" inverted={true}>
                        Funções relacionadas as metodologias ativas de aprendizado, por exemplo, O TBL tem a fases de preparação,
                        garantia de preparação ou RAT, iRAT, gRAT e recursos, Aplicação de conceitos e avaliação em pares.
                    </TimelineItem>

                    <TimelineItem title="Relatórios" color="danger" icon="fa-bar-chart">
                        O professor terá um painel com relatórios de desempenho do aluno em cada pergunta de avaliação,
                        feedback para o que ele ou ela deve focar mais na sala de aula e gerará um CSV de provas do
                        aluno com suas respostas.
                    </TimelineItem>

                    <TimelineItem title="Rank e Gamificação" color="success" icon="fa-gamepad" inverted={true}>
                        Também haverá uma classificação de grupo em que o primeiro lugar será exibido no Hall of Fame
                        que será visto pelos novos alunos dos próximos semestres, não há classificação individual, pois
                        o objetivo não é a competição, mas a colaboração. Além de ter uma gameficação na lista de exercícios,
                        entre outros locais do software.
                    </TimelineItem>
                </Timeline>
            </Container>
        )
    }
}

export default Features;