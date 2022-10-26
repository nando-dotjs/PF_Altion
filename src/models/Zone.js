const mongoose = require('mongoose')

const zoneSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    details: {
        type: String
    }, 

    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Zone', zoneSchema)