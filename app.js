const express = require('express')
const bodyParser = require('body-parser')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose.js')
const router = require('./routes')
const passport = require('./config/passport.js')
const app = express()
const PORT = process.env.PORT
const URL = process.env.BASE_URL

app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use('/api', router)
app.use('/', (req, res) => res.send('This is the backend server for expense tracker.'))
app.use((error, req, res, next) => {
  console.log(error)
  return res.status(500).json({ status: 'error', message: 'Unexpected error occurs. Please try again later.' })
})

app.listen(PORT, () => {
  console.log(`App is listening on ${URL}${PORT}`)
})


