const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')

router.get('/', (req, res) => {
  const selectedCategory = req.query.category || 'all'
  const userId = req.user._id
  Category.find()
    .lean()
    .then(categories => {
      if (selectedCategory !== 'all' && !categories.some(category => category.name === selectedCategory))
        return res.render('error', { errorMessage: 'Cannot find this category.' })

      return Record.find({ userId })
        .populate('category')
        .sort({ date: 'asc' })
        .lean()
        .then(records => {
          let totalAmount = 0
          const filterRecords = records.filter(record => {
            if (selectedCategory !== 'all' && record.category.name !== selectedCategory) return false
            totalAmount += record.amount
            return true
          })
          res.render('index', {
            categories, selectedCategory, totalAmount,
            records: filterRecords,
            isHome: true
          })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

module.exports = router