const Cev = require('../models/Cev')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all cevs 
// @route GET /cevs
// @access Private
const getAllCevs = asyncHandler(async (req, res) => {
    // Get all cevs from MongoDB
    const cevs = await Cev.find().lean()

    // If no cevs 
    if (!cevs?.length) {
        return res.status(400).json({ message: 'No hay CEVs disponibles' })
    }

    const cevsWithUser = await Promise.all(cevs.map(async (cev) => {
        const user = await User.findById(cev.user).lean().exec()
        return { ...cev, username: user.username }
    }))

    res.json(cevsWithUser)
})

// @desc Create new cev
// @route POST /cevs
// @access Private
const createNewCev = asyncHandler(async (req, res) => {
    const { user, idFamily, cel, details, street, streetNumber } = req.body

    // Confirm data
    if (!user || !idFamily || !cel || !details || !street || !streetNumber) {
        return res.status(400).json({ message: 'Debe completar todos los campos' })
    }

    // Check for duplicate title
    const duplicate = await Cev.findOne({ user }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Ya existe un CEV asociado a este usuario' })
    }

    // Create and store the new user 
    const cev = await Cev.create({ user, idFamily, cel, details, street, streetNumber })

    if (cev) { // Created 
        return res.status(201).json({ message: 'Nuevo CEV creado' })
    } else {
        return res.status(400).json({ message: 'Datos inválidos' })
    }

})

// @desc Update a cev
// @route PATCH /cevs
// @access Private
const updateCev = asyncHandler(async (req, res) => {
    const { id, user, idFamily, cel, details, street, streetNumber, completed } = req.body

    // Confirm data
    if (!id || !user || !idFamily || !cel || !details || !street || !streetNumber || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'Debe completar todos los campos' })
    }

    // Confirm cev exists to update
    const cev = await Cev.findById(id).exec()

    if (!cev) {
        return res.status(400).json({ message: 'No se ha encontrado CEV' })
    }

    // Check for duplicate title
    const duplicate = await Cev.findOne({ user }).lean().exec()

    // Allow renaming of the original cev 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'CEV duplicado' })
    }

    cev.user = user
    cev.idFamily = idFamily
    cev.cel = cel
    cev.details = details
    cev.street = street
    cev.streetNumber = streetNumber
    cev.completed = completed

    const updatedCev = await cev.save()

    res.json(`'${updatedCev.idFamily}' actualizado`)
})

// @desc Delete a cev
// @route DELETE /cevs
// @access Private
const deleteCev = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Se requiere ID de CEV' })
    }

    // Confirm cev exists to delete 
    const cev = await Cev.findById(id).exec()

    if (!cev) {
        return res.status(400).json({ message: 'CEV no encontrado' })
    }

    const result = await cev.deleteOne()

    const reply = `CEV '${result.idFamily}' with ID ${result._id} eliminado`

    res.json(reply)
})

module.exports = {
    getAllCevs,
    createNewCev,
    updateCev,
    deleteCev
}