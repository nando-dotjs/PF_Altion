const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { restart } = require('nodemon')

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_SURNAME_REGEX = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{2,15}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /[^\s*].*[^\s*]\@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/

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

// @desc Obtener un usuario
// @route GET /users/user
// @access Privada

const getUser = asyncHandler (async (req, res) => {
    const { username } = req.body
    const user = await User.find({"username":username}).select('--password').lean()
    if (!user) {
        return res.status(400).json({message: 'No se encontró el usuario'})
    } 
    res.json(user)
})

// @desc Crear nuevo usuario
// @route POST /users
// @access Privada

const createNewUser = asyncHandler (async (req, res) => {
    const { name, surname, mail, username, password, role } = req.body

    // Confirm values
    if (!name || !surname || !mail || !username || !password || !role ) {
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

// @desc Actualizar un usuario
// @route PATCH /users
// @access Privada

const updateUser = asyncHandler (async (req, res) => {
    const { id, name, surname, mail, username, role, active, password } = req.body

    // Confirmamos los valores
    if (!id || !name || !surname || !mail || !username || !role || typeof active !== 'boolean'){
        return res.status(400).json({ message: 'Todos los campos son requeridos'})
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado'})
    }

    //Check valid attributes
    if(!USER_REGEX.test(username)){
        return res.status(409).json({ message: `${username} El usuario ingresado no es válido`})
    }

    if(password && !PWD_REGEX.test(password)){
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

    const usernameDuplicated = await User.findOne({ username }).lean().exec()

    const mailDuplicated = await User.findOne({ mail }).lean().exec()

    // Allow updates to the original user

    if (usernameDuplicated && usernameDuplicated?._id.toString() !== id) {
        return res.status(409).json({ message: 'Ya existe una cuenta asociada al usuario ingresado'})
    }

    if (mailDuplicated && mailDuplicated?._id.toString() !== id) {
        return res.status(409).json({ message: 'Ya existe una cuenta asociada al correo electrónico ingresado'})
    }

    user.name = name
    user.surname = surname
    user.mail = mail
    user.username = username
    user.role = role
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
    deleteUser,
    getUser
}