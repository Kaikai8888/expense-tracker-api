const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose.js')
const router = require('./routes')
const passport = require('./config/passport.js')
const app = express()
const PORT = process.env.PORT
const URL = process.env.BASE_URL
const errMsgs = require('./docs/messages.json')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use('/api', router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(YAML.load('./docs/api-doc.yaml')))
app.get('/', (req, res) => res.send(`
<p>This is the backend server for expense tracker.</p>
<a href="/api-docs">API Document</a>
`))

app.use((error, req, res, next) => {
  for (let code in errMsgs) {
    if (!parseInt(code)) continue
    if (errMsgs[code][error.message]) return res.status(Number(code)).json({ status: 'error', message: errMsgs[code][error.message] })
  }
  console.log(error)
  return res.status(500).json({ status: 'error', message: 'Unexpected error occurs. Please try again later.' })
})

app.listen(PORT, () => {
  console.log(`App is listening on ${URL}${PORT}`)
})


