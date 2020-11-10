const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user.js')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    return User.findOne({ email })
      .then(user => {
        if (!user) return done(null, false, { message: '這個 Email 尚未註冊' })
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) return done(null, false, { message: 'Email或密碼有誤' })
            return done(null, user)
          })
      })
      .catch(error => done(error, false))
  }))

  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => User.findById(id)
    .lean()
    .then(user => done(null, user))
    .catch(error => done(error, false)))
}