const express = require('express')
const router = express.Router()
const routesController = require('../controllers/routesController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(routesController.getAllRoutes)                          
    .post(routesController.createNewRoute)
    .patch(routesController.updateRoute)
    .delete(routesController.deleteRoute)

module.exports = router