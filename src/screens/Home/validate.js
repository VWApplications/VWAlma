import { validateEmail } from 'common/validations';

export const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = "Nome é obrigatório.";
    }

    if (!values.email) {
        errors.email = "Email deve ser passado.";
    }

    if (!validateEmail(values.email)) {
        errors.email = 'Email inválido.';
    }

    if (!values.message) {
        errors.message = "Deve ser inserido uma mensagem."
    }

    return errors;
}