require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const connectDB = require('./src/config/dbConn')
const mongoose = require('mongoose')
const cors = require('cors')
const corsOptions = require('./src/config/corsOptions')
const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(require('./src/routes/index.routes'))
app.use('/users', require('./src/routes/userRoutes'))
app.use('/auth', require('./src/routes/authRoutes'))

connectDB()

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on ${PORT}`)) // NODE JS
})

mongoose.connection.on('error', err => {
    console.log(err)
})
