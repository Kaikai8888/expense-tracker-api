const Record = require('../models/record.js')
const Category = require('../models/category.js')
const { splitToObject } = require('../modules/utils.js')
const getFilter = require('../modules/getFilter.js')
const { success: successMsgs } = require('../docs/messages.json')

module.exports = {
  async getRecords(req, res, next) {
    try {
      const { categoryId, sort } = req.query
      let sortRule = sort ? splitToObject(sort) : { date: 'asc' }
      const conditions = getFilter(req)
      if (categoryId) conditions.category = categoryId
      const records = await Record.find(conditions, '-__v')
        .populate({ path: 'category', select: '-__v' })
        .sort(sortRule)
        .lean()
      if (!records.length && (Object.keys(conditions).length > 1)) throw new Error('noRecords')
      totalAmount = records.reduce((sum, record) => sum + record.amount, 0)
      return res.json({ records, totalAmount })
    } catch (error) {
      next(error)
    }
  }
}