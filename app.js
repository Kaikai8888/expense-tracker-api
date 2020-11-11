const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose.js')
const router = require('./routes')
const helpers = require('./utils/exphbs-helpers.js')
const usePassport = require('./config/passport.js')

const app = express()
const PORT = process.env.PORT
const URL = process.env.BASE_URL

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs', helpers }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.errorMessage = req.flash('errorMessage')
  res.locals.successMessage = req.flash('successMessage')
  res.locals.passportMessage = req.flash('error')
  return next()
})

app.use(router)

app.listen(PORT, () => {
  console.log(`App is listening on ${URL}${PORT}`)
})


