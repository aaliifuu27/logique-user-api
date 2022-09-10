const { validationResult } = require('express-validator')

const constant = require('../../configs/constant')


const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const messages = {
      error: constant.MESSAGE.ERROR.FIELD_PROVIDE,
      val: errors.array()
    }
    return res.status(400).json(messages)
  }

  return next()
}

module.exports = {
  validationMiddleware
}
