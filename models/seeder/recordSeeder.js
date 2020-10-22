const db = require('../../config/mongoose.js')
const Category = require('../category.js')
const Record = require('../record.js')
const records = require('../data/records.js')

db.once('open', () => {
  Category.find()
    .lean()
    .then(categories => {
      records.forEach(record => record.category = categories.find(category => category.name === record.category)._id)
      return Record.insertMany(records)
        .catch(error => console.error(error))
    })
    .then(() => db.close())
    .then(() => console.log('Complete seed data creation.'))
    .catch(error => console.error(error))
})