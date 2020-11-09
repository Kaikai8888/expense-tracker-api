const express = require('express')
const router = express.Router()
const home = require('./modules/home.js')
const records = require('./modules/records.js')
const users = require('./modules/users.js')

router.use('/users', users)
router.use('/records', records)
router.use('/', home)

module.exports = router
