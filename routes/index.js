const express = require('express')
const router = express.Router()
const records = require('./modules/records.js')
const userController = require('./controllers/userController.js')
const apis = require('./modules/apis.js')
const { authenticator } = require('../middleware/auth.js')

router.use('/signin', userController.signIn)
router.use('/signup', userController.signUp)
router.use('/signout', userController.signOut)
router.use('/records', authenticator, records)
router.use('/api', authenticator, apis)

module.exports = router
