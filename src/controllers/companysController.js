const Company = require('../models/Company')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all companys 
// @route GET /companys
// @access Private
const getAllCompany = asyncHandler(async (req, res) => {
    // Get all companys from MongoDB
    const companys = await Company.find().lean()

    // If no companys 
    if (!companys?.length) {
        return res.status(400).json({ message: 'No hay empresas disponibles' })
    }

    const companysWithUser = await Promise.all(companys.map(async (company) => {
        const user = await User.findById(company.user).lean().exec()
        return { ...company, username: user.username }
    }))

    res.json(companysWithUser)
})

// @desc Create new companys
// @route POST /companys
// @access Private
const createNewCompany = asyncHandler(async (req, res) => {
    const { user, fantasyName, socialReason, rut, cel, street, streetNumber, lat, long} = req.body
    // Confirm data

    console.log(user, fantasyName, socialReason, rut, cel, street, streetNumber, lat, long);
    if (!user || !fantasyName || !cel || !socialReason || !rut || !street || !streetNumber || !lat || !long) {
        return res.status(400).json({ message: 'Debe completar todos los campos' })
    }

    // Check for duplicate title
    const duplicate = await Company.findOne({ user }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Ya existe una Empresa asociada a este usuario' })
    }

    // Create and store the new user 
    const company = await Company.create({ user, fantasyName, cel, socialReason, rut, street, streetNumber, lat, long})

    if (company) { // Created 
        return res.status(201).json({ message: 'Nueva Empresa creada' })
    } else {
        return res.status(400).json({ message: 'Datos inválidos' })
    }

})

// @desc Update a company
// @route PATCH /companys
// @access Private
const updateCompany = asyncHandler(async (req, res) => {
    const { id, user, fantasyName, socialReason, rut, cel, street, streetNumber, completed } = req.body
    console.log(user, fantasyName, socialReason, rut, cel, street, streetNumber, completed )
    // Confirm data
    if (!id || !user || !fantasyName || !cel || !socialReason || !rut || !street || !streetNumber || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'Debe completar todos los campos' })
    }

    // Confirm company exists to update
    const company = await Company.findById(id).exec()

    if (!company) {
        return res.status(400).json({ message: 'No se ha encontrado Empresa' })
    }

    // Check for duplicate title
    const duplicate = await Company.findOne({ user }).lean().exec()

    // Allow renaming of the original company 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Ya existe una Empresa asociado a este usuario' })
    }

    company.user = user
    company.fantasyName = fantasyName
    company.cel = cel
    company.socialReason = socialReason
    company.rut = rut
    company.street = street
    company.streetNumber = streetNumber
    company.completed = completed

    const updatedCompany = await company.save()

    res.json(`'${updatedCompany.fantasyName}' actualizado`)
})

// @desc Delete a company
// @route DELETE /companys
// @access Private
const deleteCompany = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Se requiere ID de Empresa' })
    }

    // Confirm company exists to delete 
    const company = await Company.findById(id).exec()

    if (!company) {
        return res.status(400).json({ message: 'Empresa no encontrada' })
    }

    const result = await company.deleteOne()

    const reply = `Empresa '${result.fantasyName}' with ID ${result._id} eliminado`

    res.json(reply)
})

module.exports = {
    getAllCompany,
    createNewCompany,
    updateCompany,
    deleteCompany
}