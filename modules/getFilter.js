module.exports = (req) => {
  const userId = req.user._id
  const { month, utcOffset, search } = req.query
  const conditions = { userId }
  if (search) {
    conditions.name = { $regex: new RegExp(`${search.trim()}`), $options: 'i' }
  }

  // year and month filtering
  if (month && utcOffset) {
    const [year, monthString] = month.split('-')
    conditions.$expr = {
      $and: [
        { $eq: [{ $year: { date: '$date', timezone: utcOffset } }, Number(year)] },
        { $eq: [{ $month: { date: '$date', timezone: utcOffset } }, Number(monthString)] }
      ]
    }
  }
  return conditions
}