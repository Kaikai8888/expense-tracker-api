const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    match: [/@/, 'Invalid Email']
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)