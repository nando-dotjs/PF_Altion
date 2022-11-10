const Point = require('../models/Point')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all points 
// @route GET /points
// @access Private
const getAllPoints = asyncHandler(async (req, res) => {
    // Get all points from MongoDB
    const points = await Point.find().lean()

    // If no points 
    if (!points?.length) {
        return res.status(400).json({ message: 'No hay puntos disponibles' })
    }

    const pointsWithUser = await Promise.all(points.map(async (point) => {
        const user = await User.findById(point.user).lean().exec()
        return { ...point, mail: user.mail }
    }))

    console.log(points)

    res.json(pointsWithUser)
})

// @desc Create new point
// @route POST /points
// @access Private
const createNewPoint = asyncHandler(async (req, res) => {
    const { user, name, phoneNumber, street, streetNumber, lat, long } = req.body

    // Confirm data
    if (!user || !name || !phoneNumber || !street || !streetNumber || !lat || !long) {
        return res.status(400).json({ message: 'Debe completar todos los campos' })
    }

    

    // Create and store the new user 
    const point = await Point.create({ user, name, phoneNumber, street, streetNumber, lat, long })
    if (point) { // Created 
        return res.status(201).json({ message: 'Nuevo punto creado' })
    } else {
        return res.status(400).json({ message: 'Datos inválidos' })
    }

})

// @desc Update a point
// @route PATCH /points
// @access Private
const updatePoint = asyncHandler(async (req, res) => {
    const { id, user, name, phoneNumber, street, streetNumber, completed, zone } = req.body

    // Confirm data
    if (!id || !user || !name || !phoneNumber || !street || !streetNumber || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'Debe completar todos los campos' })
    }

    // Confirm point exists to update
    const point = await Point.findById(id).exec()

    if (!point) {
        return res.status(400).json({ message: 'No se ha encontrado punto' })
    }

    // Check for duplicate title
    const duplicate = await Point.findOne({ user }).lean().exec()

    // Allow renaming of the original point 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Ya existe un punto asociado a este usuario' })
    }

    point.user = user
    point.name = name
    point.phoneNumber = phoneNumber
    point.street = street
    point.streetNumber = streetNumber
    point.completed = completed
    point.zone = zone

    const updatedPoint = await point.save()

    res.json(`'${updatedPoint.name}' actualizado`)
})

// @desc Delete a point
// @route DELETE /points
// @access Private
const deletePoint = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Se requiere ID del punto' })
    }

    // Confirm point exists to delete 
    const point = await Point.findById(id).exec()

    if (!point) {
        return res.status(400).json({ message: 'Punto no encontrado' })
    }

    const result = await point.deleteOne()

    const reply = `Punto '${result.name}' con el ID ${result._id} eliminado`

    res.json(reply)
})

module.exports = {
    getAllPoints,
    createNewPoint,
    updatePoint,
    deletePoint
}