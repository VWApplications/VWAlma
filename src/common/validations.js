const validateImageWeight = (img, maxWeight) => {
    if (img && img.size) {
        const imageFileKb = img.size / 1024;
        if (imageFileKb > maxWeight) {
            return `Tamanho da imagem deve ser menor ou igual a ${maxWeight}kb`
        }
    }
}

const validateImageFormat = (img, mimeType) => {
    if (img) {
        if (!mimeType.includes(img.type))
            return `Formato da imagem deve ser ${mimeType}`;
    }
}

const validateImageWidth = (img, maxWidth) => {
    if (img) {
        if (img.width > maxWidth)
            return `Largura da imagem deve ser menor ou igual a ${maxWidth}px`;
    }
}

const validateImageHeight = (img, maxHeight) => {
    if (img) {
        if (img.height > maxHeight)
            return `Altura da imagem deve ser menor ou igual a ${maxHeight}px`;
    }
}

const validatePhoto = img => {
    let error = validateImageFormat(img, "image/jpeg, image/png");
    if (!error)
        error = validateImageHeight(img, 300);
    if (!error)
        error = validateImageWidth(img, 300);
    if (!error)
        error = validateImageWeight(img, 500);

    return error;
}

const validateEmail = email => {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return true;
    }

    return false;
}

export { validatePhoto, validateEmail };