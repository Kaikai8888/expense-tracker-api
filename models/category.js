const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 10,
    trim: true,
    validate: {
      validator: (v) => v.trim() !== 'all',
      message: () => `It's forbidden to name category as "all"`
    }
  },
  iconClass: {
    type: String,
    trim: true,
    required: true
  }
})

module.exports = mongoose.model('Category', categorySchema)