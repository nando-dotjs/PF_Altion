const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { restart } = require('nodemon')

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_SURNAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{2,15}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /[^\s*].*[^\s*]\@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/

// @desc Crear nuevo usuario
// @route POST /register
// @access Privada

const registerNewUser = asyncHandler (async (req, res) => {
    const { name, surname, mail, username, password, role } = req.body

    // Confirm values
    if (!name || !surname || !mail || !username || !password ||!role ) {
        return res.status(400).json({ message: 'Debe completar todos los campos' })
    }

    //Check valid attributes
    if(!USER_REGEX.test(username)){
        return res.status(409).json({ message: 'El usuario ingresado no es válido'})
    }

    if(!PWD_REGEX.test(password)){
        return res.status(409).json({ message: 'La contraseña ingresada no cumple con los requisitos de complejidad'})
    }

    if(!EMAIL_REGEX.test(mail)){
        return res.status(409).json({ message: 'El mail ingresado no es válido'})
    }

    if(!NAME_SURNAME_REGEX.test(name)){
        return res.status(409).json({ message: 'El nombre ingresado no es válido'})
    }

    if(!NAME_SURNAME_REGEX.test(surname)){
        return res.status(409).json({ message: 'El apellido ingresado no es válido'})
    }


    // Check for duplicate

    const mailDuplicated = await User.findOne({ mail }).lean().exec()
    if (mailDuplicated) {
        return res.status(409).json({ message: 'Ya existe una cuenta asociada al correo electrónico ingresado'})
    }

    const usernameDuplicated = await User.findOne({ username }).lean().exec()
    if (usernameDuplicated) {
        return res.status(409).json({ message: 'Ya existe una cuenta con el nombre de usuario ingresado'})
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10) 

    const userObject = { name, surname, mail, username, "password": hashedPwd, role}

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