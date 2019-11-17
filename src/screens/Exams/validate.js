import { QUESTION_TYPE } from './constants';
import { isEmpty } from 'common/utils';

const alternativesValidation = (values, errors) => {
    let counter = 0;
    const alternativeArrayErrors = [];
    values.alternatives.forEach((alternative, index) => {
        const alternativeErrors = {};
        if (!alternative || alternative.title === "" || !alternative.title) {
            alternativeErrors.title = "O título da alternativa é obrigatório";
            alternativeArrayErrors[index] = alternativeErrors;
        }
        if (alternative && alternative.is_correct === true)
            counter += 1;
    });

    if (values.question !== QUESTION_TYPE.V_OR_F) {
        if (counter > 1)
            errors.question = "Só pode haver uma única alternativa correta.";
        else if (counter === 0)
            errors.question = "Deve ter pelo menos uma alternativa correta.";
    }

    if(alternativeArrayErrors.length > 0)
        errors.alternatives = alternativeArrayErrors;
}

export const validateQuestionForm = values => {
    const errors = {};

    if (!values.title)
        errors.title = "Título da questão é obrigatório.";

    if (!values.type)
        errors.type = "Selecione se essa questão é de exercício ou prova.";

    if (!values.question)
        errors.question = "Selecione o tipo de questão.";

    if (values.question === QUESTION_TYPE.V_OR_F) {
        if (values.alternatives.length === 0)
            errors.question = 'Tem que ter pelo menos 1 alternativa.';
        else
            alternativesValidation(values, errors);
    } else if (values.question === QUESTION_TYPE.MULTIPLE_CHOICES) {
        if (values.alternatives.length < 4)
            errors.question = 'Tem que ter pelo menos 4 alternativas.';
        else
            alternativesValidation(values, errors);
    } else if (values.question === QUESTION_TYPE.SHOT) {
        if (values.alternatives.length !== 4)
            errors.question = 'Tem que ter exatamente 4 alternativas.';
        else
            alternativesValidation(values, errors);
    }

    return errors;
}

export const ExerciseValidation = values => {
    let errors = {};

    if (isEmpty(values)) return errors;

    if(values.hasOwnProperty("shots")) {
        for (var value of Object.values(values.shots)) {
            let answer_sum = 0;
            for (var [alternative, answer] of Object.entries(value)) {
                answer_sum += parseInt(answer)
                if (answer_sum > 4) {
                    errors.error = "Somatória das alternativas da questão tem que está entre 1 e 4 pontos.";
                    errors[`${alternative.slice(1)}`] = true;
                }
            }
        }
    }

    return errors;
}