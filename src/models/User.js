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

    mail: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    }, 

    password: {
        type: String,
        required: true
    },

    roles: [{
        type: String 
    }],

    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', userSchema)