module.exports = {
  splitToObject: (string) => {
    if (typeof string !== 'string' || !string.includes('-')) return
    const subStrings = string.split('-')
    const object = {}
    object[subStrings[0]] = subStrings[1]
    return object
  },
  range: (a, b) => {
    if (!(a < b)) return
    const array = []
    for (let i = a; i < b; i++) {
      array.push(i)
    }
    return array
  }
}