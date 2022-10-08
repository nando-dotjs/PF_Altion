const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { restart } = require('nodemon')

// @desc Obtener todos los usuarios
// @route GET /users
// @access Privada

const getAllUsers = asyncHandler (async (req, res) => {
    const users = await User.find().select('--password').lean()
    if (!users?.length) {
        return res.status(400).json({message: 'No se encontraron usuarios'})
    } 
    res.json(users)
})

// @desc Crear nuevo usuario
// @route POST /users
// @access Privada

const createNewUser = asyncHandler (async (req, res) => {
    const { name, surname, mail, username, password, roles } = req.body

    // Confirm values
    if (!name || !surname || !mail || !username || !password ||!Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'Debe completar todos los campos' })
    }

    // Check for duplicate

    const duplicate = await User.findOne({ username }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'Nombre de usuario duplicado'})
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10) 

    const userObject = { name, surname, mail, username, "password": hashedPwd, roles}

    const user = await (User.create(userObject))

    if (user) { // Si el usuario se creó
        res.status(201).json({ message: `El usuario ${username} ha sido creado`})
    } else {
        res.status(400).json({ message: 'Datos recibidos del usuario inválidos'})
    }

})

// @desc Actualizar un usuario
// @route PATCH /users
// @access Privada

const updateUser = asyncHandler (async (req, res) => {
    const { id, username, roles, active, password } = req.body

    // Confirmamos los valores
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean'){
        return res.status(400).json({ message: 'Todos los campos son requeridos'})
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado'})
    }

    // Chequeamos si hay duplicados

    const duplicate = await User.findOne({ username }).lean().exec()

    // Allow updates to the original user

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Nombre de usuario duplicado'})
    }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) { // Si desea actualizar la contraseña, la encripta nuevamente!
        // Hash password
        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()
    res.json({ message: `${updatedUser.username} actualizado`})
})

// @desc Eliminar un usuario
// @route DELETE /users
// @access Privada

const deleteUser = asyncHandler (async (req, res) => {
    const { id } = req.body
    
    if (!id) {
        return res.status(400).json({ message: 'Se requiere un ID de usuario'})
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado'})
    }

    const result = await user.deleteOne()

    const reply = `El usuario ${result.username} con ID ${result._id} ha sido eliminado`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}