const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')
const getFilter = require('../../controllers/getFilter.js')

router.get('/records', (req, res, next) => {
  const { category } = req.query
  // let sortRule = sort ? splitToObject(sort) : { date: 'asc' }
  const conditions = getFilter(req)

  return Category.find({ name: category })
    .lean()
    .then(categoryDoc => {
      //find selected category id
      if (categoryDoc.length) {
        conditions.category = categoryDoc[0]._id
      }

      const aggregation = [
        { $match: conditions },
        {
          $group: {
            _id: '$category',
            subTotalAmount: { $sum: '$amount' }
          }
        },
        {
          $lookup: {
            from: 'categories',
            localField: '_id',
            foreignField: '_id',
            as: 'category_docs'
          }
        },
        { $sort: { subTotalAmount: -1 } }
      ]

      return Record
        .aggregate(aggregation)
        .exec()
        .then(records => {
          if (!records.length && category) return res.json({ status: 'error', message: '查無資料，請確認您的篩選條件' })
          return res.json(records)
        })
    }).catch(error => next(error))
})

module.exports = router