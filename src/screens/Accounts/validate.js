export const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = "Nome de usuário ou matrícula é obrigatório.";
    }

    if (!values.password) {
        errors.password = "Senha deve ser passado."
    }

    return errors;
}