const express = require('express')
const router = express.Router()
const home = require('./modules/home.js')
const records = require('./modules/records.js')
const users = require('./modules/users.js')
const auth = require('./modules/auth.js')
const apis = require('./modules/apis.js')
const { authenticator } = require('../middleware/auth.js')

router.use('/users', users)
router.use('/auth', auth)
router.use('/records', records)
router.use('/api', authenticator, apis)
router.use('/', authenticator, home)

module.exports = router
