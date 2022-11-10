const Zone = require('../models/Zone')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { restart } = require('nodemon')

// @desc Obtener todos los zonas
// @route GET /zones
// @access Privada

const getAllZones = asyncHandler (async (req, res) => {
    const zones = await Zone.find().select().lean()
    if (!zones?.length) {
        return res.status(400).json({message: 'No se encontraron zonas'})
    } 
    res.json(zones)
})

// @desc Crear nuevo Zona
// @route POST /zones
// @access Privada

const createNewZone = asyncHandler (async (req, res) => {
    const { name, details } = req.body

    // Confirm values
    if (!name) {
        return res.status(400).json({ message: 'Debe ingresar un nombre' })
    }

    const duplicate = await Zone.findOne({ name }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Ya existe una zona con este nombre' })
    }

    const zoneObject = { name, details }

    const zone = await (Zone.create(zoneObject))

    if (zone) { // Si el usuario se creó
        res.status(201).json({ message: `La zona ${name} ha sido creado`})
    } else {
        res.status(400).json({ message: 'Datos de la zona inválidos'})
    }

})

// @desc Actualizar un Zona
// @route PATCH /zones
// @access Privada

const updateZone = asyncHandler (async (req, res) => {
    const { id, name, details, active} = req.body

    // Confirmamos los valores
    if (!id || !name || typeof active !== 'boolean'){
        return res.status(400).json({ message: 'Todos los campos son requeridos'})
    }

    const zone = await Zone.findById(id).exec()

    if (!zone) {
        return res.status(400).json({ message: 'Zona no encontrada'})
    }

    zone.name = name
    zone.details = details
    zone.active = active

    const updatedZone = await zone.save()
    res.json({ message: `Zona ${updatedZone.name} actualizada`})
})

// @desc Eliminar un Zona
// @route DELETE /zones
// @access Privada

const deleteZone = asyncHandler (async (req, res) => {
    const { id } = req.body
    
    if (!id) {
        return res.status(400).json({ message: 'Se requiere un ID de Zona'})
    }

    const zone = await Zone.findById(id).exec()

    if (!zone) {
        return res.status(400).json({ message: 'Zona no encontrada'})
    }

    const result = await zone.deleteOne()

    const reply = `La zona ${result.name} con ID ${result._id} ha sido eliminada`

    res.json(reply)
})

module.exports = {
    getAllZones,
    createNewZone,
    updateZone,
    deleteZone
}