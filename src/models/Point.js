const mongoose = require('mongoose')
const pointSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
        phoneNumber: {
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
        zone: {
            type: String
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



module.exports = mongoose.model('Point', pointSchema)