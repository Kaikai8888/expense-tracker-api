const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')
const { range } = require('../../utils/utils.js')

router.get('/', (req, res) => {
  const selectedCategory = req.query.category || 'all'
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
          let maxYear = Number(records[0].date.getFullYear())
          let minYear = maxYear
          const filterRecords = records.filter(record => {
            if (selectedCategory !== 'all' && record.category.name !== selectedCategory) return false
            const year = Number(record.date.getFullYear())
            totalAmount += record.amount
            maxYear = Math.max(maxYear, year)
            minYear = Math.min(minYear, year)
            record.date = record.date.getTime()
            return true
          })
          res.render('index', {
            categories, selectedCategory, totalAmount,
            records: filterRecords,
            years: range(minYear, maxYear + 1),
            months: range(1, 13),
            isHome: true
          })
        })
    })
    .catch(error => console.error(error))
})

module.exports = router