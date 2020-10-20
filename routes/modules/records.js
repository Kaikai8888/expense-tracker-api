const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')

//create
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new-and-edit', { today: new Date(), categories }))
    .catch(error => console.error(error))
})

router.post('/', (req, res) => {
  const input = req.body
  Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

//edit
router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .populate('category')
    .lean()
    .then(record => {
      if (record) {
        Category.find()
          .lean()
          .then(categories => res.render('new-and-edit',
            { isEdit: true, today: new Date(), record, categories }))
          .catch(error => console.error(error))
      } else {
        res.render('error', { errorMessage: `Cannot find this expense.` })
      }
    })
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const input = req.body
  Record.findById(id)
    .then(record => {
      if (record) {
        Object.assign(record, input)
        record.save()
          .then(res.redirect('/'))
          .catch(error => console.error(error))
      }
    })
    .catch(error => console.error(error))
})


module.exports = router



