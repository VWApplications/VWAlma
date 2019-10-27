import { V_OR_F } from './constants';

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

    if (counter > 1)
        errors.question_type = "Só pode haver uma única alternativa correta.";
    else if (counter === 0)
        errors.question_type = "Deve ter pelo menos uma alternativa correta.";

    if(alternativeArrayErrors.length > 0)
        errors.alternatives = alternativeArrayErrors;

    if(alternativeArrayErrors.length > 0)
        errors.alternatives = alternativeArrayErrors;
}

export const validateQuestionForm = values => {
    const errors = {};

    if (!values.title)
        errors.title = "Título da questão é obrigatório.";

    if (!values.is_exercise)
        errors.is_exercise = "Selecione se essa questão é de exercício ou prova.";

    if (!values.question_type)
        errors.question_type = "Selecione o tipo de questão.";

    if (values.question_type === V_OR_F) {
        if (values.alternatives.length === 0)
            errors.question_type = 'Tem que ter pelo menos 1 alternativa.';
        else
            alternativesValidation(values, errors);
    } else {
        if (values.alternatives.length < 4)
            errors.question_type = 'Tem que ter pelo menos 4 alternativas.';
        else
            alternativesValidation(values, errors);
    }

    return errors;
}