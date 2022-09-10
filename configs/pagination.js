const constant = require('../configs/constant')
  
  const extractSearch = (req) => {
    let search
  
    if (req?.query?.q) {
      search = { name: { $regex: `.*${req.query.q}.*` } }
    } else {
      search = {}
    }
  
    return search
  }
  
  const pagination = (req) => {
    let search
    try {
      search = extractSearch(req)
    } catch (error) {
      return error
    }
    const sort = req.query.sb || 'desc'
    const order = req.query.ob || 'name'
    const limit = +req.query.lt || constant.PAGING.LIMIT
    const offset = +req.query.of || constant.PAGING.OFFSET
  
    return {
      search, sort, limit, offset, order
    }
  }
  
  module.exports = {
    pagination
  }
  