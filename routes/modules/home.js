const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')

router.get('/', (req, res) => {
  Category.find()
    .lean()
    .then(categories =>
      Record.find()
        .populate('category')
        .lean()
        .then(records => res.render('index', { categories, records }))
        .catch(error => console.error(error)))
    .catch(error => console.error(error))
})

module.exports = router