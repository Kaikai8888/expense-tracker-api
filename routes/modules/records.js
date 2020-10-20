const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')

router.get('/new', (req, res) => {
  let today = new Date()
  today = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  Category.find()
    .lean()
    .then(categories => res.render('new', { today, categories }))
    .catch(error => console.error(error))
})


module.exports = router