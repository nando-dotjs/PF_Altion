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
                ref: 'Point'
            },
            collected: {
                type: Boolean,
                required: true,
                default: false
            },
            amountCollected: {
                type: Number,
                required: false
            },
            timeCollected: {
                type: String,
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
            default: 'Pendiente'
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