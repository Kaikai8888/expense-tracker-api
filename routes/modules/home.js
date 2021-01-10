const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')
const getFilter = require('../../controllers/getFilter.js')
const { splitToObject } = require('../../utils/utils.js')

router.get('/', (req, res, next) => {
  let error
  const { category, sort } = req.query
  let sortRule = sort ? splitToObject(sort) : { date: 'asc' }
  const conditions = getFilter(req)

  Category.find()
    .lean()
    .then(categories => {
      //find selected category id
      const categoryDoc = categories.find(item => item.name === category)
      if (categoryDoc || (category && category !== 'all')) {
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
            ...req.query,
            records, categories, totalAmount, error,
            isHome: true
          })
        })
    })
})

module.exports = router


