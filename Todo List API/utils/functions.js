const timeConvert = (time) => {
    const date = new Date(time)
    const dateHour = date.toLocaleString('pt-Br', { dateStyle: 'short', timeStyle: 'short' }).replace(',', '');
    return dateHour
}
module.exports = timeConvert