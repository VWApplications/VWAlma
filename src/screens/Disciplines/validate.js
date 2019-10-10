export const validateDiscipline = values => {
    const errors = {};

    if (!values.title)
        errors.title = "Título da disciplina é obrigatório.";

    if (values.title && values.title.length > 50)
        errors.title = "Tamanho do texto inválido.";

    if (values.course && values.course.length > 50)
        errors.course = "Tamanho do texto inválido.";

    if (values.institution && values.institution.length > 50)
        errors.institution = "Tamanho do texto inválido.";

    if (!values.description)
        errors.description = "Ementa da disciplina é obrigatório.";

    if (!values.classroom)
        errors.classroom = "A turma é obrigatória.";

    if (values.classroom && values.classroom.length > 20)
        errors.classroom = "Tamanho do texto inválido.";

    if (values.password && values.password.length > 30)
        errors.password = "Tamanho da senha inválido.";

    if (values.students_limit > 150)
        errors.students_limit = "O limite de estudantes por turma não pode ultrapassar 150.";

    if (values.students_limit < 5)
        errors.students_limit = "O limite de estudantes por turma não pode ser inferior a 5.";

    if (values.monitors_limit > 15)
        errors.monitors_limit = "O limite de estudantes por turma não pode ultrapassar 15.";

    if (values.monitors_limit < 0)
        errors.monitors_limit = "O limite de estudantes por turma não pode ser inferior a 0.";

    return errors;
}