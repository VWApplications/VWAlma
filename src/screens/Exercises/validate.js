import { V_OR_F } from './constants';

export const validateQuestionForm = values => {
    const errors = {};

    if (!values.title)
        errors.title = "Título da questão é obrigatório.";

    if (!values.is_exercise)
        errors.is_exercise = "Selecione se essa questão é de exercício ou prova.";

    if (!values.question_type)
        errors.question_type = "Selecione o tipo de questão.";

    if (values.question_type === V_OR_F) {
        if (!values.alternatives || !values.alternatives.length) {
            errors.alternatives = {_error: 'Tem que ter pelo menos 1 alternativa.'}
        } else {
            const alternativeArrayErrors = [];
            values.alternatives.forEach((alternative, index) => {
                const alternativeErrors = {};
                if (!alternative || alternative.title === "" || !alternative.title) {
                    alternativeErrors.title = "O título da alternativa é obrigatório";
                    alternativeArrayErrors[index] = alternativeErrors;
                }
            });

            if(alternativeArrayErrors.length)
                errors.alternatives = alternativeArrayErrors;
        }
    } else {
        if (!values.alternatives || values.alternatives.length < 4) {
            errors.alternatives = {_error: 'Tem que ter pelo menos 4 alternativas.'}
        } else {
            const alternativeArrayErrors = [];
            values.alternatives.forEach((alternative, index) => {
                const alternativeErrors = {};
                if (!alternative || alternative.title === "" || !alternative.title) {
                    alternativeErrors.title = "O título da alternativa é obrigatório";
                    alternativeArrayErrors[index] = alternativeErrors;
                }
            });

            if(alternativeArrayErrors.length)
                errors.alternatives = alternativeArrayErrors;
        }
    }

    return errors;
}