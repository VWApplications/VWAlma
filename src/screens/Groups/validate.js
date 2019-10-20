export const validateCreateGroup = values => {
    const errors = {};

    if (!values.title)
        errors.title = "O título é obrigatório";

    if (!values.students_limit)
        errors.students_limit = "A quantidade de estudantes é obrigatória.";

    if (values.students_limit > 12)
        errors.students_limit = "A quantidade de estudantes no grupo deve ser no máximo 12";

    return errors;
}