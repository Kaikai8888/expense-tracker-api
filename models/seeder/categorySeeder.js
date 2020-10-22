const db = require('../../config/mongoose.js')
const Category = require('../category.js')
const categories = require('../data/categories.json')

db.once('open', () => {
  Category.insertMany(categories.default)
    .then(() => db.close())
    .then(() => console.log('Complete seed data creation.'))
    .catch(error => console.error(error))
})