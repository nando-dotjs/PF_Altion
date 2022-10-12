const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    }, 

    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Driver', userSchema)