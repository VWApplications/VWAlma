export const validateCreateSection = values => {
    const errors = {};

    if (!values.title)
        errors.title = "O título é obrigatório";

    if (!values.description)
        errors.students_limit = "A descrição é obrigatória.";

    if (!values.duration)
        errors.duration = "A duração da prova é obrigatória.";

    if (values.duration <= 0)
        errors.duration = "Duração da prova tem que ser maior que zero."

    if (!values.datetime)
        errors.datetime = "Data da prova é obrigatória.";

    return errors;
}