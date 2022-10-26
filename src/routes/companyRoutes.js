const express = require('express')
const router = express.Router()
const companyController = require('../controllers/companysController')
const verifyJWT = require('../middleware/verifyJWT')

//router.use(verifyJWT)

router.route('/')
    .get(companyController.getAllCompany)
    .post(companyController.createNewCompany)
    .patch(companyController.updateCompany)
    .delete(companyController.deleteCompany)

module.exports = router