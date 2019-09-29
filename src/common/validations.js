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

export { validateImageWeight, validateImageFormat, validateImageWidth, validateImageHeight };