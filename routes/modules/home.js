const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')

router.get('/', (req, res) => {
  const { category, year, month, utcOffset } = req.query
  console.log('@@1: ', category, year, month, utcOffset)
  const userId = req.user._id

  Category.find()
    .lean()
    .then(categories => {
      if (selectedCategory !== 'all' && !categories.some(category => category.name === selectedCategory)) return res.render('error', { errorMessage: 'Cannot find this category.' })

      return Record.find({ userId })
        .populate('category')
        .sort({ date: 'asc' })
        .lean()
        .then(records => {
          let totalAmount = 0
          const filterRecords = records.filter(record => {
            if (category !== undefined && category !== 'all' && record.category.name !== category) return false
            const year = Number(record.date.getFullYear())
            totalAmount += record.amount
            record.date = record.date.getTime()
            return true
          })
          // console.log('@@2: ', records)
          // console.log('@@3: ', filterRecords)
          res.render('index', {
            category, year, month,
            categories, totalAmount,
            records: filterRecords,
            isHome: true
          })
        })
    )
    .catch(error => console.error(error))
})

module.exports = router


