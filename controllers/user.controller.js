const user = require('../models/user.model')
const { pagination } = require('../configs/pagination')
const constant = require('../configs/constant')

const internalErrorMessage = {
  error: constant.MESSAGE.ERROR.INTERNAL
}

const select = ['user_id', 'name', 'email', 'address', 'photos', 'creditcard']
const store = async (input, res) => {
  try {
    const creditcard = {
      creditcard: {
        type: input.body.creditcard_type,
        name: input.body.creditcard_name,
        number: input.body.creditcard_number,
        expired: input.body.creditcard_expired,
        cvv: input.body.creditcard_cvv
      }
    }

    const data = {
      ...input.body,
      ...creditcard
    }

    const result = await user.create(data)
    res.status(200).json({ user_id: result.user_id })
  } catch (error) {
    res.status(500).json(internalErrorMessage)
  }
}

const show = async (req, res) => {
  try {
    const user_id = +req?.params.user_id || 'NaN'
    if (user_id === 'NaN') {
      const paginate = pagination(req)
      const {
        order, sort, search, limit, offset
      } = paginate

      const row = await user.find(search, { _id: 0 }).select(select)
        .skip(offset)
        .limit(limit)
        .sort({ [order]: [sort] })
      const count = await user.estimatedDocumentCount()
      const dataMapping = {
        count,
        row
      }
      res.status(200).json(dataMapping)
    } else {
      const result = await user.find({ user_id }, { _id: 0 }).select(select)
      if (result[0]?.name) {
        result.map((r) => {
          delete r._id

          return r
        })
        res.status(200).json(result)
      } else {
        const messages = { error: constant.MESSAGE.MISSING.USER }
        res.status(404).json(messages)
      }
    }
  } catch (error) {
    res.status(500).json(internalErrorMessage)
  }
}

const update = async (req, res) => {
  try {
    const { user_id } = req.body

    const creditcard = {
      creditcard: {
        type: req.body.creditcard_type,
        name: req.body.creditcard_name,
        number: req.body.creditcard_number,
        expired: req.body.creditcard_expired,
        cvv: req.body.creditcard_cvv
      }
    }

    const data = {
      ...req.body,
      ...creditcard
    }

    await user.findOneAndUpdate({ user_id },
      { $set: data }, { new: true })
    res.status(500).json({ success: true })
  } catch (error) {
    res.status(500).json(internalErrorMessage)
  }
}

module.exports = {
  store, show, update
}
