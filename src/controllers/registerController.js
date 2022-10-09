const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { restart } = require('nodemon')

// @desc Crear nuevo usuario
// @route POST /register
// @access Privada

const registerNewUser = asyncHandler (async (req, res) => {
    const { name, surname, mail, username, password, roles } = req.body

    // Confirm values
    if (!name || !surname || !mail || !username || !password ||!Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'Debe completar todos los campos' })
    }

    // Check for duplicate

    const duplicate = await User.findOne({ mail }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'Ya existe una cuenta asociada al correo electrónico ingresado'})
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


module.exports = {
    registerNewUser
}