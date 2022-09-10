const constant = require('../../configs/constant')

const keyValidation = async (req, res, next) => {
  if (req?.headers?.key) {
    if (req?.headers?.key === process.env.X_KEY) {
      return next()
    }
    const message = { error: constant.MESSAGE.INVALID.KEY }
    return res.status(401).json(message) 
  }
  const message = { error: constant.MESSAGE.MISSING.KEY }
  return res.status(403).json(message) 
}

module.exports = { keyValidation }
