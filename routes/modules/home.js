const express = require('express')
const router = express.Router()
const getRecords = require('../../services/getRecords.js')

router.get('/', (req, res, next) => {
  getRecords(req)
    .then((data) => res.render('index', data))
    .catch(error => next(error))
})

module.exports = router


