export const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = "Nome é obrigatório.";
    }

    if (!values.email) {
        errors.email = "Email deve ser passado."
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email inválido.'
    }

    if (!values.message) {
        errors.message = "Deve ser inserido uma mensagem."
    }

    return errors;
}