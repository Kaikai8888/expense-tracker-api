const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')

router.get('/', (req, res) => {
  const selectedCategory = req.query.category || 'all'
  Category.find()
    .lean()
    .then(categories => {
      if (!categories.some(category => category.name === selectedCategory))
        return res.render('error', { errorMessage: 'Cannot find this category.' })

      Record.find()
        .populate('category')
        .sort({ date: 'asc' })
        .lean()
        .then(records => res.render('index', {
          categories, records, selectedCategory,
          isHome: true,
          totalAmount: records.reduce((sum, record) => sum + record.amount, 0)
        }))
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

module.exports = router