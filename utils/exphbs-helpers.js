module.exports = {
  numberFormat: number => new Intl.NumberFormat().format(number),
  dateFormat: (separator, date) => {
    let day = date.getDate()
    let month = date.getMonth() + 1
    month = month < 10 ? `0${month}` : month
    day = day < 10 ? `0${day}` : day
    return `${date.getFullYear()}${separator}${month}${separator}${day}`
  },
  toProperCase: (input) => {
    if (typeof input !== 'string' || !input) return input
    return input.split(' ').map(subString => {
      if (!subString) return subString
      return subString[0].toUpperCase() + subString.slice(1)
    }).join(' ')
  },
  eq: (a, b) => a === b,
  and: (a, b) => a && b,
  or: (a, b) => a || b,
  not: (a) => !a,
  eqAfterToString: (a_id, b_id) => a_id.toString() === b_id.toString()
}