export const normalizeValue = value => {
    const onlyNumbers = value.replace(/[^\d]/g, "");
    if (!onlyNumbers) return onlyNumbers;
    if (onlyNumbers.length <= 1) return "R$ " + onlyNumbers;
    if (onlyNumbers.length <= 2)
        return `R$ ${onlyNumbers.slice(0, 1)},${onlyNumbers.slice(1, 2)}`;
    if (onlyNumbers.length <= 3)
        return `R$ ${onlyNumbers.slice(0, 1)},${onlyNumbers.slice(1, 3)}`;
    if (onlyNumbers.length > 3)
        return `R$ ${onlyNumbers.slice(0, onlyNumbers.length-2)},${onlyNumbers.slice(onlyNumbers.length-2, onlyNumbers.length)}`;
}