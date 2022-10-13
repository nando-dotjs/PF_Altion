const express = require('express')
const router = express.Router()
const cevsController = require('../controllers/cevsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(cevsController.getAllCevs)
    .post(cevsController.createNewCev)
    .patch(cevsController.updateCev)
    .delete(cevsController.deleteCev)

module.exports = router