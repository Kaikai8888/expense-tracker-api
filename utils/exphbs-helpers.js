module.exports = {
  numberFormat: number => new Intl.NumberFormat().format(number),
  dateFormat: date => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}