const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')
const { splitToObject } = require('../../utils/utils.js')

router.get('/', (req, res) => {
  const userId = req.user._id
  const { category, year, month, utcOffset, search, sort } = req.query
  const conditions = { userId }
  let error
  let sortRule = sort ? splitToObject(sort) : { date: 'asc' }

  if (search) {
    conditions.name = { $regex: new RegExp(`${search.trim()}`), $options: 'i' }
  }

  // year and month filtering
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
        .sort(sortRule)
        .lean()
        .then(records => {
          let totalAmount = records.reduce((sum, record) => {
            sum += record.amount
            record.date = record.date.getTime()
            return sum
          }, 0)

          if (!records.length && category) {
            error = "查無資料，請確認您的篩選條件"
          }

          return res.render('index', {
            category, year, month, search, sort,
            records, categories, totalAmount, error,
            isHome: true
          })
        })
    })
    .catch(error => console.error(error))
})

module.exports = router


