import { validatePhoto, validateEmail } from 'common/validations';

export const validateLogin = values => {
    const errors = {};

    if (!values.email) {
        errors.email = "Email de autenticação é obrigatório.";
    }

    if (!validateEmail(values.email)) {
        errors.email = "Email inválido."
    }

    if (!values.password) {
        errors.password = "Senha deve ser passado."
    }

    return errors;
}

export const validateNewPassword = values => {
    const errors = {};

    if (!values.key) {
        errors.key = "Chave de recuperação é obrigatória."
    }

    if (!values.confirm_password) {
        errors.confirm_password = "Confirmação de senha deve ser passado."
    }

    if (!values.new_password) {
        errors.new_password = "A nova senha deve ser passada."
    }

    if (values.confirm_password && values.new_password !== values.confirm_password) {
        errors.confirm_password = "As senhas não combinam."
    }

    return errors;
}

export const validateResetPassword = values => {
    const errors = {};

    if (!values.email) {
        errors.email = "Email de autenticação é obrigatório.";
    }

    if (!validateEmail(values.email)) {
        errors.email = "Email inválido."
    }

    return errors;
}

export const validateUpdatePassword = values => {
    const errors = {};

    if (!values.password) {
        errors.password = "Senha deve ser passado."
    }

    if (!values.confirm_password) {
        errors.confirm_password = "Confirmação de senha deve ser passado."
    }

    if (!values.new_password) {
        errors.new_password = "A nova senha deve ser passada."
    }

    if (values.confirm_password && values.new_password !== values.confirm_password) {
        errors.confirm_password = "As senhas não combinam."
    }

    return errors;
}

export const validateRegister = values => {
    const errors = {};

    if (!values.name) {
        errors.name = "Nome é obrigatório"
    }

    if (!values.email) {
        errors.email = "Email de autenticação é obrigatório.";
    }

    if (!validateEmail(values.email)) {
        errors.email = "Email inválido."
    }

    if (!values.password) {
        errors.password = "Senha deve ser passado."
    }

    if (!values.confirm_password) {
        errors.confirm_password = "Confirmação de senha deve ser passado."
    }

    if (values.confirm_password && values.password !== values.confirm_password) {
        errors.confirm_password = "As senhas não combinam."
    }

    if (!values.is_teacher === null) {
        errors.is_teacher = "Escolha entre professor e aluno."
    }

    return errors;
}

export const validateUpdateUser = values => {
    const errors = {};

    if (!values.name) {
        errors.name = "Nome é obrigatório"
    }

    if (!values.email) {
        errors.email = "Email de autenticação é obrigatório.";
    }

    if (!validateEmail(values.email)) {
        errors.email = "Email inválido."
    }

    if (values.photo) {
        if (typeof values.photo !== "string")
            errors.photo = validatePhoto(values.photo);
    }

    return errors;
}