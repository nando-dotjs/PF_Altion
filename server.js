require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const connectDB = require('./src/config/dbConn')
const mongoose = require('mongoose')



app.use(require('./src/routes/index.routes'))
connectDB()

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on ${PORT}`)) // NODE JS
})

mongoose.connection.on('error', err => {
    console.log(err)
})
