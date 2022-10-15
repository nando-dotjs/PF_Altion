const mongoose = require('mongoose')
const companySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        fantasyName: {
            type: String,
            required: true
        },
        cel: {
            type: String,
            required: true
        },
        socialReason: {
            type: String,
            required: true
        }, 
        rut: {
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
        }
    },
    {
        timestamps: true
    }
)



module.exports = mongoose.model('Company', companySchema)