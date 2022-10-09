const express = require('express')
const router = express.Router()
const registerController = require('../controllers/registerController')

router.route('/')
    .post(registerController.registerNewUser)

module.exports = router
