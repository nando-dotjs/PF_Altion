const mongoose = require('mongoose')
const cevSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        idFamily: {
            type: String,
            required: true
        },
        cel: {
            type: String,
            required: true
        },
        details: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        streetNumber: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        lat: {
            type: String
        },
        long: {
            type: String
        }

    },
    {
        timestamps: true
    }
)



module.exports = mongoose.model('Cev', cevSchema)