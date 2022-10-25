const express = require('express')
const router = express.Router()
const zonesController = require('../controllers/zonesController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(zonesController.getAllZones)                          
    .post(zonesController.createNewZone)
    .patch(zonesController.updateZone)
    .delete(zonesController.deleteZone)

module.exports = router