const db = require('../../config/mongoose.js')
const Category = require('../category.js')
const categories = require('../data/categories.json')
const Record = require('../record.js')
const records = require('../data/records.js')

db.once('open', () => {
  categories.default.forEach(category => {
    Category.create(category)
      .then(category => records.forEach(record => {
        if (record.category !== category.name) return
        record.category = category._id
        Record.create(record)
          .catch(error => console.error(error))
      }))
      .catch(error => console.error(error))
  })
  console.log('Complete seed data creation.')
})