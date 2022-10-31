const mongoose = require('mongoose')
const routeSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        points: [{
            point: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: ['Cev', 'Company']
            },
            collected: {
                type: String,
                required: true,
                default: false
            },
            amountCollected: {
                type: Number,
                required: false
            }
        }],
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Driver'
        },
        collectors: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }],
        state:{
            type: String,
            required: true,
            default: 'Sin realizar'
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    },
    {
        timestamps: true
    }
)



module.exports = mongoose.model('Route', routeSchema)