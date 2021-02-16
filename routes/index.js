const express = require('express')
const router = express.Router()
const passport = require('../config/passport.js')
const userController = require('../controllers/userController.js')
const { signinCheck, signupCheck, idCheck } = require('../middleware/validator.js')

function authenticate(req, res, next) {
  return passport.authenticate('jwt', { session: false })(req, res, next)
}

router.post('/signin', signinCheck, userController.signIn)
router.post('/signup', signupCheck, userController.signUp)
router.post('/signout', authenticate, userController.signOut)
// router.use('/records', authenticator, records)
// router.use('/api', authenticator, apis)

module.exports = router
