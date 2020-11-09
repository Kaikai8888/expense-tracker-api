const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose.js')
const Category = require('../category.js')
const Record = require('../record.js')
const User = require('../user.js')
const { categories } = require('../data/categories.json')
const { users } = require('../data/users.json')
const records = require('../data/records.js')


db.once('open', () => {
  Promise.all([
    Category.deleteMany(),
    User.deleteMany(),
    Record.deleteMany()
  ])
    .then(() => Promise.all([
      Category.insertMany(categories),
      Promise.all(users.map(user =>
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(user.password, salt))
          .then(hash => {
            user.password = hash
            return User.create(user)
          })
      ))
    ]))
    .then(results => {
      records.forEach(record => {
        record.category = results[0].find(category => category.name === record.category)._id
        record.userId = results[1].find(user => user.name === record.userId)._id
      })
      return Record.insertMany(records)
    })
    .then(() => {
      console.log('Complete seed data creation.')
      process.exit()
    })
    .catch(error => console.error(error))
})

