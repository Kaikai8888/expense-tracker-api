const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')

router.get('/', (req, res) => {
  const userId = req.user._id
  const { category, year, month } = req.query
  let { utcOffset } = req.query
  const yearMonthFilter = {}

  console.log('@@1: ', category, year, month, utcOffset)

  if (year && month && utcOffset) {
    //transfer to MongoDB UTC offset format
    utcOffset = utcOffset > 0 ? '+' + utcOffset : utcOffset
    utcOffset = Math.abs(utcOffset) < 10 ? utcOffset[0] + '0' + utcOffset[1] : utcOffset
    console.log('@@2 utcOffset: ', utcOffset)
    yearMonthFilter.$and = [
      { $eq: [{ $year: { date: '$date', timezone: utcOffset } }, Number(year)] },
      { $eq: [{ $month: { date: '$date', timezone: utcOffset } }, Number(month)] }
    ]
  }

  Category.find()
    .lean()
    .then(categories => {
      //find selected category id
      const categoryDoc = categories.find(item => item.name === category)
      const categoryId = categoryDoc ? categoryDoc._id : undefined

      return Record
        .find({
          userId,
          // category: categoryId,
          $expr: yearMonthFilter
        })
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


