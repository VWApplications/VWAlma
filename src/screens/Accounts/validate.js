import { validatePhoto } from 'common/validations';

export const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = "Nome é obrigatório"
    }

    if (!values.email) {
        errors.email = "Email de autenticação é obrigatório.";
    }

    if (!values.password) {
        errors.password = "Senha deve ser passado."
    }

    if (!values.confirm_password) {
        errors.confirm_password = "Confirmação de senha deve ser passado."
    }

    if (values.password !== values.confirm_password) {
        errors.confirm_password = "As senhas não combinam."
    }

    if (!values.is_teacher === null) {
        errors.is_teacher = "Escolha entre professor e aluno."
    }

    if (values.photo) {
        errors.photo = validatePhoto(values.photo);
    }

    return errors;
}