const Note = require('../models/Note')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all notes 
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
    // Get all notes from MongoDB
    const notes = await Note.find().lean()

    // If no notes 
    if (!notes?.length) {
        return res.status(400).json({ message: 'No hay CEVs disponibles' })
    }

    const notesWithUser = await Promise.all(notes.map(async (note) => {
        const user = await User.findById(note.user).lean().exec()
        return { ...note, username: user.username }
    }))

    res.json(notesWithUser)
})

// @desc Create new note
// @route POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
    const { user, idFamily, cel, details, street, streetNumber } = req.body

    // Confirm data
    if (!user || !idFamily || !cel || !details || !street || !streetNumber) {
        return res.status(400).json({ message: 'Debe completar todos los campos' })
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ user }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Ya existe un CEV asociado a este usuario' })
    }

    // Create and store the new user 
    const note = await Note.create({ user, idFamily, cel, details, street, streetNumber })

    if (note) { // Created 
        return res.status(201).json({ message: 'Nuevo CEV creado' })
    } else {
        return res.status(400).json({ message: 'Datos inválidos' })
    }

})

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const { id, user, idFamily, cel, details, street, streetNumber, completed } = req.body

    // Confirm data
    if (!id || !user || !idFamily || !cel || !details || !street || !streetNumber || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'Debe completar todos los campos' })
    }

    // Confirm note exists to update
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'No se ha encontrado CEV' })
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ user }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'CEV duplicado' })
    }

    note.user = user
    note.idFamily = idFamily
    note.cel = cel
    note.details = details
    note.street = street
    note.streetNumber = streetNumber
    note.completed = completed

    const updatedNote = await note.save()

    res.json(`'${updatedNote.idFamily}' actualizado`)
})

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Se requiere ID de CEV' })
    }

    // Confirm note exists to delete 
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'CEV no encontrado' })
    }

    const result = await note.deleteOne()

    const reply = `CEV '${result.idFamily}' with ID ${result._id} eliminado`

    res.json(reply)
})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}