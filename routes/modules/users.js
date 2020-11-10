const express = require('express')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const router = express.Router()
const User = require('../../models/user.js')

router.get('/login', (req, res) => res.render('login'))

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => res.render('register'))

router.post('/register', (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  const error = []
  //validation
  if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
    error.push({ message: '所有欄位皆必填' })
  }
  if (password.length < 8 || password.length > 12) {
    error.push({ message: '密碼長度須為 8 ~ 12 個字元' })
  }
  if (password !== confirmPassword) {
    error.push({ message: '密碼與確認密碼不一致' })
  }
  if (error.length) return res.render('register', { ...req.body, error })

  //create users
  User.findOne({ email })
    .then(user => {
      if (user) {
        error.push({ message: '這個 Email 已註冊' })
        return res.render('register', { ...req.body, error })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash }))
        .then(() => next())
    })
    .catch(error => console.error(error))
}, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('successMessage', '已成功登出')
  return res.redirect('/users/login')
})

module.exports = router