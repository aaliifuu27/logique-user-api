const express = require('express')
const user = require('../controllers/user.controller')
const { registerValidation, updatedValidation } = require('../middlewares/validation/user.validation')
const { keyValidation } = require('../middlewares/validation/key.validation')

const router = express.Router()

router.post('/user/register', keyValidation, registerValidation, (req, res) => {
  user.store(req, res)
})

router.patch('/user', keyValidation, updatedValidation, (req, res) => {
  user.update(req, res)
})

router.get('/user/:user_id', keyValidation, (req, res) => {
  user.show(req, res)
})

module.exports = router
