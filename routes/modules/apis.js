const express = require('express')
const router = express.Router()
const getRecords = require('../../services/getRecords.js')

router.get('/records', (req, res, next) => {
  getRecords(req)
    .then(data => {
      if (data.error) return res.json({ status: 'error', message: data.error })
      // const groupedData = data.
      res.json(data.records)
    })
    .catch(error => next(error))
})

module.exports = router