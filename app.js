const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const PORT = 3000

require('./config/mongoose.js')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})