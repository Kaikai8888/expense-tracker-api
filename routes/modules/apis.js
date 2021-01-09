const express = require('express')
const router = express.Router()
const getRecords = require('../../services/getRecords.js')

router.get('/records', (req, res) => {
  getRecords(req)
    .then((data) => res.json(data))
    .catch(error => next(error))
})

module.exports = router