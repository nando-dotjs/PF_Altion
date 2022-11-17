const Driver = require('../models/Driver')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { restart } = require('nodemon')

// @desc Obtener todos los choferes
// @route GET /drivers
// @access Privada

const getAllDrivers = asyncHandler (async (req, res) => {
    const drivers = await Driver.find().select().lean()
    if (!drivers?.length) {
        return res.status(400).json({message: 'No se encontraron choferes'})
    } 
    res.json(drivers)
})

// @desc Obtener un chofer
// @route GET /drivers/driver
// @access Privada
const getDriver = asyncHandler (async (req,res)=> {
    const {name} = req.body
    const driver = await Driver.find({"name":name}).select().lean()
    if(!driver){
        return res.status(400).json({message: 'No se encontró el Conductor'})
    }
    res.json(driver)
})



// @desc Crear nuevo chofer
// @route POST /drivers
// @access Privada

const createNewDriver = asyncHandler (async (req, res) => {
    const { name, surname } = req.body

    // Confirm values
    if (!name || !surname) {
        return res.status(400).json({ message: 'Debe completar todos los campos' })
    }

    const driverObject = { name, surname }

    const driver = await (Driver.create(driverObject))

    if (driver) { // Si el usuario se creó
        res.status(201).json({ message: `El chofer ${name} ${surname} ha sido creado`})
    } else {
        res.status(400).json({ message: 'Datos del chofer inválidos'})
    }

})

// @desc Actualizar un chofer
// @route PATCH /drivers
// @access Privada

const updateDriver = asyncHandler (async (req, res) => {
    const { id, name, surname, active} = req.body

    // Confirmamos los valores
    if (!id || !name || !surname || typeof active !== 'boolean'){
        return res.status(400).json({ message: 'Todos los campos son requeridos'})
    }

    const driver = await Driver.findById(id).exec()

    if (!driver) {
        return res.status(400).json({ message: 'Chofer no encontrado'})
    }

    driver.name = name
    driver.surname = surname
    driver.active = active

    const updatedDriver = await driver.save()
    res.json({ message: `Chofer ${updatedDriver.name} ${updatedDriver.surname} actualizado`})
})

// @desc Actualizar estado del chofer
// @route PATCH /drivers
// @access Privada

const updateDriverState = asyncHandler (async (req, res) => {
    const {id} = req.body

    // Confirmamos los valores
    if (!id){
        return res.status(400).json({ message: 'Todos los campos son requeridos'})
    }
    

    const driver = await Driver.findById(id).exec()

    if (!driver) {
        return res.status(400).json({ message: 'Chofer no encontrado'})
    }

    driver.active = !driver.active

    const updatedDriver = await driver.save()
    if(driver.active){
        res.json({ message: `Chofer ${updatedDriver.name} ${updatedDriver.surname} Activado`})
    }else{
        res.json({ message: `Chofer ${updatedDriver.name} ${updatedDriver.surname} Desactivado`})
    }
    
})

// @desc Eliminar un chofer
// @route DELETE /drivers
// @access Privada

const deleteDriver = asyncHandler (async (req, res) => {
    const { id } = req.body
    
    if (!id) {
        return res.status(400).json({ message: 'Se requiere un ID de chofer'})
    }

    const driver = await Driver.findById(id).exec()

    if (!driver) {
        return res.status(400).json({ message: 'Chofer no encontrado'})
    }

    const result = await driver.deleteOne()

    const reply = `El chofer ${result.name} ${result.surname} con ID ${result._id} ha sido eliminado`

    res.json(reply)
})

module.exports = {
    getAllDrivers,
    getDriver,
    createNewDriver,
    updateDriver,
    updateDriverState,
    deleteDriver
}