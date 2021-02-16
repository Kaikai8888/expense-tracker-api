const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const { success: successMsgs } = require('../docs/messages.json')

module.exports = {
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) throw new Error('notRegister')
      if (!bcrypt.compareSync(password, user.password)) throw new Error('wrongPassword')

      const payload = {
        id: user.id,
        name: user.name
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
      return res.json({ status: 'success', token })
    } catch (error) {
      next(error)
    }
  },
  async signOut(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
      if (error) return next(error)
      const { iat, exp } = payload
      try {
        await redis.setAsync(token, exp, 'EX', exp - iat)
      } catch (error) {
        next(error)
      }
      return res.json({ status: 'success', message: successMsgs.general })
    })
  },
  async signUp(req, res, next) {
    try {
      const { name, email, password } = req.body
      await User.create({ name, email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) })
      return res.json({ status: 'success', message: successMsgs.general })
    } catch (error) {
      next(error)
    }
  }
}