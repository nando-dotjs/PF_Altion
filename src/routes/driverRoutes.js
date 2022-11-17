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

router.route('/driver')
    .get(driversController.getDriver)
    .patch(driversController.updateDriverState)

module.exports = router