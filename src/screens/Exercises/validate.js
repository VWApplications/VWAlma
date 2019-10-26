import { validateTextEditor } from 'common/validations';

export const validateQuestionForm = values => {
    const errors = {};

    if (!values.title)
        errors.title = "Título da questão é obrigatório.";

    if (!validateTextEditor(values.description))
        errors.description = "Descrição da questão é obrigatório.";

    if (!values.is_exercise)
        errors.is_exercise = "Selecione se essa questão é de exercício ou prova.";

    if (!values.type)
        errors.type = "Selecione o tipo de questão.";

    if (values.type === "MULTIPLE_CHOICES") {
        if (!values.alternative_A)
            errors.alternative_A = "A alternativa A deve ser preenchida."
        if (!values.alternative_B)
            errors.alternative_B = "A alternativa B deve ser preenchida."
        if (!values.alternative_C)
            errors.alternative_C = "A alternativa C deve ser preenchida."
        if (!values.alternative_D)
            errors.alternative_D = "A alternativa D deve ser preenchida."
    }

    if (values.correct_answer) {
        if (values.type === "MULTIPLE_CHOICES") {
            if (values.correct_answer !== "A" &&
                values.correct_answer !== "B" &&
                values.correct_answer !== "C" &&
                values.correct_answer !== "D")
                    errors.correct_answer = "Selecione qual a resposta correta.";
        } else {
            if (values.correct_answer !== "TRUE" && values.correct_answer !== "FALSE")
                errors.correct_answer = "Selecione qual a resposta correta.";
        }
    } else {
        errors.correct_answer = "Selecione qual a resposta correta.";
    }

    return errors;
}