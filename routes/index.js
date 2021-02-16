const express = require('express')
const router = express.Router()
const passport = require('../config/passport.js')
const userController = require('../controllers/userController.js')
const { signinCheck, signupCheck, idCheck } = require('../middleware/validator.js')

router.post('/signin', signinCheck, userController.signIn)

module.exports = router
