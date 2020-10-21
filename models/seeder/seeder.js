const db = require('../../config/mongoose.js')
const Category = require('../category.js')
const categories = require('../data/categories.json')
const Record = require('../record.js')
const records = require('../data/records.js')

db.once('open', () => {
  Category.insertMany(categories.default)
    .then(categories => records.forEach(record => {
      record.category = categories.find(category => category.name === record.category)._id
      Record.create(record)
        .catch(error => console.error(error))
    }))
    .catch(error => console.error(error))

  console.log('Complete seed data creation.')
})