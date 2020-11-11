module.exports = {
  range: (a, b) => {
    if (!(a < b)) return
    const array = []
    for (let i = a; i < b; i++) {
      array.push(i)
    }
    return array
  }
}