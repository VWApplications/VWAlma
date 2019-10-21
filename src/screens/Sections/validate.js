export const validateCreateSection = values => {
    const errors = {};

    if (!values.title)
        errors.title = "O título é obrigatório";

    if (!values.description)
        errors.students_limit = "A descrição é obrigatória.";

    return errors;
}