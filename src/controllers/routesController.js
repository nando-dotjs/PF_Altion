const Route = require('../models/Route')
const User = require('../models/User')
const Point = require('../models/Point')
const Driver = require('../models/Driver')
const asyncHandler = require('express-async-handler')

// @desc Get all routes 
// @route GET /routes
// @access Private
const getAllRoutes = asyncHandler(async (req, res) => {
    // Get all routes from MongoDB
    const routes = await Route.find().lean()

    // If no routes 
    if (!routes?.length) {
        return res.status(400).json({ message: 'No hay recorridos disponibles' })
    }

    const routesWithUser = await Promise.all(routes.map(async (route) => {
        const user = await User.findById(route.user).lean().exec()
        return { ...route, username: user.username }
    }))

    res.json(routesWithUser)
})

// @desc Create new route
// @route POST /routes
// @access Private
const createNewRoute = asyncHandler(async (req, res) => {
    const { date, time, points, collectors, driver, createdBy} = req.body

    // Confirm data
    if (!date || !time || !points || !driver || !collectors || !createdBy) {
        return res.status(400).json({ message: 'Debe completar todos los campos' })
    }

    // // Check for duplicate title
    // const duplicate = await Route.findOne({ user }).lean().exec()

    // if (duplicate) {
    //     return res.status(409).json({ message: 'Ya existe un ROUTE asociado a este usuario' })
    // }

    // Create and store the new user 
    const route = await Route.create({ date, time, points, collectors, driver, createdBy })
    if (route) { // Created 
        return res.status(201).json({ message: 'Nuevo recorrido creado' })
    } else {
        return res.status(400).json({ message: 'Datos inválidos' })
    }

})

// @desc Update a route
// @route PATCH /routes
// @access Private
const updateRoute = asyncHandler(async (req, res) => {
    const { id, date, points, driver, collectors, state } = req.body

    // Confirm data
    if (!id || !date || !points || !driver || !collectors || !state) {
        return res.status(400).json({ message: 'Debe completar todos los campos' })
    }

    // Confirm route exists to update
    const route = await Route.findById(id).exec()

    if (!route) {
        return res.status(400).json({ message: 'No se ha encontrado el recorrido' })
    }

    // // Check for duplicate title
    // const duplicate = await Route.findOne({ user }).lean().exec()

    // // Allow renaming of the original route 
    // if (duplicate && duplicate?._id.toString() !== id) {
    //     return res.status(409).json({ message: 'Ya existe un ROUTE asociado a este usuario' })
    // }

    route.user = user
    route.date = date
    route.points = points
    route.driver = driver
    route.collectors = collectors
    route.state = state

    const updatedRoute = await route.save()

    res.json(`Recorrido de ${updatedRoute.date} actualizado`)
})

// @desc Delete a route
// @route DELETE /routes
// @access Private
const deleteRoute = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Se requiere ID de recorrido' })
    }

    // Confirm route exists to delete 
    const route = await Route.findById(id).exec()

    if (!route) {
        return res.status(400).json({ message: 'Recorrido no encontrado' })
    }

    const result = await route.deleteOne()

    const reply = `Recorrido del día ${result.date} con id ${result._id} eliminado`

    res.json(reply)
})

module.exports = {
    getAllRoutes,
    createNewRoute,
    updateRoute,
    deleteRoute
}