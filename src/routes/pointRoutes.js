const express = require('express')
const router = express.Router()
const pointsController = require('../controllers/pointsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(pointsController.getAllPoints)
    .post(pointsController.createNewPoint)
    .patch(pointsController.updatePoint)
    .delete(pointsController.deletePoint)

module.exports = router