export const timeFormat = (dateToBeFormated) => {
    const date = new Date(dateToBeFormated)
    const dateFormated = date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).replace(',', '')
    return dateFormated
}