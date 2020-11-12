const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')

router.get('/', (req, res) => {
  const userId = req.user._id
  const { category, year, month, utcOffset } = req.query
  const conditions = { userId }
  console.log('@@utcOffset: ', utcOffset)
  if (year && month && utcOffset) {
    conditions.$expr = {
      $and: [
        { $eq: [{ $year: { date: '$date', timezone: utcOffset } }, Number(year)] },
        { $eq: [{ $month: { date: '$date', timezone: utcOffset } }, Number(month)] }
      ]
    }
  }

  Category.find()
    .lean()
    .then(categories => {
      //find selected category id
      const categoryDoc = categories.find(item => item.name === category)
      if (categoryDoc || (category && category !== 'all' && !categoryDoc)) {
        conditions.category = categoryDoc._id
      }

      return Record
        .find(conditions)
        .populate('category')
        .sort({ date: 'asc' })
        .lean()
        .then(records => {
          let totalAmount = records.reduce((sum, record) => {
            sum += record.amount
            record.date = record.date.getTime()
            return sum
          }, 0)
          return res.render('index', {
            category, year, month,
            records, categories, totalAmount,
            isHome: true
          })
        })
    })
    .catch(error => console.error(error))
})

module.exports = router


