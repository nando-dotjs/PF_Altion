const express = require('express')
const router = express.Router()
const driversController = require('../controllers/driversController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(driversController.getAllDrivers)                          
    .post(driversController.createNewDriver)
    .patch(driversController.updateDriver)
    .delete(driversController.deleteDriver)

module.exports = router