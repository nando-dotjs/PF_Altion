const User = require('../models/User')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

// @desc Login
// @route POST /auth
// @access Publico

const login = asyncHandler(async (req, res) => {
    const { mail, password } = req.body

    if (!mail || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' })
    }

    const foundUser = await User.findOne({ mail }).exec()

    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: 'No está autorizado' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'No está autorizado' })

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "mail": foundUser.mail,
                "role": foundUser.role,
                "name": foundUser.name,
                "surname": foundUser.surname,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
    )

    const refreshToken = jwt.sign(
        { "mail": foundUser.mail },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // Send accessToken containing username and role 
    res.json({ accessToken })
    
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public 

const refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'No está autorizado' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ mail: decoded.mail }).exec()

            if (!foundUser) return res.status(401).json({ message: 'No está autorizado' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "mail": foundUser.mail,
                        "role": foundUser.role,
                        "name": foundUser.name,
                        "surname": foundUser.surname,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30m' }
            )

            res.json({ accessToken })
        })
    )
}


// @desc Logout
// @route POST /auth/logout
// @access Public 

const logout = (req, res) => {
    const cookies = req.cookies
    
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    
    res.json({ message: 'Cookie eliminada' })
}

module.exports = {
    login,
    refresh,
    logout
}