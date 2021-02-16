const { body, check, validationResult } = require('express-validator')
const errMsgsDoc = require('../docs/messages.json')
const User = require('../models/user.js')

const signinCheck = async (req, res, next) => {
  try {
    await body('email').isEmail().withMessage('invalidEmail').run(req)
    await body('password').isLength({ min: 8, max: 12 }).withMessage('invalidPassword').run(req)

    return validationResultCheck(req, res, next)
  } catch (error) {
    next(error)
  }
}

const signupCheck = async (req, res, next) => {
  try {
    await body('email').isEmail().withMessage('invalidEmail').bail().custom(async (email) => {
      const user = await User.findOne({ email })
      if (user) throw new Error('alreadyRegister')
      return true
    }).run(req)
    await body('name').trim().exists({ checkFalsy: true }).withMessage('invalidEmail').run(req)
    await body('password').isLength({ min: 8, max: 12 }).withMessage('invalidPassword').run(req)
    await body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('passwordInconsistent')
      return true
    })
    return validationResultCheck(req, res, next)
  } catch (error) {
    next(error)
  }
}

const idCheck = (paramType = 'params', field = 'id', optional = false) => {
  return (req, res, next) => {
    if (!req[paramType]) return next(new Error('Target validation field not found'))
    const id = req[paramType][field]
    if (optional && !id) return next()
    if (!Number.isInteger(parseFloat(id))) return next(new Error('invalidId'))
    next()
  }
}


function validationResultCheck(req, res, next) {
  const errorResults = validationResult(req)
  if (errorResults.isEmpty()) return next()
  const errorMsgs = errorResults.errors.map(error => errMsgsDoc[400][error.msg] || error.msg)
  return res.status(400).json({
    status: 'error',
    message: errorMsgs.length === 1 ? errorMsgs[0] : errorMsgs
  })
}


module.exports = {
  signinCheck,
  signupCheck,
  idCheck
}