const mongoose = require('mongoose')
const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 50,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  merchant: {
    type: String,
    maxlength: 100
  }
})

module.exports = mongoose.model('Record', recordSchema)